import 'server-only'

import { getEmailConfiguration, getResendClient } from './resend.server'

export type SendEmailInput = {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
}

export type SendEmailResult = {
  emailConfigured: boolean
  emailSent: boolean
  warning?: string
}

export const sendEmail = async (input: SendEmailInput): Promise<SendEmailResult> => {
  const configuration = getEmailConfiguration()
  const resend = getResendClient()

  if (!configuration.configured || !resend) {
    return {
      emailConfigured: false,
      emailSent: false,
      warning: configuration.enabled
        ? 'Email is enabled but its server-side Resend configuration is incomplete.'
        : 'Email delivery is disabled.',
    }
  }

  try {
    const { error } = await resend.emails.send({
      from: configuration.from,
      html: input.html,
      replyTo: input.replyTo || configuration.replyTo,
      subject: input.subject,
      text: input.text,
      to: input.to,
    })

    if (error) {
      console.error('[email] Resend rejected an email.', {
        message: error.message,
        name: error.name,
      })
      return {
        emailConfigured: true,
        emailSent: false,
        warning: 'The submission succeeded, but the email notification could not be sent.',
      }
    }

    return { emailConfigured: true, emailSent: true }
  } catch (error) {
    console.error('[email] Failed to send an email.', {
      message: error instanceof Error ? error.message : 'Unknown email error',
    })
    return {
      emailConfigured: true,
      emailSent: false,
      warning: 'The submission succeeded, but the email notification could not be sent.',
    }
  }
}
