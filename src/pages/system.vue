<template>
  <el-form label-width="120px">
    <el-form-item label="公司名称">
      <el-input v-model="config.companyCn"></el-input>
    </el-form-item>
    <el-form-item label="公司英文名">
      <el-input v-model="config.companyEn"></el-input>
    </el-form-item>
    <el-form-item label="公司联系人">
      <el-input v-model="config.companyPerson"></el-input>
    </el-form-item>
    <el-form-item label="公司电话">
      <el-input v-model="config.companyPhone"></el-input>
    </el-form-item>
    <el-form-item label="公司邮箱">
      <el-input v-model="config.companyMail"></el-input>
    </el-form-item>
    <el-form-item label="公司地址">
      <el-input v-model="config.companyAddress"></el-input>
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
    config () {
      return this.$store.getters.systemConfig
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('SYSTEM_CONFIG_POST').then((res) => {
        this.$message.success('提交成功！')
        this.removeView()
      })
    },
    onClose () {
      this.removeView()
    }
  },
  created () {
    this.$store.dispatch('SYSTEM_CONFIG_GET').then((res) => {
    })
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>
