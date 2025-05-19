import { javaRequest } from './request'

/**
 * Java后端文件上传接口
 * 上传文件到Java后端的formatPaperFile/upload接口
 * @param file 要上传的文件对象
 * @returns 上传结果的Promise
 */
export function uploadFormatPaperFileToJava(file: File): Promise<any> {
  // 创建FormData对象
  const formData = new FormData()

  // 添加固定的templateId参数
  formData.append('templateId', '1')

  // 添加文件
  formData.append('file', file)

  // 发送请求
  return javaRequest.post('/formatPaperFile/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
