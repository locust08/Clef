import { Body, Container, Head, Heading, Hr, Html, Preview, Text } from '@react-email/components'
import React from 'react'

import { formatAmount, type OrderEmailData } from './types'

export const AdminNewOrderEmail = (order: OrderEmailData) => {
  const orderNumber = order.display_id || order.id || 'unknown'

  return (
    <Html>
      <Head />
      <Preview>{`New CLEF order #${String(orderNumber)}`}</Preview>
      <Body style={{ backgroundColor: '#f3f4f6', fontFamily: 'Arial, sans-serif', padding: '24px' }}>
        <Container style={{ backgroundColor: '#ffffff', margin: '0 auto', maxWidth: '600px', padding: '32px' }}>
          <Heading>New CLEF order</Heading>
          <Text><strong>Order:</strong> #{orderNumber}</Text>
          <Text><strong>Customer:</strong> {order.email || 'No customer email on the order'}</Text>
          <Text><strong>Items:</strong> {(order.items || []).length}</Text>
          <Hr />
          <Text><strong>Total:</strong> {formatAmount(order.total, order.currency_code)}</Text>
          <Text>Open Medusa Admin to review and fulfil this order.</Text>
        </Container>
      </Body>
    </Html>
  )
}
