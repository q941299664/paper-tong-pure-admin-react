import { message } from 'antd'
import Axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'

import { storage } from './storage'

export const http = Axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = storage.get('token')

  if (token) config.headers.token = `token`

  return config
})

http.interceptors.response.use(
  config => {
    const { data } = config
    if (data.code === 0) {
      return data.data
    } else {
      message.error(data.message)
      if (data.code === 401) storage.clear('token')

      return Promise.reject(data)
    }
  },
  error => {
    const message = error.response?.data?.message || error.message
    console.error(message)

    return Promise.reject(error)
  }
)
