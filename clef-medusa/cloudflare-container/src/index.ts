import { Container, getContainer } from '@cloudflare/containers'
import { SignJWT } from 'jose'

interface Env {
  MEDUSA_CONTAINER: DurableObjectNamespace<MedusaContainer>
  DATABASE_URL: string
  REDIS_URL: string
  JWT_SECRET: string
  COOKIE_SECRET: string
  STRIPE_SECRET_KEY: string
  STRIPE_WEBHOOK_SECRET: string
  R2_ENDPOINT: string
  R2_ACCESS_KEY_ID: string
  R2_SECRET_ACCESS_KEY: string
  R2_FILE_URL: string
  CLOUDFLARE_ACCOUNT_ID: string
  RESEND_API_KEY?: string
  EMAIL_ENABLED?: string
  EMAIL_FROM_ADDRESS?: string
  EMAIL_FROM_NAME?: string
  EMAIL_REPLY_TO?: string
  EMAIL_ADMIN_TO?: string
  STOREFRONT_URL?: string
  NODE_ENV: string
  PORT: string
  HOST: string
  DATABASE_SCHEMA: string
  PGOPTIONS: string
  STRIPE_MODE: string
  MEDUSA_BACKEND_URL: string
  DEPLOYMENT_CONFIG_VERSION: string
  STORE_CORS: string
  ADMIN_CORS: string
  AUTH_CORS: string
  AWS_REQUEST_CHECKSUM_CALCULATION: string
  AWS_RESPONSE_CHECKSUM_VALIDATION: string
}

const optional = (value: string | undefined) => value?.trim() || undefined

export class MedusaContainer extends Container<Env> {
  defaultPort = 9000
  requiredPorts = [9000]
  sleepAfter = '30m'
  enableInternet = true
  private readonly workerEnv: Env
  private starting?: Promise<void>

  constructor(ctx: DurableObjectState<{}>, env: Env) {
    super(ctx, env)
    this.workerEnv = env

    this.envVars = Object.fromEntries(
      Object.entries({
        NODE_ENV: env.NODE_ENV,
        PORT: env.PORT,
        HOST: env.HOST,
        DATABASE_SCHEMA: env.DATABASE_SCHEMA,
        PGOPTIONS: env.PGOPTIONS,
        DATABASE_URL: env.DATABASE_URL,
        REDIS_URL: env.REDIS_URL,
        JWT_SECRET: env.JWT_SECRET,
        COOKIE_SECRET: env.COOKIE_SECRET,
        STRIPE_MODE: env.STRIPE_MODE,
        STRIPE_SECRET_KEY: env.STRIPE_SECRET_KEY,
        STRIPE_WEBHOOK_SECRET: env.STRIPE_WEBHOOK_SECRET,
        R2_ENDPOINT: env.R2_ENDPOINT,
        R2_FILE_URL: env.R2_FILE_URL,
        MEDUSA_BACKEND_URL: env.MEDUSA_BACKEND_URL,
        STORE_CORS: env.STORE_CORS,
        ADMIN_CORS: env.ADMIN_CORS,
        AUTH_CORS: env.AUTH_CORS,
        AWS_REQUEST_CHECKSUM_CALCULATION: env.AWS_REQUEST_CHECKSUM_CALCULATION,
        AWS_RESPONSE_CHECKSUM_VALIDATION: env.AWS_RESPONSE_CHECKSUM_VALIDATION,
        RESEND_API_KEY: optional(env.RESEND_API_KEY),
        EMAIL_ENABLED: optional(env.EMAIL_ENABLED),
        EMAIL_FROM_ADDRESS: optional(env.EMAIL_FROM_ADDRESS),
        EMAIL_FROM_NAME: optional(env.EMAIL_FROM_NAME),
        EMAIL_REPLY_TO: optional(env.EMAIL_REPLY_TO),
        EMAIL_ADMIN_TO: optional(env.EMAIL_ADMIN_TO),
        STOREFRONT_URL: optional(env.STOREFRONT_URL),
      }).filter((entry): entry is [string, string] => typeof entry[1] === 'string'),
    )
  }

  private async startWithRestrictedR2Credentials() {
    const ttlSeconds = 604800
    const jwt = await new SignJWT({
      bucket: 'clef-medusa-media',
      scope: 'object-read-write',
    })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setSubject(this.workerEnv.CLOUDFLARE_ACCOUNT_ID)
      .setIssuer(this.workerEnv.R2_ACCESS_KEY_ID)
      .setAudience(new URL(this.workerEnv.R2_ENDPOINT).host)
      .setIssuedAt()
      .setExpirationTime(`${ttlSeconds}s`)
      .sign(new TextEncoder().encode(this.workerEnv.R2_SECRET_ACCESS_KEY))
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(jwt))
    const credentials = {
      accessKeyId: this.workerEnv.R2_ACCESS_KEY_ID,
      secretAccessKey: Array.from(new Uint8Array(digest))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join(''),
      sessionToken: btoa(`jwt/${jwt}`),
    }

    await this.startAndWaitForPorts({
      ports: 9000,
      startOptions: {
        envVars: {
          ...this.envVars,
          R2_ACCESS_KEY_ID: credentials.accessKeyId,
          R2_SECRET_ACCESS_KEY: credentials.secretAccessKey,
          R2_SESSION_TOKEN: credentials.sessionToken,
        },
      },
      cancellationOptions: {
        instanceGetTimeoutMS: 120000,
        portReadyTimeoutMS: 300000,
        waitInterval: 1000,
      },
    })

    await this.ctx.storage.put('r2CredentialsRefreshAt', Date.now() + (ttlSeconds - 3600) * 1000)
    await this.ctx.storage.put('deploymentConfigVersion', this.workerEnv.DEPLOYMENT_CONFIG_VERSION)
  }

  private async ensureContainerIsReady() {
    const state = await this.getState()
    const refreshAt = (await this.ctx.storage.get<number>('r2CredentialsRefreshAt')) || 0
    const deploymentConfigVersion = await this.ctx.storage.get<string>('deploymentConfigVersion')
    const isCurrent =
      state.status === 'healthy' &&
      deploymentConfigVersion === this.workerEnv.DEPLOYMENT_CONFIG_VERSION

    if (isCurrent && refreshAt > Date.now()) return

    if (!this.starting) {
      this.starting = (async () => {
        if (state.status === 'healthy') {
          try {
            await this.destroy()
          } catch (error) {
            const message = String(error).toLowerCase()
            if (!message.includes('container is not running')) throw error
          }
        }
        await this.startWithRestrictedR2Credentials()
      })().finally(() => {
        this.starting = undefined
      })
    }

    await this.starting
  }

  override async fetch(request: Request): Promise<Response> {
    await this.ensureContainerIsReady()
    this.renewActivityTimeout()
    return this.containerFetch(request, 9000)
  }

  override onError(error: unknown) {
    console.error('Medusa container error:', error instanceof Error ? error.message : 'unknown error')
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    const isAdminEntryPath =
      url.pathname === '/' || url.pathname === '/admin' || url.pathname === '/admin/'

    if ((request.method === 'GET' || request.method === 'HEAD') && isAdminEntryPath) {
      return Response.redirect(new URL('/app', url).toString(), 302)
    }

    const container = getContainer(env.MEDUSA_CONTAINER, 'primary')
    return container.fetch(request)
  },
} satisfies ExportedHandler<Env>
