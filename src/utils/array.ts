export function joinItem<T>(source: T[], separator: T): T[] {
  const result = []
  for (let index = 0; index < source.length; index++) {
    result.push(source[index])
    if (index < source.length - 1) {
      result.push(separator)
    }
  }
  return result
}
