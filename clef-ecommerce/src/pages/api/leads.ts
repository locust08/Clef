import type { NextApiRequest, NextApiResponse } from 'next'

import { getEmailConfiguration } from '../../lib/email/resend.server'
import { sendEmail } from '../../lib/email/send-email.server'
import { saveLead } from '../../lib/leads/store-lead.server'
import { submitLead } from '../../lib/leads/submit-lead'

type LeadResponse = {
  accepted: boolean
  emailConfigured: boolean
  emailSent: boolean
  leadId: string
  leadSaved: boolean
  warnings: string[]
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_FIELD_LENGTH = 5_000
const LEAD_TYPES = new Set(['contact', 'enquiry', 'lead', 'newsletter'])

const cleanField = (value: unknown) =>
  typeof value === 'string' ? value.trim().slice(0, MAX_FIELD_LENGTH) : ''

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<LeadResponse | { error: string }>,
) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed.' })
  }

  const email = cleanField(request.body?.email).toLowerCase()
  const name = cleanField(request.body?.name)
  const message = cleanField(request.body?.message)
  const source = cleanField(request.body?.source).slice(0, 200) || 'website'
  const submittedType = cleanField(request.body?.type).toLowerCase()
  const type = LEAD_TYPES.has(submittedType) ? submittedType : 'lead'

  if (!EMAIL_PATTERN.test(email)) {
    return response.status(400).json({ error: 'A valid email address is required.' })
  }

  const adminTo = process.env.EMAIL_ADMIN_TO?.trim()
  const emailConfiguration = getEmailConfiguration()
  try {
    const result = await submitLead(
      { email, message, name, source, type },
      {
        adminTo,
        emailConfigured: emailConfiguration.configured,
        saveLead,
        sendEmail,
      },
    )

    return response.status(201).json({ accepted: true, ...result })
  } catch (error) {
    console.error('[leads] Failed to persist a website submission.', {
      message: error instanceof Error ? error.message : 'Unknown persistence error',
    })
    return response.status(500).json({ error: 'Unable to save your submission right now.' })
  }
}
