import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { message } from 'antd'
import Axios from 'axios'
import i18n from 'i18next'

import { useAppStore } from '@/stores/appStore'

/**
 * Java API请求工具
 * 创建一个专用于Java后端的Axios实例，配置基础URL和拦截器
 */
export const javaRequest = Axios.create({
  baseURL: import.meta.env.VITE_JAVA_API_BASEURL,
  timeout: 1000 * 30,
})

// 本地存储token的key
const TOKEN_KEY = 'java_access_token'

// 是否正在自动登录
let isAutoLoggingIn = false

// 存储等待重试的请求
let pendingRequests: Array<{
  config: InternalAxiosRequestConfig
  resolve: (value: any) => void
  reject: (reason: any) => void
}> = []

/**
 * 获取登录参数
 * @returns 固定的登录参数
 */
export function getLoginParams() {
  return {
    telephone: '15159529478',
    password: '123456a',
  }
}

/**
 * 获取存储的Java API token
 * @returns 存储的token或null
 */
export function getJavaToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

/**
 * 设置Java API token到本地存储
 * @param token 要存储的token
 */
export function setJavaToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

/**
 * 清除存储的Java API token
 */
export function clearJavaToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * 自动登录并处理等待的请求
 */
async function autoLogin() {
  if (isAutoLoggingIn) {
    return
  }

  isAutoLoggingIn = true

  try {
    // 使用固定的登录参数
    const data = getLoginParams()

    // 发起登录请求
    const response = await Axios.post(
      `${import.meta.env.VITE_JAVA_API_BASEURL}/user/login`,
      data,
    )

    // 存储新token
    if (response.data && response.data.data && response.data.data.token) {
      setJavaToken(response.data.data.token)

      // 重试所有等待的请求
      const requests = [...pendingRequests]
      pendingRequests = []

      for (const { config, resolve, reject } of requests) {
        // 更新token
        config.headers['x-access-token'] = response.data.data.token

        // 重新发送请求
        try {
          const result = await javaRequest(config)
          resolve(result)
        }
        catch (error) {
          reject(error)
        }
      }
    }
  }
  catch (error) {
    console.error('自动登录失败', error)
    // 拒绝所有等待的请求
    pendingRequests.forEach(({ reject }) => reject(error))
    pendingRequests = []
  }
  finally {
    isAutoLoggingIn = false
  }
}

// 请求拦截器
javaRequest.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getJavaToken()
  const { currentLocale } = useAppStore.getState()

  // 设置语言头
  config.headers['x-lang'] = currentLocale

  // 如果有token且不是登录请求，添加到请求头
  if (token && config.url !== '/user/login') {
    config.headers['x-access-token'] = token
  }

  return config
}, error => Promise.reject(error))

// 响应拦截器
javaRequest.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response

    // 处理成功响应
    if (data.code === 200) {
      return data
    }
    // 处理未登录情况（响应体中code为401）
    else if (data.code === 401) {
      // 如果是登录请求，直接拒绝
      if (response.config.url === '/user/login') {
        message.error(data.message || '登录失败')
        return Promise.reject(data)
      }

      // 保存当前请求配置
      const originalRequest = response.config

      // 返回新的Promise
      return new Promise((resolve, reject) => {
        // 将请求添加到等待队列
        pendingRequests.push({
          config: originalRequest,
          resolve,
          reject,
        })

        // 触发自动登录
        autoLogin()
      })
    }
    else {
      // 显示错误消息
      message.error(data.message || '请求失败')
      return Promise.reject(data)
    }
  },
  (error) => {
    // 处理错误响应
    if (!error.response) {
      message.error(i18n.t('common.networkError') || '网络错误')
      return Promise.reject(error)
    }

    // 处理401未授权错误（HTTP状态码为401）
    if (error.response.status === 401) {
      // 如果是登录请求，直接拒绝
      if (error.config.url === '/user/login') {
        message.error('登录失败')
        return Promise.reject(error)
      }

      // 保存当前请求配置
      const originalRequest = error.config

      // 返回新的Promise
      return new Promise((resolve, reject) => {
        // 将请求添加到等待队列
        pendingRequests.push({
          config: originalRequest,
          resolve,
          reject,
        })

        // 触发自动登录
        autoLogin()
      })
    }

    const errMsg = error.response?.data?.message || error.message
    message.error(errMsg)

    return Promise.reject(error)
  },
)
