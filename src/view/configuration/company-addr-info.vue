<template>
  <div>
    <Form ref="formValidate" :model="formValidate" :label-width="40">
      <Row>
        <Col span="6" class="col_box_right">
          <FormItem label="名称" prop="addr">
            <Input v-model="formValidate.addr" placeholder="请输入名称"></Input>
          </FormItem>
        </Col>
        <!-- <Col span="6" class="col_box_right">
          <FormItem label="状态" prop="status">
            <Select v-model="formValidate.status" placeholder="请选择状态">
              <Option v-for="item in selList" :key="item.value" :value="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col> -->
        <Col span="6">
          <Button class="col_box_right" type="primary" shape="circle" icon="ios-search" @click="handleSubmit()">搜索</Button>
          <Button type="warning" shape="circle" icon="md-refresh" @click="handleReset">重置</Button>
        </Col>
      </Row>
    </Form>
    <Button type="primary" style="margin-bottom: 5px;" @click="showModel(1)">添加</Button>
    <addProductModel :content='content' :tableData1='tableData1' @updateModelStatus='updateModelStatus'></addProductModel>
    <Table highlight-row ref="currentRowTable" :data="tableData1" :columns="tableColumns1" @on-current-change="handleRowChange" stripe></Table>
    <div :style="{ margin: '10px', overflow: 'hidden', display: isShow }">
      <div style="float: right">
        <Page :total="dataCount" :page-size='pageSize' :current="pageCurrent" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
import addProductModel from '../modal/companyAddrInfo-modal.vue'
import { getCommonData, getCompanyAddrSearchData, getCompanyAddrisAddData, getCommonDelData } from '@/api/data'
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
      url: '/address/queryList',
      delurl: '/address/delete',
      isAdd: '',
      // 删除所用ID
      delId: '',
      // 父组件传值给子组件的对象
      content: {
        addProductModal: false, // 是否显示modal框
        addTitle: '', // modal框标题
        isEdit: 1,
        // 编辑时modal框中要赋值的当前选中列的值
        ID: '',
        ucId: '',
        province: '',
        city: '',
        addr: '',
        idType: '',
        isDefault: '',
        memo: ''
      },
      // 搜索状态栏下拉数据
      selList: [
        {
          value: '0',
          label: '启用'
        },
        {
          value: '1',
          label: '禁用'
        }
      ],
      // 搜索表单数据
      formValidate: {
        addr: ''
      },
      tableData1: [],
      // 表格数据列
      tableColumns1: [
        {
          title: 'ID',
          key: 'ID'
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
            const text = row.idType === '1' ? '公司' : '散客'
            return h('Tag', {}, text)
          }
        },
        {
          title: '是否默认',
          key: 'isDefault',
          render: (h, params) => {
            const row = params.row
            const text = row.isDefault === '0' ? '默认' : '不默认'
            return h('Tag', {}, text)
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
      getCompanyAddrSearchData({ page: 1, limit: this.pageSize, addr: this.formValidate.addr, isType: '1', url: this.url }).then(this.getInfoSucc)
    },
    // 添加 / 编辑 并返回表格数据
    getisAddData (data) {
      getCompanyAddrisAddData({ id: data.id, ucId: data.ucId, province: data.province, city: data.city, addr: data.addr, memo: data.memo, isDefault: data.isDefault, idType: data.idType, url: data.url }).then(res => {
        if (res.status === 200) {
          this.content.addProductModal = false
          if (this.isAdd === 1) {
            this.$Message.success('添加成功!')
          } else {
            this.$Message.success('编辑成功!')
          }
          this.changePage(1)
        } else {
          if (this.isAdd === 1) {
            this.$Message.error('添加失败!')
          } else {
            this.$Message.error('编辑失败!')
          }
        }
      })
    },
    // 删除并返回表格数据
    getDelData (data) {
      getCommonDelData({ id: data, url: this.delurl }).then(res => {
        if (res.status === 200) {
          this.$Message.success('删除成功!')
          this.changePage(1)
        } else {
          this.$Message.error('删除失败!')
        }
      })
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
          ID: tbData[i].id,
          ucId: tbData[i].ucId,
          province: tbData[i].province,
          city: tbData[i].city,
          addr: tbData[i].addr,
          idType: tbData[i].idType,
          memo: tbData[i].memo,
          isDefault: tbData[i].isDefault,
          addTime: tbData[i].addTime
        })
      }
      _this.tableData1 = dataArr
      this.$Spin.hide()
    },
    // 搜索
    handleSubmit () {
      if (this.formValidate.addr === '') {
        this.$Message.error('请输入地址信息')
      } else {
        this.getSearchData()
      }
    },
    // 重置搜索
    handleReset () {
      if (this.formValidate.addr !== '') {
        this.formValidate.addr = ''
        this.getSearchData()
      }
    },
    // 添加 / 编辑
    showModel (isEdit, index) {
      this.content.addProductModal = true
      // 判断为新增还是编辑
      this.isAdd = isEdit
      if (isEdit === 1) {
        this.content.addTitle = '新增产品类型'
        this.content.isEdit = isEdit
        // console.log(this.isEdit)
      } else {
        this.content.addTitle = '编辑产品类型'
        this.content.isEdit = isEdit
        this.content.ID = this.tableData1[index].ID
        this.content.ucId = this.tableData1[index].ucId
        this.content.province = this.tableData1[index].province
        this.content.city = this.tableData1[index].city
        this.content.addr = this.tableData1[index].addr
        this.content.idType = this.tableData1[index].idType
        this.content.isDefault = this.tableData1[index].isDefault
        this.content.memo = this.tableData1[index].memo
      }
    },
    // 删除
    remove (index) {
      this.$Modal.confirm({
        title: '提示',
        content: '确定要删除吗?',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          this.getDelData(this.delId)
        }
      })
    },
    // 添加modal给父组件传值false,关闭modal
    updateModelStatus (newVal) {
      this.content.addProductModal = newVal
    },
    // 点击切换不同行获取当前行
    handleRowChange (currentRow, oldCurrentRow) {
      // console.log(currentRow.ID)
      this.delId = currentRow.ID
    },
    changePage (index) { // 分页
      this.pageCurrent = index
      // 判断如果是在搜索条件下还是无搜索条件下切换页码
      if (this.formValidate.addr !== '') {
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
