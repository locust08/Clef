import { escapeHtml } from '../email/escape-html'

export type LeadSubmission = {
  email: string
  message: string
  name: string
  source: string
  type: string
}

type EmailInput = {
  html: string
  replyTo: string
  subject: string
  text: string
  to: string
}

type EmailResult = {
  emailConfigured: boolean
  emailSent: boolean
  warning?: string
}

type SubmitLeadDependencies = {
  adminTo?: string
  emailConfigured: boolean
  saveLead: (submission: LeadSubmission) => Promise<{ id: string }>
  sendEmail: (input: EmailInput) => Promise<EmailResult>
}

export const submitLead = async (
  submission: LeadSubmission,
  dependencies: SubmitLeadDependencies,
) => {
  // Persistence is intentionally completed before the non-critical email.
  const savedLead = await dependencies.saveLead(submission)
  const warnings: string[] = []

  if (!dependencies.adminTo) {
    warnings.push('EMAIL_ADMIN_TO is not configured; no admin notification was attempted.')
    return {
      emailConfigured: dependencies.emailConfigured,
      emailSent: false,
      leadId: savedLead.id,
      leadSaved: true,
      warnings,
    }
  }

  // Every submitted value is escaped before it is inserted into HTML.
  const safeEmail = escapeHtml(submission.email)
  const safeName = escapeHtml(submission.name || 'Not provided')
  const safeMessage = escapeHtml(submission.message || 'Not provided').replace(/\r?\n/g, '<br />')
  const safeSource = escapeHtml(submission.source)
  const safeType = escapeHtml(submission.type)
  const emailResult = await dependencies.sendEmail({
    to: dependencies.adminTo,
    replyTo: submission.email,
    subject: `CLEF ${submission.type} submission`,
    html: [
      '<h1>New CLEF website submission</h1>',
      `<p><strong>Type:</strong> ${safeType}</p>`,
      `<p><strong>Source:</strong> ${safeSource}</p>`,
      `<p><strong>Name:</strong> ${safeName}</p>`,
      `<p><strong>Email:</strong> ${safeEmail}</p>`,
      `<p><strong>Message:</strong><br />${safeMessage}</p>`,
    ].join(''),
    text: `New CLEF website submission\nType: ${submission.type}\nSource: ${submission.source}\nName: ${submission.name || 'Not provided'}\nEmail: ${submission.email}\nMessage: ${submission.message || 'Not provided'}`,
  })

  if (emailResult.warning) {
    warnings.push(emailResult.warning)
  }

  return {
    emailConfigured: emailResult.emailConfigured,
    emailSent: emailResult.emailSent,
    leadId: savedLead.id,
    leadSaved: true,
    warnings,
  }
}
