<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :label-width="70">
      <Row>
        <Col span="6" class="col_box_right">
          <FormItem label="订单状态" prop="status">
            <Select v-model="formValidate.status" placeholder="请选择订单状态">
              <Option v-for="item in ordTypeList" :key="item.value" :value="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6" class="col_box_right">
          <FormItem label="物流类型" prop="logType">
            <Select v-model="formValidate.logType" placeholder="请选择物流类型">
              <Option v-for="item in logTypeList" :key="item.value" :value="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <Button class="col_box_right" type="primary" shape="circle" icon="ios-search" @click="handleSubmit()">搜索</Button>
          <Button type="warning" shape="circle" icon="md-refresh" @click="handleReset">重置</Button>
        </Col>
      </Row>
    </Form>
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
      formValidate: {
        logType: '',
        status: ''
      },
      // 搜索订单状态栏下拉数据
      ordTypeList: [
        {
          value: '0',
          label: '待处理'
        },
        {
          value: '1',
          label: '处理中'
        },
        {
          value: '2',
          label: '处理成功'
        },
        {
          value: '3',
          label: '处理失败'
        }
      ],
      // 搜索物流类型栏下拉数据
      logTypeList: [
        {
          value: '0',
          label: '上门回收'
        },
        {
          value: '1',
          label: '邮寄处理'
        }
      ],
      tableData1: [],
      // 表格数据列
      tableColumns1: [
        {
          title: 'ID',
          key: 'id'
        },
        {
          title: '用户ID',
          key: 'userId'
        },
        {
          title: '公司ID',
          key: 'companyId'
        },
        {
          title: '地址ID',
          key: 'addrId'
        },
        {
          title: '数量',
          key: 'amout'
        },
        {
          title: '价格',
          key: 'price'
        },
        {
          title: '地址信息',
          key: 'addr'
        },
        {
          title: '物流类型',
          key: 'logType',
          render: (h, params) => {
            const row = params.row
            const text = row.logType === 1 ? '上门回收' : '邮寄处理'
            return h('div', {}, text)
          }
        },
        {
          title: '备注',
          key: 'memo'
        },
        {
          title: '订单状态',
          key: 'state',
          render: (h, params) => {
            const row = params.row
            const text = row.status === 1 ? '处理中' : '未处理'
            return h('div', {}, text)
          }
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
          userId: Math.floor(Math.random() * 100000 + 1),
          companyId: Math.floor(Math.random() * 100000 + 1),
          addrId: Math.floor(Math.random() * 100000 + 1),
          amout: Math.floor(Math.random() * 2 + 1),
          price: Math.floor(Math.random() * 100 + 1),
          addr: Math.floor(Math.random() * 1000 + 1),
          logType: Math.floor(Math.random() * 2),
          memo: Math.floor(Math.random() * 100000 + 1),
          status: Math.floor(Math.random() * 2 + 1),
          addTime: new Date()
        })
      }
      return dataArr
    },
    // 搜索返回结果
    searchTableData () {
      let searchArr = []
      searchArr.push({
        id: Math.floor(Math.random() * 100000 + 1),
        userId: Math.floor(Math.random() * 100000 + 1),
        companyId: Math.floor(Math.random() * 100000 + 1),
        addrId: Math.floor(Math.random() * 100000 + 1),
        amout: Math.floor(Math.random() * 2 + 1),
        price: Math.floor(Math.random() * 100 + 1),
        addr: Math.floor(Math.random() * 1000 + 1),
        logType: Math.floor(Math.random() * 2),
        memo: Math.floor(Math.random() * 100000 + 1),
        status: Math.floor(Math.random() * 2 + 1),
        addTime: new Date()
      })
      return searchArr
    },
    // 搜索
    handleSubmit () {
      if (this.formValidate.logType === '' && this.formValidate.status === '') {
        this.$Message.error('请选择订单状态或请选择物流类型')
      } else {
        this.$Spin.show()
        setTimeout(() => {
          this.$Spin.hide()
        }, 1000)
        this.tableData1 = this.searchTableData()
      }
    },
    // 重置搜索
    handleReset () {
      if (this.formValidate.logType !== '' || this.formValidate.status !== '') {
        this.formValidate.logType = ''
        this.formValidate.status = ''
        this.changePage(1)
      }
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
