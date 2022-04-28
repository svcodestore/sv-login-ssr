import CryptoJS from 'crypto-js'

export function aesEncrypt (data: string): string {
  const range = 2
  const timestamp = Date.now()
  const hex = parseInt(String(timestamp / 1000 / range)).toString(16)
  const keyStr = hex.padEnd(32, hex)
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const _ivStr = hex
    .split('')
    .reverse()
    .join('')
  const ivStr = _ivStr.padEnd(16, _ivStr)
  const iv = CryptoJS.enc.Utf8.parse(ivStr)

  const encoded = CryptoJS.AES.encrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    adding: CryptoJS.pad.ZeroPadding
  }).toString()

  return encoded
}

export function aesDecrypt (data: string): string {
  const range = 2
  const timestamp = Date.now()
  const hex = parseInt(String(timestamp / 1000 / range)).toString(16)
  const keyStr = hex.padEnd(32, hex)
  const key = CryptoJS.enc.Utf8.parse(keyStr)
  const _ivStr = hex
    .split('')
    .reverse()
    .join('')
  const ivStr = _ivStr.padEnd(16, _ivStr)
  const iv = CryptoJS.enc.Utf8.parse(ivStr)

  const decoded = CryptoJS.AES.decrypt(data, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    adding: CryptoJS.pad.ZeroPadding
  }).toString()

  return decoded
}
