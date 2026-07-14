import type { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'
import type {
  CreateNotificationDTO,
  INotificationModuleService,
} from '@medusajs/framework/types'
import { ContainerRegistrationKeys, Modules } from '@medusajs/framework/utils'

import type { OrderEmailData } from '../modules/resend/templates/types'

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  if (process.env.EMAIL_ENABLED?.toLowerCase() !== 'true') {
    logger.info(`[email] Skipped order notifications for ${data.id}: email is disabled.`)
    return
  }

  try {
    const query = container.resolve(ContainerRegistrationKeys.QUERY)
    const notificationService: INotificationModuleService = container.resolve(Modules.NOTIFICATION)
    const { data: orders } = await query.graph({
      entity: 'order',
      fields: [
        'id',
        'display_id',
        'email',
        'currency_code',
        'total',
        'items.*',
        'shipping_address.*',
      ],
      filters: { id: data.id },
    })
    const order = orders[0] as OrderEmailData | undefined

    if (!order) {
      throw new Error('Order was not found.')
    }

    const orderId = order.id || data.id
    const notifications: CreateNotificationDTO[] = []
    if (order.email) {
      notifications.push({
        channel: 'email',
        data: order as unknown as Record<string, unknown>,
        idempotency_key: `order-placed:${orderId}:customer`,
        receiver_id: order.email,
        resource_id: orderId,
        resource_type: 'order',
        template: 'order-confirmation',
        to: order.email,
        trigger_type: 'order.placed',
      })
    } else {
      logger.warn(`[email] Order ${data.id} has no customer email; confirmation was skipped.`)
    }

    const adminTo = process.env.EMAIL_ADMIN_TO?.trim()
    if (adminTo) {
      notifications.push({
        channel: 'email',
        data: order as unknown as Record<string, unknown>,
        idempotency_key: `order-placed:${orderId}:admin`,
        provider_data: order.email ? { reply_to: order.email } : undefined,
        resource_id: orderId,
        resource_type: 'order',
        template: 'admin-new-order',
        to: adminTo,
        trigger_type: 'order.placed',
      })
    } else {
      logger.warn(`[email] EMAIL_ADMIN_TO is missing; admin notification for ${data.id} was skipped.`)
    }

    if (notifications.length) {
      await notificationService.createNotifications(notifications)
      logger.info(`[email] Created ${notifications.length} idempotent notification(s) for order ${data.id}.`)
    }
  } catch (error) {
    logger.error(
      `[email] Failed to create order notifications for ${data.id}: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    )
    throw error
  }
}

export const config: SubscriberConfig = {
  event: 'order.placed',
}
