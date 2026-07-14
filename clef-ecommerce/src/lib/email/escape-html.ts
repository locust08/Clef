const HTML_ESCAPE_PATTERN = /[&<>'"]/g

const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  "'": '&#39;',
  '"': '&quot;',
}

export const escapeHtml = (value: unknown) =>
  String(value ?? '').replace(HTML_ESCAPE_PATTERN, (character) => HTML_ENTITIES[character])
