import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components'
import React from 'react'

import { formatAmount, type OrderEmailData } from './types'

export const OrderConfirmationEmail = (order: OrderEmailData) => {
  const orderNumber = order.display_id || order.id || 'your order'
  const customerName = [
    order.shipping_address?.first_name,
    order.shipping_address?.last_name,
  ].filter(Boolean).join(' ')

  return (
    <Html>
      <Head />
      <Preview>{`Your CLEF order #${String(orderNumber)} is confirmed`}</Preview>
      <Body style={{ backgroundColor: '#f7f1ea', fontFamily: 'Arial, sans-serif', padding: '24px' }}>
        <Container style={{ backgroundColor: '#ffffff', borderRadius: '8px', margin: '0 auto', maxWidth: '600px', padding: '32px' }}>
          <Heading style={{ color: '#4f356b' }}>Thank you for your order</Heading>
          <Text>{customerName ? `Hi ${customerName},` : 'Hello,'}</Text>
          <Text>We have received CLEF order #{orderNumber} and will update you when it ships.</Text>
          <Hr />
          {(order.items || []).map((item, index) => (
            <Section key={item.id || `${item.title}-${index}`}>
              <Text>
                <strong>{item.title || item.product_title || 'CLEF product'}</strong>
                {item.variant_title ? ` - ${item.variant_title}` : ''} x {item.quantity || 1}
                {' - '}{formatAmount(item.total ?? (item.unit_price || 0) * (item.quantity || 1), order.currency_code)}
              </Text>
            </Section>
          ))}
          <Hr />
          <Text><strong>Total: {formatAmount(order.total, order.currency_code)}</strong></Text>
          <Text style={{ color: '#6b7280', fontSize: '12px' }}>This is a transactional message about your CLEF order.</Text>
        </Container>
      </Body>
    </Html>
  )
}
