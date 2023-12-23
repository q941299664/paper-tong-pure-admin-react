import { isFinite, isString } from 'lodash-es'

// 数字转换为千分位字符串形式
export function numberFormatThousand(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 判断一个值是否可以被解析为数字
export function isResolvableNumber(source: any) {
  return isString(source) ? isFinite(Number(source)) : isFinite(source)
}

// 将传入的值解析为数字
export function numberResolve(source: number, defaultValue: number) {
  return isResolvableNumber(source) ? Number(source) : defaultValue
}

// 将数字格式化为指定小数位的字符串
export function numberFormat(
  source: number,
  decimalCount = 0,
  round = false,
  defaultValue: number
) {
  const resolved = numberResolve(source, defaultValue)
  if (!isResolvableNumber(resolved)) return ''
  const precision = Math.pow(10, decimalCount)
  const roundedNum = round
    ? Math.round(resolved * precision) / precision
    : Math.floor(resolved * precision) / precision
  return roundedNum.toFixed(decimalCount)
}

// console.log(numberFormat(1          , 1            ) === '1.0')
// console.log(numberFormat('1'        , 1            ) === '1.0')
// console.log(numberFormat(1.05       , 1            ) === '1.0')
// console.log(numberFormat('1.05'     , 1            ) === '1.0')
// console.log(numberFormat(1.05       , 1, true      ) === '1.1')
// console.log(numberFormat('1.05'     , 1, true      ) === '1.1')
// console.log(numberFormat(null       , 1            ) === ''   )
// console.log(numberFormat('null'     , 1            ) === ''   )
// console.log(numberFormat(null       , 1, false, 1  ) === '1.0')
// console.log(numberFormat('null'     , 1, false, 1  ) === '1.0')
// console.log(numberFormat(undefined  , 1            ) === ''   )
// console.log(numberFormat('undefined', 1            ) === ''   )
// console.log(numberFormat(undefined  , 1, false, 1  ) === '1.0')
// console.log(numberFormat('undefined', 1, false, 1  ) === '1.0')
// console.log(numberFormat('undefined', 1, false, 'A') === ''   )

export function getNumberDecimal(number: number) {
  if (!isFinite(number)) return 0
  const decimal = number.toString().split('.')[1]
  return decimal ? decimal.length : 0
}
