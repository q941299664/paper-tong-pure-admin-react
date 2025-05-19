import { request } from '@/utils/request'

export function uploadFormatPaperFile(data: any): Promise<any> {
  return request.post('/admin/formatPaperFile/upload', data)
}
