import { useRef, useState } from 'react'

export function useListPageModule({
  columns = [], // 表格的列配置
  idKey = 'id', // 行数据的唯一值字段
  customLoad = null, // 自定义加载方法
  getDataListURL = '', // 数据列表接口 API地址
  getDataListIsPage = false, // 数据列表接口 是否需要分页
  deleteURL = '', // 删除接口 API地址
  deleteIsBatch = false, // 删除接口 是否需要批量
  selectable = deleteIsBatch, // 是否开启多选 默认跟随 deleteIsBatch
  selectCrossPage = false, // 是否开启跨页选择
  customDelete = null, // 自定义删除方法
  exportURL = '', // 导出接口 API地址
  pageEditPath = './edit/{id}', // 编辑页面路径
  pageCreatePath = './create/new', // 新建页面路径
  pageDetailPath = './detail/{id}' // 详情页面路径
} = {}) {
  // ---------------------------------------- loading ----------------------------------------
  const [loadingState, setLoadingState] = useState(false)
  function loadingStateSet(value: boolean) {
    setLoadingState(value)
  }

  type AsyncFn = (...args: any[]) => Promise<any>
  async function loadingFunctionWrapper(fn: AsyncFn) {
    loadingStateSet(true)
    try {
      await fn()
    } finally {
      loadingStateSet(false)
    }
  }

  // ---------------------------------------- order ----------------------------------------
  const [orderType, setOrderType] = useState('')
  const [orderField, setOrderField] = useState('')

  // ---------------------------------------- form ----------------------------------------
  const formRef = useRef(null)
}
