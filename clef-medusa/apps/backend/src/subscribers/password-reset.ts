import { createHash } from 'node:crypto'

import type { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import type { INotificationModuleService } from '@medusajs/framework/types'
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'

type PasswordResetEvent = {
  actor_type: string
  entity_id: string
  token: string
}

export default async function passwordResetHandler({
  event: { data },
  container,
}: SubscriberArgs<PasswordResetEvent>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  if (process.env.EMAIL_ENABLED?.toLowerCase() !== 'true') {
    logger.info('[email] Skipped a password-reset notification because email is disabled.')
    return
  }

  try {
    const notificationService: INotificationModuleService = container.resolve(Modules.NOTIFICATION)
    const isCustomer = data.actor_type === 'customer'
    const baseUrl = isCustomer
      ? process.env.STOREFRONT_URL?.trim() || 'http://localhost:3000'
      : process.env.MEDUSA_BACKEND_URL?.trim() || 'http://localhost:9000'
    const resetUrl = new URL(
      isCustomer ? '/reset-password' : '/app/reset-password',
      baseUrl,
    )
    resetUrl.searchParams.set('token', data.token)
    resetUrl.searchParams.set('email', data.entity_id)

    // Hashing makes the idempotency key retry-stable without persisting or logging the token itself.
    const tokenFingerprint = createHash('sha256').update(data.token).digest('hex')
    await notificationService.createNotifications({
      channel: 'email',
      data: {
        actor_type: data.actor_type,
        reset_url: resetUrl.toString(),
      },
      idempotency_key: `password-reset:${data.entity_id}:${tokenFingerprint}`,
      receiver_id: data.entity_id,
      resource_type: data.actor_type,
      template: 'password-reset',
      to: data.entity_id,
      trigger_type: 'auth.password_reset',
    })
    logger.info('[email] Created an idempotent password-reset notification.')
  } catch (error) {
    logger.error(
      `[email] Failed to create a password-reset notification: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    )
    throw error
  }
}

export const config: SubscriberConfig = {
  event: 'auth.password_reset',
}
