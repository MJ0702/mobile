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
import { getCommonData, getOrdSearchData } from '@/api/data'
export default {
  data () {
    return {
      isShow: 'block',
      // 分页
      pageSize: 10, // 每页显示多少条
      dataCount: 0, // 总条数
      pageCurrent: 1, // 当前页
      url: '/order/queryList',
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
            const text = row.logType === '1' ? '邮寄处理' : '上门回收'
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
            const text = row.status === '1' ? '处理中' : '处理成功'
            return h('div', {}, text)
          }
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
    // 请求接口返回搜索的表格数据
    getSearchData () {
      getOrdSearchData({ page: 1, limit: this.pageSize, logType: this.formValidate.logType, state: this.formValidate.status, url: this.url }).then(this.getInfoSucc)
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
          userId: tbData[i].userId,
          companyId: tbData[i].companyId,
          addrId: tbData[i].addrId,
          amout: tbData[i].amout,
          price: tbData[i].price,
          addr: tbData[i].addr,
          logType: tbData[i].logType,
          memo: tbData[i].memo,
          status: tbData[i].status,
          addTime: tbData[i].addTime
        })
      }
      _this.tableData1 = dataArr
      this.$Spin.hide()
    },
    // 搜索
    handleSubmit () {
      if (this.formValidate.status === '' && this.formValidate.logType === '') {
        this.$Message.error('请选择订单状态或请选择物流类型')
      } else {
        this.getSearchData()
      }
    },
    // 重置搜索
    handleReset () {
      if (this.formValidate.status !== '' || this.formValidate.logType !== '') {
        this.formValidate.logType = ''
        this.formValidate.status = ''
        this.getSearchData()
      }
    },
    changePage (index) { // 分页
      this.pageCurrent = index
      // 判断如果是在搜索条件下还是无搜索条件下切换页码
      if (this.formValidate.name !== '' || this.formValidate.status !== '') {
        this.getSearchData()
      } else {
        this.getTableData()
      }
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
