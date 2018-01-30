<template>
  <div>
    <el-form ref="Article" :model="article" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item>
        <markdown-editor id="contentEditor" ref="contentEditor" v-model="article.content" :zIndex="20"></markdown-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onClose">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/javascript">
import MarkdownEditor from '@/components/MarkdownEditor'
export default {
  components: { MarkdownEditor },
  data () {
    return {
    }
  },
  computed: {
    article () {
      return this.$store.getters.article.temp
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('ARTICLE_POST').then((res) => {
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
      this.$store.dispatch('ARTICLE_EDIT', this.$route.params.id).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
