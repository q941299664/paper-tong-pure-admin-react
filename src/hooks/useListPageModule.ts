import { Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { cloneDeep, difference, intersection, isFunction, union } from 'lodash-es';
import qs from 'qs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { bridgeKey, bridgeSet } from '@/utils/bridge';
import { createHook } from '@/utils/createHook';
import { http as defaultHttp } from '@/utils/http';
import { message } from '@/utils/message';
import { storage } from '@/utils/storage';

interface UseListPageModuleParams<K> {
  http?: any;
  columns?: ColumnsType;
  idKey?: K;
  customLoad?: ((...args: any[]) => Promise<any>) | null;
  getDataListURL?: string;
  getDataListIsPage?: boolean;
  deleteURL?: string;
  deleteIsBatch?: boolean;
  selectable?: boolean;
  selectCrossPage?: boolean;
  customDelete?: ((...args: any[]) => Promise<any>) | null;
  exportURL?: string;
  pageEditPath?: string;
  pageCreatePath?: string;
  pageDetailPath?: string;
}

type LoadingFunction = (...args: any[]) => Promise<any>;

type SelectState = (string | number)[];

export function useListPageModule<T extends Record<K, any>, K extends string = 'id'>({
  http = null, // 特殊情况下，可以传入 http 实例 比如调用另一个系统的接口
  columns = [], // 表格的列配置
  idKey = 'id' as K, // 行数据的唯一值字段
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
  pageDetailPath = './detail/{id}', // 详情页面路径
}: UseListPageModuleParams<K> = {}) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const _http = http || defaultHttp;

  // ---------------------------------------- loading ----------------------------------------
  const [loadingState, setLoadingState] = useState(false);
  function loadingStateSet(value: boolean) {
    setLoadingState(value);
  }

  async function loadingFunctionWrapper(fn: LoadingFunction) {
    loadingStateSet(true);
    try {
      await fn();
    } finally {
      loadingStateSet(false);
    }
  }

  // ---------------------------------------- order ----------------------------------------
  const [orderType, setOrderType] = useState('');
  const [orderField, setOrderField] = useState('');

  // ---------------------------------------- form ----------------------------------------
  const [formState, setFormState] = useState({});

  Form.useWatch((values: any) => {
    setFormState(values);
  });

  function formSubmit() {
    pageReset();
    selectReset({ crossPage: true });
    logicFetch();
  }

  function formReset() {
    form.resetFields();
  }

  // ---------------------------------------- list ----------------------------------------
  const [listData, setListData] = useState<T[]>([]);
  const [listColumns, setListColumns] = useState(columns);
  const { on: convertList, trigger: convertListTrigger } = createHook(e => e);

  async function listSet(data: T[]) {
    setListData(convertListTrigger(data));
    selectRestore();
  }

  function listReset() {
    listSet([]);
  }

  // ---------------------------------------- page ----------------------------------------
  const [pageTotal, setPageTotal] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [pageNo, setPageNo] = useState(1);

  function pageReset() {
    setPageTotal(0);
    setPageSize(10);
    setPageNo(1);
  }

  function pagePrev() {
    setPageNo(prev => Math.max(prev - 1, 1));
  }

  function pageNext() {
    setPageNo(prev => Math.min(prev + 1, Math.ceil(pageTotal / pageSize)));
  }

  function pageRationalize() {
    // 通常用在删除逻辑之后 如果当前页只有一条数据 那么就跳转到上一页
    if (pageNo > 1 && listData.length === 1) {
      pagePrev();
    }
  }

  // ---------------------------------------- select ----------------------------------------
  const [selectStateCurrentPage, setSelectStateCurrentPage] = useState<SelectState>([]);
  const [selectStateOtherPage, setSelectStateOtherPage] = useState<SelectState>([]);
  const selectState = union(selectStateOtherPage, selectStateCurrentPage);
  const selectCount = selectState.length;
  const selectIsEmpty = selectCount === 0;
  const selectTip = selectIsEmpty ? '' : `已经选择 ${selectCount} 项`;
  function selectSet(selectedRowKeys: SelectState) {
    setSelectStateCurrentPage(selectedRowKeys);
  }
  function selectReset({
    crossPage = false, // 清空跨页面的选择状态
  } = {}) {
    if (crossPage) {
      setSelectStateCurrentPage([]);
    } else if (selectCrossPage) {
      setSelectStateOtherPage(union(selectStateOtherPage, selectStateCurrentPage));
    }
    selectSet([]);
  }

  function selectRestore() {
    if (selectCrossPage) {
      const ids = listData.map((e: T) => e[idKey]);
      setSelectStateCurrentPage(intersection(selectStateCurrentPage, ids));
      setSelectStateOtherPage(difference(selectStateOtherPage, selectStateCurrentPage));
    }
  }

  // ---------------------------------------- logic ----------------------------------------
  const { on: convertFetchForm, trigger: convertFetchFormTrigger } = createHook(e => e);

  async function logicFetch() {
    await loadingFunctionWrapper(async () => {
      try {
        const _form = convertFetchFormTrigger(cloneDeep(formState));
        const params = {
          order: orderType,
          orderField: orderField,
          ..._form,
        };
        if (getDataListIsPage) {
          params.pageNo = pageNo;
          params.limit = pageSize;
        }
        let result = [];
        if (customLoad) {
          if (!isFunction(customLoad)) {
            throw new Error('customLoad 必须是一个函数');
          } else {
            result = await customLoad(params);
          }
        } else {
          result = await _http.get(getDataListURL, { params });
        }
        if (getDataListIsPage) {
          listSet(result.list);
          setPageTotal(result.total);
        } else {
          listSet(result);
        }
      } catch (error) {
        console.log(error);
        listReset();
        pageReset();
      }
    });
  }

  async function logicDelete(record: T) {
    await loadingFunctionWrapper(async () => {
      if (customDelete) {
        if (!isFunction(customDelete)) {
          throw new Error('customDelete 必须是一个函数');
        } else {
          await customDelete(record);
        }
      } else {
        const id = record?.[idKey];
        const url = deleteIsBatch ? deleteURL : `${deleteURL}/${id}`;
        await _http.delete(url, {
          ...(deleteIsBatch ? { data: id ? [id] : selectState } : {}),
        });
      }
      message.success('删除成功');
    });
  }

  // ---------------------------------------- action ----------------------------------------
  async function actionFetch() {
    selectReset();
    await logicFetch();
  }
  function actionCreate(bridgeData: string) {
    const query: any = {};
    if (bridgeData) {
      query[bridgeKey] = bridgeSet(bridgeData);
    }
    const queryString = qs.stringify(query);
    navigate(queryString ? `${pageCreatePath}?${queryString}` : pageCreatePath);
  }

  function actionEdit(record: T, bridgeData: string, query: { [key: string]: any } = {}) {
    const id = record?.[idKey];
    const path = pageEditPath.replace(/{id}/g, id);
    const _query = { ...query };
    if (bridgeData) {
      _query[bridgeKey] = bridgeSet(bridgeData);
    }
    const queryString = qs.stringify(_query);
    navigate(queryString ? `${path}?${queryString}` : pageCreatePath);
  }

  function actionDetail(record: T, bridgeData: string, query: { [key: string]: any } = {}) {
    const id = record?.[idKey];
    const path = pageDetailPath.replace(/{id}/g, id);
    const _query = { ...query };
    if (bridgeData) {
      _query[bridgeKey] = bridgeSet(bridgeData);
    }
    const queryString = qs.stringify(_query);
    navigate(queryString ? `${path}?${queryString}` : pageCreatePath);
  }

  async function actionDelete(record: T) {
    await logicDelete(record);
    selectReset({ crossPage: true });
    pageRationalize();
    await logicFetch();
  }

  function actionExport() {
    const params = { token: storage.get('token'), ...formState };
    window.location.href = `${exportURL}?${qs.stringify(params)}`;
  }

  // ---------------------------------------- props ----------------------------------------
  const propsForTable = {
    columns: listColumns,
    dataSource: listData,
    pagination: false,
    loading: loadingState,
    scroll: { x: '100%' },
    rowKey: idKey,
    ...(selectable
      ? {
          rowSelection: {
            selectedRowKeys: selectStateCurrentPage,
            onChange: (keys: SelectState) => selectSet(keys),
          },
        }
      : {}),
  };

  const propsForPagination = {
    current: pageNo,
    pageSize: pageSize,
    total: pageTotal,
    disabled: loadingState,
    showLessItems: true,
    showTotal: (total: number) => `共 ${total} 条记录`,
    onChange: handlePaginationChange,
    onShowSizeChange: handlePaginationSizeChange,
  };

  function handlePaginationChange(page: number) {
    setPageNo(page);
    actionFetch();
  }

  function handlePaginationSizeChange(_current: number, size: number) {
    setPageSize(size);
    actionFetch();
  }

  // ---------------------------------------- others ----------------------------------------
  function initialize() {
    formReset();
    listReset();
    pageReset();
    selectReset({ crossPage: true });
    logicFetch();
  }

  return {
    // loading
    loadingState,
    loadingStateSet,
    loadingFunctionWrapper,
    // order
    orderType,
    setOrderType,
    orderField,
    setOrderField,
    // form
    formState,
    formSubmit,
    formReset,
    // page
    pageTotal,
    pageSize,
    pageNo,
    pageReset,
    pagePrev,
    pageNext,
    pageRationalize,
    // list
    listData,
    listColumns,
    setListColumns,
    convertList,
    listSet,
    listReset,
    // select
    selectState,
    selectStateCurrentPage,
    selectStateOtherPage,
    selectCount,
    selectIsEmpty,
    selectTip,
    selectSet,
    selectReset,
    // logic
    convertFetchForm,
    logicFetch,
    logicDelete,
    // action
    actionFetch,
    actionCreate,
    actionEdit,
    actionDetail,
    actionDelete,
    actionExport,
    // props
    propsForTable,
    propsForPagination,
    // others
    initialize,
  };
}
