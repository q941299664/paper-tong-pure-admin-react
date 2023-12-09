/// <reference types="vite/client" />
type PrefixKeys<T, Prefix extends string> = {
  [P in keyof T as `${Prefix}${Capitalize<string & K>}`]: T[P]
}
