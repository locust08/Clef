export function hasTrustedFormOrigin(request: Request) {
  const requestOrigin = request.headers.get('origin')

  try {
    const expectedOrigin =
      process.env.NODE_ENV === 'production'
        ? new URL(
            process.env.PAYLOAD_PUBLIC_SERVER_URL ||
              process.env.NEXT_PUBLIC_SERVER_URL ||
              '',
          ).origin
        : new URL(request.url).origin

    return Boolean(requestOrigin) && requestOrigin === expectedOrigin
  } catch {
    return false
  }
}
