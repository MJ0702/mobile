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
//  --------------------搜索类方法-----------------------------------
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
// 订单信息 搜索获取数据
export const getOrdSearchData = ({ page, limit, logType, state, url }) => {
  const data = {
    page,
    limit,
    logType,
    state
  }
  return axios.request({
    url: url,
    // data,
    params: {
      page: data.page,
      limit: data.limit,
      logType: data.logType,
      state: data.state
    },
    method: 'post'
  })
}
// 物流信息 搜索获取数据
export const getLogSearchData = ({ page, limit, logType, logNo, url }) => {
  const data = {
    page,
    limit,
    logType,
    logNo
  }
  return axios.request({
    url: url,
    // data,
    params: {
      page: data.page,
      limit: data.limit,
      logType: data.logType,
      logNo: data.logNo
    },
    method: 'post'
  })
}
// 用户信息 搜索获取数据
export const getUserSearchData = ({ page, limit, mobile, state, url }) => {
  const data = {
    page,
    limit,
    mobile,
    state
  }
  return axios.request({
    url: url,
    // data,
    params: {
      page: data.page,
      limit: data.limit,
      mobile: data.mobile,
      state: data.state
    },
    method: 'post'
  })
}
// 公司地址信息 搜索获取数据
export const getCompanyAddrSearchData = ({ page, limit, addr, isType, url }) => {
  const data = {
    page,
    limit,
    addr,
    isType
  }
  return axios.request({
    url: url,
    // data,
    params: {
      page: data.page,
      limit: data.limit,
      addr: data.addr,
      isType: data.isType
    },
    method: 'post'
  })
}
// ---------------------添加 / 编辑类方法---------------------------------
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
// 公司信息 添加 / 编辑数据
export const getCompanyisAddData = ({ id, leader, mobile, addr, memo, name, imgUrl, state, url }) => {
  const data = {
    id,
    leader,
    mobile,
    addr,
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
      leader: data.leader,
      mobile: data.mobile,
      addr: data.addr,
      memo: data.memo,
      name: data.name,
      imgUrl: data.imgUrl,
      state: data.state
    },
    method: 'post'
  })
}
// 公司信息 添加 / 编辑数据
export const getCompanyAddrisAddData = ({ id, ucId, province, city, addr, memo, isDefault, idType, url }) => {
  const data = {
    id,
    ucId,
    province,
    city,
    addr,
    memo,
    isDefault,
    idType
  }
  return axios.request({
    url: url,
    // data,
    params: {
      id: data.id,
      ucId: data.ucId,
      province: data.province,
      city: data.city,
      addr: data.addr,
      memo: data.memo,
      isDefault: data.isDefault,
      idType: data.idType
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
// 获取公司
export const getCompanyInfoData = () => {
  return axios.request({
    url: '/company/queryList',
    method: 'get'
  })
}
