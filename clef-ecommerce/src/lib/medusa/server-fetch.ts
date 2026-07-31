import { getMedusaBackendUrl, getMedusaPublishableKey } from '../medusa-store'

export const medusaServerFetch = async (
  path: string,
  init: RequestInit & { authToken?: string | null } = {},
) => {
  const publishableKey = getMedusaPublishableKey()

  if (!publishableKey) {
    throw new Error('NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY is required.')
  }

  const { authToken, ...requestInit } = init
  const headers = new Headers(requestInit.headers)
  headers.set('x-publishable-api-key', publishableKey)

  if (authToken) {
    headers.set('authorization', `Bearer ${authToken}`)
  }

  if (requestInit.body && !headers.has('content-type')) {
    headers.set('content-type', 'application/json')
  }

  return fetch(`${getMedusaBackendUrl()}${path}`, {
    ...requestInit,
    cache: 'no-store',
    headers,
  })
}

