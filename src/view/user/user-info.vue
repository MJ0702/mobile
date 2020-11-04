<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :label-width="70">
      <Row>
        <Col span="6" class="col_box_right">
          <FormItem label="手机号" prop="mobile">
            <Input v-model="formValidate.mobile" placeholder="请输入手机号"></Input>
          </FormItem>
        </Col>
        <Col span="6" class="col_box_right">
          <FormItem label="状态" prop="status">
            <Select v-model="formValidate.status" placeholder="请选择状态">
              <Option v-for="item in stateList" :key="item.value" :value="item.value">{{ item.label }}</Option>
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
import { getCommonData, getUserSearchData } from '@/api/data'
export default {
  data () {
    return {
      isShow: 'block',
      // 分页
      pageSize: 10, // 每页显示多少条
      dataCount: 0, // 总条数
      pageCurrent: 1, // 当前页
      url: '/user/queryList',
      formValidate: {
        mobile: '',
        status: ''
      },
      // 搜索物流类型栏下拉数据
      stateList: [
        {
          value: '0',
          label: '启用'
        },
        {
          value: '1',
          label: '停用'
        }
      ],
      tableData1: [],
      // 表格数据列
      tableColumns1: [
        {
          title: 'ID',
          key: 'id',
          render: (h, params) => {
            return h(
              'div',
              {
                style: {
                  'min-width': '160px'
                }
              },
              this.tableData1[params.index].id
            )
          }
        },
        {
          title: '微信昵称',
          key: 'vxName'
        },
        {
          title: '状态',
          key: 'state',
          render: (h, params) => {
            const row = params.row
            const text = row.state === '0' ? '启用' : '停用'
            return h('div', {}, text)
          }
        },
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '手机号',
          key: 'mobile'
        },
        {
          title: '银行卡号',
          key: 'cardId'
        },
        {
          title: '身份类型',
          key: 'cardType',
          render: (h, params) => {
            const row = params.row
            const text = row.cardType === 1 ? '已知' : '未知'
            return h('div', {}, text)
          }
        },
        {
          title: '身份编码',
          key: 'acctNo'
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
    // 请求接口返回搜索的表格数据
    getSearchData () {
      getUserSearchData({ page: 1, limit: this.pageSize, mobile: this.formValidate.mobile, state: this.formValidate.status, url: this.url }).then(this.getInfoSucc)
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
          vxName: tbData[i].vxName,
          state: tbData[i].state,
          name: tbData[i].name,
          mobile: tbData[i].mobile,
          cardId: tbData[i].cardId,
          cardType: tbData[i].cardType,
          acctNo: tbData[i].acctNo,
          memo: tbData[i].memo,
          addTime: tbData[i].addTime
        })
      }
      _this.tableData1 = dataArr
      this.$Spin.hide()
    },
    // 搜索
    handleSubmit () {
      if (this.formValidate.mobile === '' && this.formValidate.status === '') {
        this.$Message.error('请选择订单状态或请选择物流类型')
      } else {
        this.getSearchData()
      }
    },
    // 重置搜索
    handleReset () {
      if (this.formValidate.mobile !== '' || this.formValidate.status !== '') {
        this.formValidate.mobile = ''
        this.formValidate.status = ''
        this.getSearchData()
      }
    },
    changePage (index) { // 分页
      this.pageCurrent = index
      // 判断如果是在搜索条件下还是无搜索条件下切换页码
      if (this.formValidate.mobile !== '' || this.formValidate.status !== '') {
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
