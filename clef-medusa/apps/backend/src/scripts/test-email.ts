import type { MedusaContainer } from '@medusajs/framework'
import type { INotificationModuleService } from '@medusajs/framework/types'
import { Modules } from '@medusajs/framework/utils'

type ScriptArgs = {
  args: string[]
  container: MedusaContainer
}

export default async function testEmail({ args, container }: ScriptArgs) {
  const recipientIndex = args.indexOf('--to')
  const to = recipientIndex >= 0 ? args[recipientIndex + 1]?.trim() : ''

  if (!to) {
    throw new Error('A test recipient is required. Use: npm run test:email -- --to you@example.com')
  }

  if (process.env.EMAIL_ENABLED?.toLowerCase() !== 'true') {
    throw new Error('EMAIL_ENABLED must be true to send an intentional CLI test email.')
  }

  const notificationService: INotificationModuleService = container.resolve(Modules.NOTIFICATION)
  const timestamp = new Date().toISOString()
  const result = await notificationService.createNotifications({
    channel: 'email',
    data: {
      currency_code: 'MYR',
      display_id: 'CLI-TEST',
      email: to,
      items: [],
      total: 0,
    },
    idempotency_key: `cli-test:${to}:${timestamp}`,
    template: 'order-confirmation',
    to,
    trigger_type: 'cli.test',
  })

  console.info(`[email:test] Sent the clef-medusa test email to ${to}. Notification ID: ${result.id}`)
}
