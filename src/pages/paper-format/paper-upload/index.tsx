import type { GetProp, UploadProps } from 'antd'
import type { UploadFile } from 'antd/lib/upload/interface'

import { InboxOutlined } from '@ant-design/icons'
import {
  Divider,
  Form,
  List,
  message,
  Modal,
  Space,
  Steps,
  Table,
  theme,
  Typography,
  Upload,
} from 'antd'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import type { BasePageParams } from '@/types/base'

import { uploadFormatPaperFile } from '@/apis/paperUpload'
import { Button, ResetButton } from '@/components/button'
import {
  FormContainer,
  SearchContainer,
  SearchTableContainer,
} from '@/components/container'
import { useSearchTableContainer } from '@/hooks/useSearchTableContainer'
import { useTable } from '@/hooks/useTable'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

export default function PaperUploadPaperFormat() {
  const { t } = useTranslation()
  const { token } = theme.useToken()
  const [current, setCurrent] = useState(0)

  // Mock API函数
  function getListApi() {
    return Promise.resolve({
      list: [
        {
          gmtCreate: '2024-03-10',
          gmtUpdate: '2024-03-14',
          id: '1',
          name: '福州大学至诚学院',
        },
      ],
      total: 1,
    })
  }

  // 获取容器配置
  const { listContainerProps, tableScrollY } = useSearchTableContainer()

  // 使用表格Hook
  const { form, tableProps, handleReset } = useTable({
    key: 'data-table-example',
    pagination: true,
    listApiFn: getListApi,
    columns: [
      { title: '模板名称', dataIndex: 'name' },
      { title: '创建时间', dataIndex: 'gmtCreate', width: 200 },
      { title: '更新时间', dataIndex: 'gmtUpdate', width: 200 },
      {
        title: t('page.dataTableExample.action'),
        key: 'actions',
        fixed: 'right',
        width: 100,
        render: row => (
          <Button
            icon="icon-park-outline:telegram"
            type="text"
            size="small"
            onClick={() => next(row)}
          >
          </Button>
        ),
      },
    ],
  })
  const formRef = useRef(null)

  // 通知弹窗
  function handleNotice() {
    Modal.info({
      title: t('page.dataTableExample.noticeTitle'),
      content: t('page.dataTableExample.noticeContent'),
    })
  }
  // 搜索表单
  const searchForm = (
    <Form
      ref={formRef}
      form={form}
      colon={false}
      autoComplete="off"
      onFinish={handleNotice}
    >
      <SearchContainer
        actions={(
          <>
            <Space>
              <ResetButton onClick={handleReset} />
            </Space>
            <Divider type="vertical" />
          </>
        )}
      >
      </SearchContainer>
    </Form>
  )

  const [templateId, setTemplateId] = useState(null)
  const next = (id?: any) => {
    id && setTemplateId(id)
    setCurrent(current + 1)
  }

  const prev = () => {
    setCurrent(current - 1)
  }

  const { Dragger } = Upload
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [uploading, setUploading] = useState(false)
  const props: UploadProps = {
    name: 'file',
    multiple: true,
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} 文件上传成功`)
      }
      else if (status === 'error') {
        message.error(`${info.file.name} 文件上传失败`)
      }
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file])
      return false
    },
    onDrop(e) {
      console.log('删除文件', e.dataTransfer.files)
    },
  }
  const handleUpload = async (e: Event) => {
    // 阻止点击事件冒泡
    e.stopPropagation()
    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('files[]', file as FileType)
    })
    setUploading(true)
    // 发送上传请求
    try {
      const data = await uploadFormatPaperFile(formData)
      setFileList([])
      message.success('上传成功')
      console.log('上传成功:', data)
    }
    catch (err) {
      message.error('上传失败')
      console.log('上传失败:', err)
    }
    finally {
      setUploading(false)
    }
  }

  const uploadHints = [
    '1. 仅支持docx格式的文档',
    '2. 如果是doc文档，请在WPS或是Office Word内另存为docx文档！！！',
    '3. 封面信息需要填写（保证页眉以及摘要部分信息正确）',
    '4. 标题的字号不能小于小四',
    '5. 标题的编号得统一，例如：第一章，1.1，1.1.1（编号顺序会自动调整）',
    '6. 续表问题系统无法处理，需要自己手工处理（建议排完版再调整续表）（附带调整教程）',
    '7. 浮动图片和矢量图无法处理，避免使用这两类图',
    '8. 排版完如果是wps，ctrl+a+f9刷新目录以及编号；如果是word：跳出弹窗点是，如果点了否按wps的方式也可刷新',
    '9. 排版后如果有问题可以找微信群的客服(点击右上角小信箱加客服进群)',
  ]

  const steps = [
    {
      title: '选择模板',
      content: (
        <SearchTableContainer
          {...listContainerProps}
          searchForm={searchForm}
          tableCardHeight={200}
        >
          <Table {...tableProps} />
        </SearchTableContainer>
      ),
    },
    {
      title: '上传论文',
      content: (
        <>
          <Dragger {...props} className="!h-5xl" maxCount={1}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>

            {fileList.length > 0
              ? (
                  <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                  >
                    {uploading ? '上传中' : '开始上传'}
                  </Button>
                )
              : (
                  <p className="ant-upload-text">点击或拖拽文件上传</p>
                )}
            <p />
          </Dragger>
          {/* <Divider /> */}
          <List
            className="pa-5"
            bordered
            dataSource={uploadHints}
            split={false}
            size="large"
            rowKey={item => item}
            renderItem={item => (
              <List.Item className="!pa-0">{item}</List.Item>
            )}
          />
          {/* <div>
            {uploadHints.map((hint, index) => (
              <p key={index} className="ant-upload-hint">{hint}</p>
            ))}
          </div> */}
        </>
      ),
    },
    {
      title: '上传结果',
      content: 'Last-content',
    },
  ]

  const items = steps.map(item => ({ key: item.title, title: item.title }))

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  }
  return (
    <FormContainer title={t('page.paperUpload.title')}>
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {/* {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )} */}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success('Processing complete!')}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            上一步
          </Button>
        )}
      </div>
    </FormContainer>
  )
}
