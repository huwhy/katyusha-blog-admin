<template>
  <el-form label-width="80px">
    <el-form-item label="链接">
      <el-input v-model="banner.url"></el-input>
    </el-form-item>
    <el-form-item label="展示图">
      <SingleUploader @upload-success="handleSuccess"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="onClose">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import SingleUploader from '@/components/Upload/SingleUploader'

export default {
  components: { SingleUploader },
  computed: {
    banner () {
      return this.$store.getters.banner.temp
    }
  },
  methods: {
    handleSuccess (url) {
      this.banner.img = url
    },
    onSubmit () {
      this.$store.dispatch('BANNER_POST').then((res) => {
        this.$message.success('提交成功！')
        this.removeView()
      })
    },
    onClose () {
      this.removeView()
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>
