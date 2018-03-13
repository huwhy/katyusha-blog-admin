<template>
  <el-form label-width="120px">
    <el-form-item label="标题">
      <el-input v-model="seo.title"></el-input>
    </el-form-item>
    <el-form-item label="关键词">
      <el-input v-model="seo.words"></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model="seo.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="onClose">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  computed: {
    seo () {
      return this.$store.getters.seo
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('SEO_POST').then((res) => {
        this.$message.success('提交成功！')
        this.removeView()
      })
    },
    onClose () {
      this.removeView()
    }
  },
  created () {
    this.$store.dispatch('SEO_GET').then((res) => {
      console.log(res)
    })
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>
