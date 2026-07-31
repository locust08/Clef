import { Body, Button, Container, Head, Heading, Html, Preview, Text } from '@react-email/components'
import React from 'react'

import type { PasswordResetEmailData } from './types'

export const PasswordResetEmail = ({ reset_url: resetUrl }: PasswordResetEmailData) => (
  <Html>
    <Head />
    <Preview>Reset your CLEF password</Preview>
    <Body style={{ backgroundColor: '#f7f1ea', fontFamily: 'Arial, sans-serif', padding: '24px' }}>
      <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', margin: '0 auto', maxWidth: '600px', padding: '32px' }}>
        <Heading style={{ color: '#4f356b' }}>Reset your password</Heading>
        <Text>Use the secure link below to choose a new CLEF password. The link expires automatically.</Text>
        <Button href={resetUrl || '#'} style={{ backgroundColor: '#7c3aed', borderRadius: '4px', color: '#ffffff', padding: '12px 20px' }}>
          Reset password
        </Button>
        <Text>If you did not request a password reset, you can ignore this email.</Text>
      </Container>
    </Body>
  </Html>
)
