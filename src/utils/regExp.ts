export const usernameRegExp = /^[a-zA-Z0-9_-]{4,16}$/

export const mobileRegExp = /^1[3456789]\d{9}$/

export const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,8}$/

export const passwordRegExpError = '6至8位字符，须同时包含字母及数字'
