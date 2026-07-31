import { isDocumentEvent, ready } from '@payloadcms/live-preview'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'

type PreviewControlsProps = {
  active?: boolean
}
export default function PreviewControls({ active }: PreviewControlsProps) {
  const router = useRouter()
  const refreshing = useRef(false)
  const payloadOrigin = process.env.NEXT_PUBLIC_PAYLOAD_URL

  useEffect(() => {
    if (!active || !payloadOrigin) {
      return
    }

    const origin = new URL(payloadOrigin).origin
    const onMessage = (event: MessageEvent) => {
      if (!isDocumentEvent(event, origin) || refreshing.current) {
        return
      }

      refreshing.current = true
      void router
        .replace(router.asPath, undefined, { scroll: false })
        .finally(() => {
          refreshing.current = false
        })
    }

    window.addEventListener('message', onMessage)
    ready({ serverURL: origin })

    return () => window.removeEventListener('message', onMessage)
  }, [active, payloadOrigin, router])

  if (!active) {
    return null
  }

  return (
    <aside
      aria-label="Preview mode"
      style={{
        alignItems: 'center',
        background: '#111827',
        bottom: 16,
        color: '#fff',
        display: 'flex',
        gap: 12,
        left: '50%',
        padding: '10px 14px',
        position: 'fixed',
        transform: 'translateX(-50%)',
        zIndex: 2147483647,
      }}
    >
      <span>Draft preview</span>
      <a
        href={`/api/exit-preview?path=${encodeURIComponent(router.asPath.split('?')[0] || '/')}`}
        style={{ color: '#fff', textDecoration: 'underline' }}
      >
        Exit preview
      </a>
    </aside>
  )
}
