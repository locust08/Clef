import { Resend } from 'resend'

const main = async () => {
  const recipientIndex = process.argv.indexOf('--to')
  const to = recipientIndex >= 0 ? process.argv[recipientIndex + 1]?.trim() : ''
  const enabled = process.env.EMAIL_ENABLED?.toLowerCase() === 'true'
  const apiKey = process.env.RESEND_API_KEY?.trim()
  const fromAddress = process.env.EMAIL_FROM_ADDRESS?.trim()
  const fromName = process.env.EMAIL_FROM_NAME?.trim() || 'Clef'

  if (!to) {
    throw new Error('A test recipient is required. Use: npm run test:email -- --to you@example.com')
  }

  if (!enabled || !apiKey || !fromAddress) {
    throw new Error('Email is disabled or RESEND_API_KEY / EMAIL_FROM_ADDRESS is missing.')
  }

  const { data, error } = await new Resend(apiKey).emails.send({
    from: `${fromName} <${fromAddress}>`,
    subject: 'CLEF storefront email test',
    text: 'This is an intentional CLI test from clef-ecommerce.',
    to,
  })

  if (error) {
    throw new Error(`Resend rejected the test email: ${error.message}`)
  }

  console.info(`[email:test] Sent the clef-ecommerce test email to ${to}. Message ID: ${data?.id}`)
}

void main()
