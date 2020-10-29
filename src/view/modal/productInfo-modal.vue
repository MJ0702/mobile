<template>
  <div>
    <Modal
      v-model='showAddModal'
      :title='Title'
      width="680"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <Form ref="formValidateAdd" :model="formValidateAdd" :label-width="40" class="top">
        <Row>
          <Col span="22">
            <FormItem label="类型" prop="proTypeName">
              <Select v-model="formValidateAdd.proTypeName" placeholder="请选择类型">
                <Option v-for="item in proTypeList" :key="item.value" :value="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="22">
            <FormItem label="品牌" prop="proBrandName">
              <Select v-model="formValidateAdd.proBrandName" placeholder="请选择品牌">
                <Option v-for="item in proBrandList" :key="item.value" :value="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="22">
            <FormItem label="名称" prop="name">
              <Input v-model="formValidateAdd.name" placeholder="请输入名称"></Input>
            </FormItem>
          </Col>
          <Col span="22">
            <FormItem label="图片" prop="imgUrl">
              <Input v-model="formValidateAdd.imgUrl" disabled placeholder="请上传图片"></Input>
            </FormItem>
          </Col>
          <Col span="22" class="img-left">
          <Upload action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline" type="primary">上传</Button>
          </Upload>
          </Col>
          <Col span="22" class="top">
            <FormItem label="备注">
              <Input v-model="formValidateAdd.memo" type="textarea" :rows="5" :autosize="{maxRows:5,minRows: 5}" placeholder="请输入备注"></Input>
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
      // 表单数据
      formValidateAdd: {
        ID: '',
        name: '',
        imgUrl: '',
        memo: '',
        proTypeName: '',
        proBrandName: '',
        update: new Date()
      },
      proBrandList: [
        {
          value: '0',
          label: '华为'
        },
        {
          value: '1',
          label: '苹果'
        }
      ],
      proTypeList: [
        {
          value: '1317',
          label: '电脑'
        },
        {
          value: '1',
          label: '手机'
        }
      ]
    }
  },
  // mounted () {
  //   console.log('5555555')
  //   this.select_label = '启用'
  // },
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
        // 类型
        let proBrandLabel = this.content.proBrandName
        // 品牌
        // let proTypeLabel = this.content.proTypeName
        // 判断是否是编辑
        if (edit === 2) {
          this.formValidateAdd.ID = this.content.ID
          this.formValidateAdd.name = this.content.name
          this.formValidateAdd.imgUrl = this.content.imgUrl
          this.formValidateAdd.memo = this.content.memo
          // 需要转换为字符串才可以给select赋值成功
          this.formValidateAdd.proBrandName = proBrandLabel.toString()
          // this.formValidateAdd.proTypeName = proTypeLabel.toString()
          this.formValidateAdd.proTypeName = this.content.typeId
          this.formValidateAdd.update = this.content.update
          console.log(this.formValidateAdd.proTypeName)
        } else {
          this.formValidateAdd.ID = ''
          this.formValidateAdd.name = ''
          this.formValidateAdd.imgUrl = ''
          this.formValidateAdd.memo = ''
          this.formValidateAdd.proTypeName = ''
          this.formValidateAdd.proBrandName = ''
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
</style>
