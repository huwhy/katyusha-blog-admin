<template>
  <div>
    <el-form ref="config" :model="config" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="config.name"></el-input>
      </el-form-item>
      <el-form-item label="AppID">
        <el-input v-model="config.appId"></el-input>
      </el-form-item>
      <el-form-item label="密钥">
        <el-input v-model="config.secret"></el-input>
      </el-form-item>
      <el-form-item label="TOKEN">
        <el-input v-model="config.token"></el-input>
      </el-form-item>
      <el-form-item label="AesKey">
        <el-input v-model="config.aesKey"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onClose">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
    }
  },
  computed: {
    config () {
      return this.$store.getters.mpConfig.temp
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('MP_CONFIG_POST').then((res) => {
        this.$message.success('提交成功！')
        this.removeView()
      })
    },
    onClose () {
      this.removeView()
    }
  },
  created () {
    if (this.$route.params.id) {
      this.$store.dispatch('MP_CONFIG_EDIT', this.$route.params.id).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
