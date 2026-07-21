import type { ReactNode } from 'react'

import './styles.css'

type Props = {
  children: ReactNode
}

export default function FirstUserLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
