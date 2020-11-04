<template>
  <div>
    <Table :data="tableData1" :columns="tableColumns1" stripe></Table>
    <div :style="{ margin: '10px', overflow: 'hidden', display: isShow }">
      <div style="float: right">
        <Page :total="dataCount" :page-size='pageSize' :current="pageCurrent" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
import { getCommonData } from '@/api/data'
export default {
  data () {
    return {
      isShow: 'block',
      // 分页
      pageSize: 10, // 每页显示多少条
      dataCount: 0, // 总条数
      pageCurrent: 1, // 当前页
      url: '/address/queryList',
      // 搜索物流类型栏下拉数据
      tableData1: [],
      // 表格数据列
      tableColumns1: [
        {
          title: 'ID',
          key: 'id'
        },
        {
          title: 'ucId',
          key: 'ucId'
        },
        {
          title: '类型',
          key: 'idType',
          render: (h, params) => {
            const row = params.row
            const text = row.idType === 1 ? '用户' : '老板'
            return h('div', {}, text)
          }
        },
        {
          title: '是否默认',
          key: 'isDefault',
          render: (h, params) => {
            const row = params.row
            const text = row.idType === 1 ? '已知' : '未知'
            return h('div', {}, text)
          }
        },
        {
          title: '省份',
          key: 'province'
        },
        {
          title: '城市',
          key: 'city'
        },
        {
          title: '地址信息',
          key: 'addr'
        },
        {
          title: '备注',
          key: 'memo'
        },
        {
          title: '日期',
          key: 'addTime',
          render: (h, params) => {
            return h(
              'div',
              this.tableData1[params.index].addTime
            )
          }
        }
      ]
    }
  },
  methods: {
    getTableData () {
    // 请求接口返回表格数据
      getCommonData({ page: this.pageCurrent, limit: this.pageSize, url: this.url }).then(this.getInfoSucc)
    },
    // 封装回调
    getInfoSucc (res) {
      // 加载中
      this.$Spin.show()
      let dataArr = []
      let _this = this
      let tbData = res.data.data
      _this.dataCount = res.data.count
      // console.log(res.data.data)
      for (let i = 0; i < tbData.length; i++) {
        dataArr.push({
          id: tbData[i].id,
          ucId: tbData[i].ucId,
          idType: tbData[i].idType,
          isDefault: tbData[i].isDefault,
          province: tbData[i].province,
          city: tbData[i].city,
          addr: tbData[i].addr,
          memo: tbData[i].memo,
          addTime: tbData[i].addTime
        })
      }
      _this.tableData1 = dataArr
      this.$Spin.hide()
    },
    changePage (index) { // 分页
      this.pageCurrent = index
      // 判断如果是在搜索条件下还是无搜索条件下切换页码
      this.getTableData()
    }
  },
  // 生命周期函数，当创建完后判断是否有数据，无数据隐藏分页
  mounted () {
    this.changePage(this.pageCurrent)
  }
}
</script>

<style lang="less">
.edit_pic {
  width: 40px;
  height: 40px;
}
.ivu-form .ivu-form-item-label {
  text-align: left;
}
.col_box_right{
  margin-right: 10px;
}
.ivu-form-item-required .ivu-form-item-label:before{
  display: none;
}
</style>
