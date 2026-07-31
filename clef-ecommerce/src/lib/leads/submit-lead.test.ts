import assert from 'node:assert/strict'
import test from 'node:test'

import { submitLead } from './submit-lead'

const maliciousSubmission = {
  email: 'customer@example.com',
  message: '<script>alert("x")</script>',
  name: '<b>Customer</b>',
  source: 'website',
  type: 'enquiry',
}

test('persists a lead before email and keeps the save successful when Resend fails', async () => {
  const calls: string[] = []
  const result = await submitLead(maliciousSubmission, {
    adminTo: 'admin@example.com',
    emailConfigured: true,
    saveLead: async () => {
      calls.push('save')
      return { id: 'lead_test' }
    },
    sendEmail: async (input) => {
      calls.push('email')
      assert.equal(input.to, 'admin@example.com')
      assert.equal(input.replyTo, maliciousSubmission.email)
      assert.doesNotMatch(input.html, /<script>|<b>/)
      assert.match(input.html, /&lt;script&gt;/)
      return {
        emailConfigured: true,
        emailSent: false,
        warning: 'Simulated Resend failure.',
      }
    },
  })

  assert.deepEqual(calls, ['save', 'email'])
  assert.equal(result.leadSaved, true)
  assert.equal(result.leadId, 'lead_test')
  assert.equal(result.emailSent, false)
  assert.deepEqual(result.warnings, ['Simulated Resend failure.'])
})
