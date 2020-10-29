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
          <FormItem label="状态" prop="state">
            <Select v-model="formValidate.state" placeholder="请选择物流类型">
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
export default {
  data () {
    return {
      isShow: 'block',
      // 分页
      pageSize: 10, // 每页显示多少条
      dataCount: 0, // 总条数
      pageCurrent: 1, // 当前页
      formValidate: {
        mobile: '',
        state: ''
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
          key: 'id'
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
            const text = row.state === 1 ? '停用' : '启用'
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
          vxName: Math.floor(Math.random() * 100000 + 1),
          state: Math.floor(Math.random() * 2),
          name: Math.floor(Math.random() * 1000000 + 1),
          mobile: Math.floor(Math.random() * 1000000000 + 1),
          cardId: Math.floor(Math.random() * 100000 + 1),
          cardType: Math.floor(Math.random() * 2),
          acctNo: Math.floor(Math.random() * 1000 + 1),
          memo: Math.floor(Math.random() * 1000 + 1),
          addTime: new Date()
        })
      }
      // console.log(this.dataCount)
      return dataArr
    },
    // 搜索返回结果
    searchTableData () {
      let searchArr = []
      searchArr.push({
        id: Math.floor(Math.random() * 100000 + 1),
        vxName: Math.floor(Math.random() * 100000 + 1),
        state: Math.floor(Math.random() * 2),
        name: Math.floor(Math.random() * 1000000 + 1),
        mobile: Math.floor(Math.random() * 1000000000 + 1),
        cardId: Math.floor(Math.random() * 100000 + 1),
        cardType: Math.floor(Math.random() * 2),
        acctNo: Math.floor(Math.random() * 1000 + 1),
        memo: Math.floor(Math.random() * 1000 + 1),
        addTime: new Date()
      })
      return searchArr
    },
    // 搜索
    handleSubmit () {
      if (this.formValidate.mobile === '' && this.formValidate.state === '') {
        this.$Message.error('请输入手机号或请选择状态')
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
      if (this.formValidate.mobile !== '' || this.formValidate.state !== '') {
        this.formValidate.mobile = ''
        this.formValidate.state = ''
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
