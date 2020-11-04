<template>
  <div>
    <Modal
      v-model='showAddModal'
      :closable='false'
      :mask-closable='false'
      :title='Title'
      width="680"
      :footer-hide='true'
    >
      <Form ref="formValidateAdd" :model="formValidateAdd" :label-width="60" class="top">
        <Row>
          <Col span="22">
            <FormItem label="名称" prop="name">
              <Input v-model="formValidateAdd.name" placeholder="请输入名称"></Input>
            </FormItem>
          </Col>
          <Col span="22">
            <FormItem label="代表人" prop="leader">
              <Input v-model="formValidateAdd.leader" placeholder="请输入代表人"></Input>
            </FormItem>
          </Col>
          <Col span="22">
            <FormItem label="手机号" prop="mobile">
              <Input v-model="formValidateAdd.mobile" placeholder="请输入手机号"></Input>
            </FormItem>
          </Col>
          <Col span="22">
            <FormItem label="地址" prop="addr">
              <Input v-model="formValidateAdd.addr" placeholder="请输入地址"></Input>
            </FormItem>
          </Col>
          <Col span="22">
            <FormItem label="状态" prop="state">
              <Select v-model="formValidateAdd.state" placeholder="请选择状态">
                <Option v-for="item in selList" :key="item.value" :value="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="22">
            <FormItem label="图片" prop="imgUrl">
              <Input v-model="formValidateAdd.imgUrl" disabled placeholder="请上传图片"></Input>
            </FormItem>
          </Col>
          <Col span="22" class="company-img-left">
          <Upload
            action="/api/company/addImg"
            :show-upload-list="false"
            :on-success="handleUploadicon"
            :on-error="handleUpError"
            :format="['jpg','jpeg','png', 'gif']"
            :on-format-error="handleFormatError">
            <Button icon="ios-cloud-upload-outline" type="primary">上传</Button>
          </Upload>
          </Col>
          <Col span="22" class="top">
            <FormItem label="备注">
              <Input v-model="formValidateAdd.memo" type="textarea" :rows="5" :autosize="{maxRows:5,minRows: 5}" placeholder="请输入备注"></Input>
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
        leader: '',
        mobile: '',
        addr: '',
        imgUrl: '',
        state: '',
        memo: ''
      },
      selList: [
        {
          value: '0',
          label: '启用'
        },
        {
          value: '1',
          label: '停用'
        }
      ]
    }
  },
  methods: {
    // 文件上传成功时的钩子，返回字段为 response, file, fileList
    handleUploadicon (response) {
      this.formValidateAdd.imgUrl = response.imgUrl
      this.$Message.success('图片上传成功')
    },
    handleUpError () {
      this.$Message.error('图片上传失败')
    },
    // 文件格式验证失败时的钩子，返回字段为 file, fileList
    handleFormatError (file) {
      this.$Message.info('图片格式不正确,请上传正确的图片格式')
    },
    // 确定回调
    modalOk () {
      if (this.formValidateAdd.name === '') {
        this.$Message.error('请输入名称')
      } else if (this.formValidateAdd.leader === '') {
        this.$Message.error('请输入代表人')
      } else if (this.formValidateAdd.mobile === '') {
        this.$Message.error('请输入手机号')
      } else if (this.formValidateAdd.addr === '') {
        this.$Message.error('请输入地址')
      } else if (this.formValidateAdd.status === '') {
        this.$Message.error('请选择状态')
      } else {
        let data = {}
        data.id = this.formValidateAdd.ID
        data.name = this.formValidateAdd.name
        data.leader = this.formValidateAdd.leader
        data.mobile = this.formValidateAdd.mobile
        data.addr = this.formValidateAdd.addr
        data.imgUrl = this.formValidateAdd.imgUrl
        data.state = this.formValidateAdd.state
        data.memo = this.formValidateAdd.memo
        // 添加
        if (this.isAdd === 1) {
          data.url = '/company/add'
        // 编辑
        } else {
          data.url = '/company/update'
        }
        // 判断添加 / 编辑时提交数据给接口(调用父组件添加/编辑方法)
        this.$parent.getisAddData(data)
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
        let statusLabel = this.content.state
        // 判断是否是编辑
        if (edit === 2) {
          this.formValidateAdd.ID = this.content.ID
          this.formValidateAdd.name = this.content.name
          this.formValidateAdd.leader = this.content.leader
          this.formValidateAdd.mobile = this.content.mobile
          this.formValidateAdd.addr = this.content.addr
          this.formValidateAdd.imgUrl = this.content.imgUrl
          this.formValidateAdd.memo = this.content.memo
          // 需要将status转换为字符串才可以给select赋值成功
          this.formValidateAdd.state = statusLabel.toString()
        } else {
          this.formValidateAdd.ID = ''
          this.formValidateAdd.name = ''
          this.formValidateAdd.leader = ''
          this.formValidateAdd.mobile = ''
          this.formValidateAdd.addr = ''
          this.formValidateAdd.imgUrl = ''
          this.formValidateAdd.memo = ''
          this.formValidateAdd.state = ''
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
.company-img-left{
  margin-left: 60px;
}
.ivu-form-item-required .ivu-form-item-label:before{
  display: none;
}
.rt {
  float: right;
}
</style>
