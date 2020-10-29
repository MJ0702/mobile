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
export default {
  data () {
    return {
      isShow: 'block',
      // 分页
      pageSize: 10, // 每页显示多少条
      dataCount: 0, // 总条数
      pageCurrent: 1, // 当前页
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
              this.formatDate(this.tableData1[params.index].addTime)
            )
          }
        }
      ]
    }
  },
  // 生命周期函数，当创建完后判断是否有数据，无数据隐藏分页
  created: function () {
    // 获取分页首页的数据
    this.changePage(this.pageCurrent)
    if (this.tableData1.length === 0) {
      this.isShow = 'none'
    }
  },
  methods: {
    mockTableData1 () {
      // 随机产生每页数据
      let dataArr = []
      for (let i = 0; i < 10; i++) {
        dataArr.push({
          id: Math.floor(Math.random() * 100000 + 1),
          ucId: Math.floor(Math.random() * 100000 + 1),
          idType: Math.floor(Math.random() * 2),
          isDefault: Math.floor(Math.random() * 2 + 1),
          province: Math.floor(Math.random() * 1000000000 + 1),
          city: Math.floor(Math.random() * 100000 + 1),
          addr: Math.floor(Math.random() * 100000 + 1),
          memo: Math.floor(Math.random() * 1000 + 1),
          addTime: new Date()
        })
      }
      // console.log(this.dataCount)
      return dataArr
    },
    formatDate (date) {
      // 格式化时间
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      return y + '-' + m + '-' + d
    },
    changePage (index) { // 分页
      // 需要显示开始数据的index,(因为数据是从0开始的，页码是从1开始的，需要-1)
      let _start = (index - 1) * this.pageSize
      // 需要显示结束数据的index
      let _end = index * this.pageSize
      let tableArr = this.mockTableData1()
      // 截取需要显示的数据
      this.dataCount = tableArr.length
      this.tableData1 = tableArr.slice(_start, _end)
      // 储存当前页
      this.pageCurrent = index
    }
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
