<template>
  <div>
    <el-form ref="reply" :model="reply" label-width="80px">
      <el-form-item label="公众号">
        <el-select v-model="reply.mp_id" placeholder="请选择">
          <el-option
            v-for="item in mpList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回复类型">
        <el-select v-model="reply.type" placeholder="请选择">
          <el-option label="文本" :value="1"></el-option>
          <el-option label="文章" :value="0"></el-option>
          <el-option label="图片" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关键字">
        <el-input v-model="reply.keyword"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="reply.content"></el-input>
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
  computed: {
    mpList () {
      return this.$store.getters.mpConfig.list
    },
    reply () {
      return this.$store.getters.mpReply.temp
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('MP_REPLY_POST').then((res) => {
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
      this.$store.dispatch('MP_REPLY_EDIT', this.$route.params.id).then((res) => {
        console.log(res)
      })
    }
    this.$store.dispatch('MP_CONFIG_LIST').then((res) => {
    })
  }
}
</script>
