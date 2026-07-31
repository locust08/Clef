import { getPayload } from 'payload'

import config from '../payload.config'

const main = async () => {
  const recipientIndex = process.argv.indexOf('--to')
  const to = recipientIndex >= 0 ? process.argv[recipientIndex + 1]?.trim() : ''

  if (!to) {
    throw new Error('A test recipient is required. Use: npm run test:email -- --to you@example.com')
  }

  if (process.env.EMAIL_ENABLED?.toLowerCase() !== 'true') {
    throw new Error('EMAIL_ENABLED must be true to send an intentional CLI test email.')
  }

  if (!process.env.RESEND_API_KEY?.trim() || !process.env.EMAIL_FROM_ADDRESS?.trim()) {
    throw new Error('RESEND_API_KEY and EMAIL_FROM_ADDRESS are required.')
  }

  const payload = await getPayload({ config })
  const result = await payload.sendEmail({
    subject: 'CLEF Payload email test',
    text: 'This is an intentional CLI test from clef-payload.',
    to,
  })

  console.info(`[email:test] Sent the clef-payload test email to ${to}.`, result)
  process.exit(0)
}

void main()
