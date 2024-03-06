const storagePrefix = 'a-admin'

export const storage = {
  set(key: string, value: string) {
    localStorage.setItem(`${storagePrefix}-${key}`, value)
  },
  get(key: string) {
    return localStorage.getItem(`${storagePrefix}-${key}`)
  },
  clear(key: string) {
    localStorage.removeItem(`${storagePrefix}-${key}`)
  }
}
