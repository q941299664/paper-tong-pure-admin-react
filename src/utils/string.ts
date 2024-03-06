import { nanoid } from 'nanoid'

// 加密
export function enCode(str: string) {
  const key = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const l = key.length // 获取密钥的长度
  const a = key.split('') // 把密钥字符串转换为字符数组
  let s = '',
    b,
    b1,
    b2,
    b3 // 定义临时变量
  for (let i = 0; i < str.length; i++) {
    b = str.charCodeAt(i) // 逐个提取每个字符，并获取Unicode编码值
    b1 = b % l // 求Unicode编码值得余数
    b = (b - b1) / l // 求最大倍数
    b2 = b % l // 求最大倍数的于是
    b = (b - b2) / l // 求最大倍数
    b3 = b % l // 求最大倍数的余数
    s += a[b3] + a[b2] + a[b1] // 根据余数值映射到密钥中对应下标位置的字符
  }
  return s
}

// 解密
export function deCode(str: string) {
  const key = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const l = key.length
  let b,
    b1,
    b2,
    b3,
    d = 0,
    s
  s = new Array(Math.floor(str.length / 3)) // 计算加密字符串包含的字符数，并定义数组
  b = s.length // 获取数组的长度
  for (let i = 0; i < b; i++) {
    b1 = key.indexOf(str.charAt(d)) // 截取周期内第一个字符串，计算在密钥中的下标值
    d++
    b2 = key.indexOf(str.charAt(d)) // 截取周期内第二个字符串，计算在密钥中的下标值
    d++
    b3 = key.indexOf(str.charAt(d)) // 截取周期内第三个字符串，计算在密钥中的下标值
    d++
    s[i] = b1 * l * l + b2 * l + b3 // 利用下标值，反推被加密字符的Unicode编码值
  }
  b = eval(`String.fromCharCode(${s.join(',')})`)
  return b
}

// 检验字符串是否在限制长度内
// 中文字符长度为2，英文字符长度为1
export function inLimitStringLength(text: string, enLength: number) {
  let length = 0
  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) > 127 || text.charCodeAt(i) === 94) {
      length += 2
    } else {
      length++
    }
  }
  return length <= enLength
}

export const id8 = () => nanoid(8)

export function isHttpUrl(path: string) {
  return /^https?:\/\//.test(path)
}

export function projectSign(text: string, project: string, version: string) {
  return `${project}-${version}-${text}`
}
