export type OrderLine = {
  id?: string
  title?: string
  product_title?: string
  variant_title?: string
  quantity?: number
  unit_price?: number
  total?: number
}

export type OrderEmailData = {
  id?: string
  display_id?: string | number
  email?: string
  currency_code?: string
  total?: number
  items?: OrderLine[]
  shipping_address?: {
    first_name?: string
    last_name?: string
  }
}

export type PasswordResetEmailData = {
  actor_type?: string
  reset_url?: string
}

export const formatAmount = (amount: number | undefined, currency = 'MYR') =>
  new Intl.NumberFormat('en-MY', {
    currency: currency.toUpperCase(),
    style: 'currency',
  }).format(Number(amount || 0))
