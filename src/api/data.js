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
export const getCommonData = ({ page, limit, url }) => {
  const data = {
    page,
    limit
  }
  return axios.request({
    url: url,
    // data,
    params: {
      page: data.page,
      limit: data.limit
    },
    method: 'post'
  })
}
// 搜索获取数据
export const getCommonSearchData = ({ page, limit, name, state, url }) => {
  const data = {
    page,
    limit,
    name,
    state
  }
  return axios.request({
    url: url,
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
// 添加 / 编辑数据
export const getCommonisAddData = ({ id, memo, name, imgUrl, state, url }) => {
  const data = {
    id,
    memo,
    name,
    imgUrl,
    state
  }
  return axios.request({
    url: url,
    // data,
    params: {
      id: data.id,
      memo: data.memo,
      name: data.name,
      imgUrl: data.imgUrl,
      state: data.state
    },
    method: 'post'
  })
}
// 删除数据
export const getCommonDelData = ({ id, url }) => {
  const data = {
    id
  }
  return axios.request({
    url: url,
    // data,
    params: {
      id: data.id
    },
    method: 'post'
  })
}
// 产品信息 添加 / 编辑数据
export const getProductisAddData = ({ id, proTypeId, proBrandId, memo, name, imgUrl, state, url }) => {
  const data = {
    id,
    proTypeId,
    proBrandId,
    memo,
    name,
    imgUrl,
    state
  }
  return axios.request({
    url: url,
    // data,
    params: {
      id: data.id,
      proTypeId: data.proTypeId,
      proBrandId: data.proBrandId,
      memo: data.memo,
      name: data.name,
      imgUrl: data.imgUrl,
      state: data.state
    },
    method: 'post'
  })
}
// 获取类别
export const getProductTypeData = () => {
  return axios.request({
    url: '/productType/queryList',
    method: 'get'
  })
}
// 获取品牌
export const getproductBrandData = () => {
  return axios.request({
    url: '/productBrand/queryList',
    method: 'get'
  })
}
