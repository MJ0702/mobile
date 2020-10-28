<template>
  <div>
    <Modal
      v-model='showAddModal'
      :title='Title'
      width="680"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <Form ref="formValidateAdd" :model="formValidateAdd" :label-width="40" class="form">
        <Row>
          <Col span="11" class="col_box_right">
            <FormItem label="名称" prop="name">
              <Input v-model="formValidateAdd.name" placeholder="请输入名称"></Input>
            </FormItem>
          </Col>
          <Col span="11">
            <FormItem label="状态" prop="status">
              <Select :label="select_label" v-model="formValidateAdd.status" placeholder="请选择状态">
                <Option value="0">禁用</Option>
                <Option value="1">启用</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="19" class="col_box_right">
            <FormItem label="图片" prop="pic">
              <Input v-model="formValidateAdd.pic" disabled placeholder="请上传图片"></Input>
            </FormItem>
          </Col>
          <Col span="2" class="col_box_left">
            <Button type="primary" shape="circle" icon="ios-search">上传</Button>
          </Col>
          <Col span="22">
            <FormItem label="备注">
              <Input v-model="formValidateAdd.remarks" type="textarea" :rows="5" :autosize="{maxRows:5,minRows: 5}" placeholder="请输入备注"></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'add-product-modal',
  // props: ['showModal', 'addTitle'],
  props: {
    content: Object
  },
  data () {
    return {
      showAddModal: this.content.addProductModal,
      Title: this.content.addTitle,
      // 下拉框初始值
      select_label: '',
      // 表单数据
      formValidateAdd: {
        ID: '',
        name: '',
        pic: '',
        remark: '',
        status: '',
        update: new Date()
      }
    }
  },
  methods: {
    // 确定回调
    ok () {
      this.$emit('updateModelStatus', false)
    },
    // 取消回调
    cancel () {
      this.$emit('updateModelStatus', false)
    }
  },
  watch: {
    // 监听父组件传来的对象变换，用handler深监听
    content: {
      handler: function (newval, oldVal) {
        this.showAddModal = this.content.addProductModal
        this.Title = this.content.addTitle
        // 是否编辑
        let edit = this.content.isEdit
        // 状态
        let statusLabel = this.content.status
        // 判断是否是编辑
        if (edit === 2) {
          this.formValidateAdd.ID = this.content.ID
          this.formValidateAdd.name = this.content.name
          this.formValidateAdd.pic = this.content.pic
          this.formValidateAdd.remark = this.content.remark
          this.formValidateAdd.status = statusLabel
          // console.log(statusLabel)
          if (statusLabel === 1) {
            this.select_label = '禁用'
          } else {
            this.select_label = '启用'
          }
          console.log(this.select_label)
          this.formValidateAdd.update = this.content.update
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="less">
.form {
  margin-top:15px;
}
.ivu-form .ivu-form-item-label {
  text-align: left;
}
.col_box_right{
  margin-right: 0px;
}
.col_box_left{
  margin-left: 5px;
}
.ivu-form-item-required .ivu-form-item-label:before{
  display: none;
}
</style>
