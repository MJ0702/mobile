<template>
  <div>
    <Modal
      v-model='showAddModal'
      :closable='false'
      :title='Title'
      width="680"
      :footer-hide='true'
    >
      <Form ref="formValidateAdd" :model="formValidateAdd" :label-width="40" class="top">
        <Row>
          <Col span="22">
            <FormItem label="名称" prop="name">
              <Input v-model="formValidateAdd.name" placeholder="请输入名称"></Input>
            </FormItem>
          </Col>
          <Col span="22">
            <FormItem label="状态" prop="status">
              <Select v-model="formValidateAdd.status" placeholder="请选择状态">
                <Option v-for="item in selList" :key="item.value" :value="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="22">
            <FormItem label="图片" prop="pic">
              <Input v-model="formValidateAdd.pic" disabled placeholder="请上传图片"></Input>
            </FormItem>
          </Col>
          <Col span="22" class="img-left">
          <Upload action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline" type="primary">上传</Button>
          </Upload>
          </Col>
          <Col span="22" class="top">
            <FormItem label="备注">
              <Input v-model="formValidateAdd.remark" type="textarea" :rows="5" :autosize="{maxRows:5,minRows: 5}" placeholder="请输入备注"></Input>
            </FormItem>
          </Col>
          <Col span="23" class="top">
            <div class="rt">
              <Button type="text" @click="modalCancel">取消</Button>
              <Button type="primary" @click="modalOk">确定</Button>
            </div>
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
      isAdd: '',
      // 表单数据
      formValidateAdd: {
        ID: '',
        name: '',
        pic: '',
        remark: '',
        status: ''
      },
      selList: [
        {
          value: '0',
          label: '启用'
        },
        {
          value: '1',
          label: '禁用'
        }
      ]
    }
  },
  methods: {
    // 确定回调
    modalOk () {
      if (this.formValidateAdd.name === '') {
        this.$Message.error('请输入名称')
      } else if (this.formValidateAdd.status === '') {
        this.$Message.error('请选择状态')
      } else {
        // 判断添加 / 编辑时提交数据给接口(调用父组件添加/编辑方法)
        this.$parent.getisAddData(this.formValidateAdd)
      }
    },
    // 取消回调
    modalCancel () {
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
        this.isAdd = this.content.isEdit
        let edit = this.isAdd
        // 状态
        let statusLabel = this.content.status
        // 判断是否是编辑
        if (edit === 2) {
          this.formValidateAdd.ID = this.content.ID
          this.formValidateAdd.name = this.content.name
          this.formValidateAdd.pic = this.content.pic
          this.formValidateAdd.remark = this.content.remark
          // 需要将status转换为字符串才可以给select赋值成功
          this.formValidateAdd.status = statusLabel.toString()
          this.formValidateAdd.update = this.content.update
        } else {
          this.formValidateAdd.ID = ''
          this.formValidateAdd.name = ''
          this.formValidateAdd.pic = ''
          this.formValidateAdd.remark = ''
          this.formValidateAdd.status = ''
        }
      },
      deep: true
    }
  }
}
</script>

<style lang="less">
.top {
  margin-top:15px;
}
.ivu-form .ivu-form-item-label {
  text-align: left;
}
.col-box-right{
  margin-right: 0px;
}
.col-box-left{
  margin-left: 5px;
}
.img-left{
  margin-left: 40px;
}
.ivu-form-item-required .ivu-form-item-label:before{
  display: none;
}
.rt {
  float: right;
}
</style>
