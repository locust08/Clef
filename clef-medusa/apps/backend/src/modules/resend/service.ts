import type {
  Logger,
  NotificationTypes,
} from '@medusajs/framework/types'
import {
  AbstractNotificationProviderService,
  MedusaError,
} from '@medusajs/framework/utils'
import { render } from '@react-email/render'
import React from 'react'
import { Resend } from 'resend'

import { AdminNewOrderEmail } from './templates/admin-new-order'
import { OrderConfirmationEmail } from './templates/order-confirmation'
import { PasswordResetEmail } from './templates/password-reset'
import type { OrderEmailData, PasswordResetEmailData } from './templates/types'

type InjectedDependencies = { logger: Logger }

type ResendOptions = {
  api_key: string
  from: string
  reply_to?: string
}

const subjects: Record<string, (data: Record<string, unknown>) => string> = {
  'admin-new-order': (data) => `New CLEF order #${data.display_id || data.id || ''}`,
  'order-confirmation': (data) => `Your CLEF order #${data.display_id || data.id || ''} is confirmed`,
  'password-reset': () => 'Reset your CLEF password',
}

const renderTemplate = (template: string, data: Record<string, unknown>) => {
  switch (template) {
    case 'admin-new-order':
      return React.createElement(AdminNewOrderEmail, data as OrderEmailData)
    case 'order-confirmation':
      return React.createElement(OrderConfirmationEmail, data as OrderEmailData)
    case 'password-reset':
      return React.createElement(PasswordResetEmail, data as PasswordResetEmailData)
    default:
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Unsupported Resend email template: ${template}`,
      )
  }
}

class ResendNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = 'notification-resend'

  private readonly client: Resend
  private readonly logger: Logger
  private readonly options: ResendOptions

  constructor({ logger }: InjectedDependencies, options: ResendOptions) {
    super()
    this.logger = logger
    this.options = options
    this.client = new Resend(options.api_key)
  }

  static validateOptions(options: Record<string, unknown>) {
    if (!options.api_key || !options.from) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'The Resend notification provider requires api_key and from options.',
      )
    }
  }

  async send(
    notification: NotificationTypes.ProviderSendNotificationDTO,
  ): Promise<NotificationTypes.ProviderSendNotificationResultsDTO> {
    const data = notification.data || {}
    const subjectFactory = subjects[notification.template]

    if (!subjectFactory) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Unsupported Resend email template: ${notification.template}`,
      )
    }

    try {
      const component = renderTemplate(notification.template, data)
      const [html, text] = await Promise.all([
        render(component),
        render(component, { plainText: true }),
      ])
      const replyTo = typeof notification.provider_data?.reply_to === 'string'
        ? notification.provider_data.reply_to
        : this.options.reply_to
      const { data: result, error } = await this.client.emails.send({
        from: notification.from?.trim() || this.options.from,
        html,
        replyTo,
        subject: notification.content?.subject || subjectFactory(data),
        text,
        to: notification.to,
      })

      if (error) {
        throw new Error(error.message)
      }

      return { id: result?.id }
    } catch (error) {
      this.logger.error(
        `[notification-resend] Failed to send template ${notification.template}: ${
          error instanceof Error ? error.message : 'Unknown Resend error'
        }`,
      )
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to send the ${notification.template} email.`,
      )
    }
  }
}

export default ResendNotificationProviderService
