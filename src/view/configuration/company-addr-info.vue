<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :label-width="40">
      <Row>
        <Col span="6" class="col_box_right">
          <FormItem label="名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
          </FormItem>
        </Col>
        <Col span="6" class="col_box_right">
          <FormItem label="状态" prop="status">
            <Select v-model="formValidate.status" placeholder="请选择状态">
              <Option v-for="item in selList" :key="item.value" :value="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <Button class="col_box_right" type="primary" shape="circle" icon="ios-search" @click="handleSubmit()">搜索</Button>
          <Button type="warning" shape="circle" icon="md-refresh" @click="handleReset">重置</Button>
        </Col>
      </Row>
    </Form>
    <Button type="primary" style="margin-bottom: 5px;" @click="showModel(1)">添加</Button>
    <addProductModel :content='content' :tableData1='tableData1' @updateModelStatus='updateModelStatus'></addProductModel>
    <Table :data="tableData1" :columns="tableColumns1" stripe></Table>
    <div :style="{ margin: '10px', overflow: 'hidden', display: isShow }">
      <div style="float: right">
        <Page :total="dataCount" :page-size='pageSize' :current="pageCurrent" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
import addProductModel from '../modal/companyAddrInfo-modal.vue'
export default {
  components: {
    addProductModel
  },
  data () {
    return {
      isShow: 'block',
      // 分页
      pageSize: 10, // 每页显示多少条
      dataCount: 0, // 总条数
      pageCurrent: 1, // 当前页
      // 父组件传值给子组件的对象
      content: {
        addProductModal: false, // 是否显示modal框
        addTitle: '', // modal框标题
        isEdit: 1,
        // 编辑时modal框中要赋值的当前选中列的值
        ID: '',
        name: '',
        pic: '',
        remark: '',
        status: '',
        update: new Date()
      },
      // 搜索状态栏下拉数据
      selList: [
        {
          value: '0',
          label: '禁用'
        },
        {
          value: '1',
          label: '启用'
        }
      ],
      // 搜索表单数据
      formValidate: {
        name: '',
        status: ''
      },
      tableData1: [],
      // 表格数据列
      tableColumns1: [
        {
          title: 'ID',
          key: 'ID'
        },
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '图片',
          key: 'pic',
          render: (h, params) => {
            return h('div', [
              h(
                'img',
                {
                  attrs: {
                    src: params.row.pic
                  },
                  style: {
                    width: '40px',
                    height: '40px',
                    'vertical-align': 'middle'
                  }
                }
              )
            ])
          }
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '状态',
          key: 'status',
          render: (h, params) => {
            const row = params.row
            const text = row.status === 1 ? '启用' : '禁用'
            return h('Tag', {}, text)
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.showModel(2, params.index)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        },
        {
          title: '日期',
          key: 'update',
          render: (h, params) => {
            return h(
              'div',
              this.formatDate(this.tableData1[params.index].update)
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
      for (let i = 0; i < 32; i++) {
        dataArr.push({
          ID: Math.floor(Math.random() * 100000 + 1),
          name: Math.floor(Math.random() * 100000 + 1),
          pic: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2488980962,457564801&fm=26&gp=0.jpg',
          remark: Math.floor(Math.random() * 1000 + 1),
          status: Math.floor(Math.random() * 2),
          update: new Date()
        })
      }
      // console.log(this.dataCount)
      return dataArr
    },
    // 搜索返回结果
    searchTableData () {
      let searchArr = []
      searchArr.push({
        ID: Math.floor(Math.random() * 100000 + 1),
        name: 666666,
        pic: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2488980962,457564801&fm=26&gp=0.jpg',
        remark: 777777,
        status: Math.floor(Math.random() * 2 + 1),
        update: new Date()
      })
      return searchArr
    },
    // 搜索
    handleSubmit () {
      if (this.formValidate.name === '' && this.formValidate.status === '') {
        this.$Message.error('请输入名称或请选择状态')
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
      if (this.formValidate.name !== '' || this.formValidate.status !== '') {
        this.formValidate.name = ''
        this.formValidate.status = ''
        this.changePage(1)
      }
    },
    // 添加 / 编辑
    showModel (isEdit, index) {
      this.content.addProductModal = true
      // console.log(this.addProductModal)
      // 判断为新增还是编辑
      if (isEdit === 1) {
        this.content.addTitle = '新增产品类型'
        this.content.isEdit = isEdit
        // console.log(this.isEdit)
      } else {
        this.content.addTitle = '编辑产品类型'
        this.content.isEdit = isEdit
        this.content.ID = this.tableData1[index].ID
        this.content.name = this.tableData1[index].name
        this.content.pic = this.tableData1[index].pic
        this.content.remark = this.tableData1[index].remark
        this.content.status = this.tableData1[index].status
        this.content.update = this.tableData1[index].update
      }
    },
    // 添加modal给父组件传值false,关闭modal
    updateModelStatus (newVal) {
      this.content.addProductModal = newVal
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
    },
    remove (index) { // 删除
      this.$Modal.confirm({
        title: '删除提示',
        content: '确定要删除吗?',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.tableData1.splice(index, 1)
          this.$Message.success('删除成功!')
        }
      })
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
