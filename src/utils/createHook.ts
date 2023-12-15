export function createHook(defaultHook?: (param: any) => any, sync = false) {
  const handlers: Array<(param: any) => any> = []

  if (defaultHook) {
    handlers.push(defaultHook)
  }

  const off = (fn: (param: any) => any) => {
    const index = handlers.indexOf(fn)
    if (index !== -1) {
      handlers.splice(index, 1)
    }
  }

  const on = (fn: (param: any) => any) => {
    handlers.push(fn)
    return { off: () => off(fn) }
  }

  const trigger = sync
    ? (param: any) => {
        return handlers.reduce((acc, fn) => fn(acc), param)
      }
    : async (param: any) => {
        for (const fn of handlers) {
          param = await Promise.resolve(fn(param))
        }
        return param
      }

  return { on, off, trigger, handlers }
}
