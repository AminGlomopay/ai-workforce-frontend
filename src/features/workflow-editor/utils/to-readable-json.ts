// Escaped newlines become real ones so multi-line text, such as an agent's reply, reads as written.
// Escapes are consumed in pairs, so an escaped backslash followed by `n` stays as it is.
export const toReadableJson = (value: unknown): string =>
  JSON.stringify(value, null, 2).replace(/\\(.)/g, (escape, char: string) => (char === 'n' ? '\n' : escape));
