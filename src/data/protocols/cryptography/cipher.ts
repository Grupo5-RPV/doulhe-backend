export default interface ICipher {
  decrypt: (text: string) => string
  encrypt: (text: string) => string
}
