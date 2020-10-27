<template>
  <div>
    <Modal
      v-model='showAddModal'
      :title='Title'
      width="700"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
      <p>Content of dialog</p>
    </Modal>
  </div>
</template>
<script>
export default {
  name: 'add-product-modal',
  // props: ['showModal', 'addTitle'],
  props: {
    showModal: Boolean,
    addTitle: String
  },
  data () {
    return {
      showAddModal: this.showModal,
      Title: this.addTitle
    }
  },
  methods: {
    ok () {
      this.$emit('updateModelStatus', false)
    },
    cancel () {
      this.$emit('updateModelStatus', false)
    }
  },
  watch: {
    showModal (newVal) {
      this.showAddModal = newVal
    },
    addTitle (newVal) {
      this.Title = newVal
    }
  }
}
</script>
