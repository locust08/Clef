import 'server-only'

import { Resend } from 'resend'

let resendClient: Resend | null = null

export const getEmailConfiguration = () => {
  const enabled = process.env.EMAIL_ENABLED?.toLowerCase() === 'true'
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const fromAddress = process.env.EMAIL_FROM_ADDRESS?.trim()
  const fromName = process.env.EMAIL_FROM_NAME?.trim() || 'Clef'

  return {
    configured: Boolean(enabled && apiKey && fromAddress),
    enabled,
    from: fromAddress ? `${fromName} <${fromAddress}>` : '',
    replyTo: process.env.EMAIL_REPLY_TO?.trim() || undefined,
  }
}

export const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY?.trim()

  if (!apiKey) {
    return null
  }

  resendClient ??= new Resend(apiKey)
  return resendClient
}
