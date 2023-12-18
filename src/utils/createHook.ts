type CreateHookFn = (...args: any[]) => any
type CreateHookParams = any

export function createHook(defaultHook?: CreateHookFn, sync = false) {
  const handlers: Array<CreateHookFn> = []

  if (defaultHook) {
    handlers.push(defaultHook)
  }

  const off = (fn: CreateHookFn) => {
    const index = handlers.indexOf(fn)
    if (index !== -1) {
      handlers.splice(index, 1)
    }
  }

  const on = (fn: CreateHookFn) => {
    handlers.push(fn)
    return { off: () => off(fn) }
  }

  const trigger = sync
    ? (param: CreateHookParams) => {
        return handlers.reduce((acc, fn) => fn(acc), param)
      }
    : async (param: CreateHookParams) => {
        for (const fn of handlers) {
          param = await Promise.resolve(fn(param))
        }
        return param
      }

  return { on, off, trigger, handlers }
}
