import Cookies from 'js-cookie'

import { projectSign } from '@/utils/string.ts'

export function get(name: string, defaultValue: string, project: string, version: string) {
  return Cookies.get(projectSign(name, project, version)) || defaultValue
}

export function set(
  name: string,
  value: string,
  expires: number = 7,
  project: string,
  version: string
) {
  return Cookies.set(projectSign(name, project, version), value, { expires })
}

export function remove(name: string, project: string, version: string) {
  return Cookies.remove(projectSign(name, project, version))
}
