import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'

import orderPlacedHandler from '../order-placed'
import passwordResetHandler from '../password-reset'

const logger = () => ({
  error: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
})

describe('email subscribers', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    process.env = {
      ...originalEnv,
      EMAIL_ADMIN_TO: 'admin@example.com',
      EMAIL_ENABLED: 'true',
      MEDUSA_BACKEND_URL: 'http://localhost:9000',
      STOREFRONT_URL: 'http://localhost:3000',
    }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it('routes order emails correctly and uses stable per-recipient idempotency keys', async () => {
    const createNotifications = jest.fn().mockResolvedValue([])
    const query = {
      graph: jest.fn().mockResolvedValue({
        data: [{
          currency_code: 'myr',
          display_id: 101,
          email: 'customer@example.com',
          id: 'order_1',
          items: [],
          total: 100,
        }],
      }),
    }
    const testLogger = logger()
    const container = {
      resolve: jest.fn((key: string) => {
        if (key === ContainerRegistrationKeys.LOGGER) return testLogger
        if (key === ContainerRegistrationKeys.QUERY) return query
        if (key === Modules.NOTIFICATION) return { createNotifications }
        throw new Error(`Unexpected container key: ${key}`)
      }),
    }
    const input = { container, event: { data: { id: 'order_1' } } } as never

    await orderPlacedHandler(input)
    await orderPlacedHandler(input)

    expect(createNotifications).toHaveBeenCalledTimes(2)
    const firstNotifications = createNotifications.mock.calls[0][0]
    const retriedNotifications = createNotifications.mock.calls[1][0]
    expect(firstNotifications).toEqual(retriedNotifications)
    expect(firstNotifications).toEqual(expect.arrayContaining([
      expect.objectContaining({
        idempotency_key: 'order-placed:order_1:customer',
        template: 'order-confirmation',
        to: 'customer@example.com',
      }),
      expect.objectContaining({
        idempotency_key: 'order-placed:order_1:admin',
        provider_data: { reply_to: 'customer@example.com' },
        template: 'admin-new-order',
        to: 'admin@example.com',
      }),
    ]))
  })

  it('sends password resets through the Notification Module without logging the token', async () => {
    const createNotifications = jest.fn().mockResolvedValue({ id: 'notification_1' })
    const testLogger = logger()
    const container = {
      resolve: jest.fn((key: string) => {
        if (key === ContainerRegistrationKeys.LOGGER) return testLogger
        if (key === Modules.NOTIFICATION) return { createNotifications }
        throw new Error(`Unexpected container key: ${key}`)
      }),
    }
    const token = 'secret-reset-token'

    await passwordResetHandler({
      container,
      event: {
        data: {
          actor_type: 'user',
          entity_id: 'admin@example.com',
          token,
        },
      },
    } as never)

    const notification = createNotifications.mock.calls[0][0]
    expect(notification.to).toBe('admin@example.com')
    expect(notification.template).toBe('password-reset')
    expect(notification.idempotency_key).not.toContain(token)
    expect(notification.data.reset_url).toContain('/app/reset-password?')
    expect(JSON.stringify(testLogger.info.mock.calls)).not.toContain(token)
    expect(JSON.stringify(testLogger.error.mock.calls)).not.toContain(token)
  })
})
