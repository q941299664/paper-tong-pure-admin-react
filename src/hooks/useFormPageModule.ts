import { Form } from 'antd'
import { cloneDeep, isFunction, mapValues } from 'lodash-es'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { bridgeGet, bridgeKey } from '@/utils/bridge'
import { createHook } from '@/utils/createHook'
import { http } from '@/utils/http'

export const formLabelCol = {
  xs: { span: 24 },
  sm: { span: 6 },
  md: { span: 6 },
  lg: { span: 6 },
  xl: { span: 6 },
  xxl: { span: 6 }
}

export const spanAsFormLabel = mapValues(formLabelCol, value => value.span)

// 用于宽屏表单中
// 比如一般的表单页面 在宽屏时 右侧会有一部分空白
export const formWrapperCol = {
  xs: { span: 24 },
  sm: { span: 18 },
  md: { span: 18 },
  lg: { span: 16 },
  xl: { span: 14 },
  xxl: { span: 12 }
}
export const spanAsFormWrapper = mapValues(formWrapperCol, value => value.span)

// 用于在小型的表单中
// 比如在弹窗中的表单 或者注册页面的表单
// 匹配 label 的宽度 右侧不留空白
export const formWrapperColFill = {
  xs: { span: 24 },
  sm: { span: 18 },
  md: { span: 18 },
  lg: { span: 18 },
  xl: { span: 18 },
  xxl: { span: 18 }
}
export const spanAsFormWrapperFill = mapValues(formWrapperColFill, value => value.span)

interface UseFormPageModuleParams {
  objectURL?: string
  customSubmit?: ((form: any) => Promise<any>) | null
  customLoad?: ((id: string) => Promise<any>) | null
  backAfterSuccess?: boolean
}

export function useFormPageModule({
  objectURL = '', // 如果是标准的 restful api 则根据此路径自动生成创建和修改的 url
  customSubmit = null, // 自定义提交方法
  customLoad = null, // 自定义加载方法
  backAfterSuccess = true // 保存成功后是否返回
}: UseFormPageModuleParams = {}) {
  const location = useLocation()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  // ---------------------------------------- loading ----------------------------------------
  const [loading, setLoading] = useState(false)

  // ---------------------------------------- mode ----------------------------------------
  const search = new URLSearchParams(location.search)
  const mode = search.get('mode')
  const id = search.get('id') as string
  const isCreateMode = mode === 'create'
  const isEditMode = mode === 'edit'

  // ---------------------------------------- form ----------------------------------------
  const query = new URLSearchParams(location.search)
  const bridgeID = query.get(bridgeKey) as string
  const [formState, setFormState] = useState({})

  Form.useWatch((values: any) => {
    setFormState({
      ...values,
      ...bridgeGet(bridgeID)
    })
  })

  const { on: convertSubmitForm, trigger: convertSubmitFormTrigger } = createHook(e => e)

  async function formSubmit() {
    setLoading(true)
    try {
      const _form = convertSubmitFormTrigger(cloneDeep(formState))
      if (objectURL) {
        await http[isCreateMode ? 'post' : 'put'](objectURL, _form)
      } else if (customSubmit) {
        if (!isFunction(customSubmit)) {
          throw new Error('customSubmit 必须是一个函数')
        } else {
          await customSubmit(_form)
        }
      } else {
        throw new Error('请传入 objectURL 或者 customSubmit')
      }
      if (backAfterSuccess) {
        navigate(-1)
      }
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  function formReset() {
    form.resetFields()
  }

  async function formValidate() {
    await form.validateFields()
  }

  async function formTriggerSubmit() {
    await formValidate()
    await formSubmit()
  }

  const { on: afterFormLoad, trigger: afterFormLoadTrigger } = createHook(e => e)

  async function formLoad() {
    setLoading(true)
    try {
      if (objectURL) {
        setFormState(await http.get(`${objectURL}/${id}`))
      } else if (customLoad) {
        if (!isFunction(customLoad)) {
          throw new Error('customLoad 必须是一个函数')
        } else {
          setFormState(await customLoad(id))
        }
      } else if (bridgeID) {
        // 从 list 获取数据
      } else {
        throw new Error('请传入 objectURL 或者 customLoad')
      }
      afterFormLoadTrigger({})
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  // ---------------------------------------- props ----------------------------------------
  const formProps = {
    model: formState,
    labelCol: formLabelCol,
    wrapperCol: formWrapperCol,
    autocomplete: 'off',
    onFinish: formSubmit
  }

  // ---------------------------------------- others ----------------------------------------
  const title = isCreateMode ? '新建' : '编辑'

  if (isEditMode) {
    formLoad()
  }

  return {
    id,
    // loading
    loading,
    setLoading,
    // mode
    isCreateMode,
    isEditMode,
    // form
    form,
    formState,
    setFormState,
    convertSubmitForm,
    formSubmit,
    formReset,
    formValidate,
    formTriggerSubmit,
    formLoad,
    afterFormLoad,
    // props
    formProps,
    // others
    title
  }
}
