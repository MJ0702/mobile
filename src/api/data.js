import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}

// 获取表格数据
export const getTableColumnData = ({ page, limit }) => {
  const data = {
    page,
    limit
  }
  return axios.request({
    url: '/productType/queryList',
    // data,
    params: {
      page: data.page,
      limit: data.limit
    },
    method: 'post'
  })
}
// 搜索获取数据
export const getTableSearchData = ({ page, limit, name, state }) => {
  const data = {
    page,
    limit,
    name,
    state
  }
  return axios.request({
    url: '/productType/queryList',
    // data,
    params: {
      page: data.page,
      limit: data.limit,
      name: data.name,
      state: data.state
    },
    method: 'post'
  })
}
// 删除数据
export const getTableDelData = ({ id }) => {
  const data = {
    id
  }
  return axios.request({
    url: '/productType/delete',
    // data,
    params: {
      id: data.id
    },
    method: 'post'
  })
}
