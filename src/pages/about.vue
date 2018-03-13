<template>
  <el-form label-width="80px" v-if="article != null">
    <el-form-item label="标题">
      {{article.title}}
    </el-form-item>
    <el-form-item>
      <div class="components-container">
        <div>
          <tinymce :height="200" v-model="article.content"></tinymce>
        </div>
        <div class="editor-content" v-html="article.content"></div>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="onClose">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  components: { Tinymce },
  computed: {
    article () {
      return this.$store.getters.article.temp
    }
  },
  methods: {
    handleSuccess (url) {
      this.article.mainImg = url
    },
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
    this.$store.dispatch('ARTICLE_EDIT', 1).then((res) => {
    })
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>
