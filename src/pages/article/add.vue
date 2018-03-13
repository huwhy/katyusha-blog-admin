<template>
  <el-form label-width="100px">
    <el-form-item label="标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <template v-if="article.seo != null">
      <el-form-item label="SEO标题">
        <el-input v-model="article.seo.title"></el-input>
      </el-form-item>
      <el-form-item label="SEO关键词">
        <el-input type="textarea" v-model="article.seo.words"></el-input>
      </el-form-item>
      <el-form-item label="SEO描述">
        <el-input type="textarea" v-model="article.seo.desc"></el-input>
      </el-form-item>
    </template>
    <el-form-item label="类别">
      <el-select v-model="article.catId" placeholder="请选择">
        <el-option :key="0" label="请选择" :value="0"></el-option>
        <el-option :key="1" label="服务项目" :value="1"></el-option>
        <el-option :key="2" label="工程案例" :value="2"></el-option>
        <el-option :key="3" label="专业知识" :value="3"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="展示图" v-show="article.catId === 1 || article.catId === 2">
      <SingleUploader @upload-success="handleSuccess" :img="article.mainImg"/>
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
import SingleUploader from '@/components/Upload/SingleUploader'

export default {
  name: 'tinymce-demo',
  components: { Tinymce, SingleUploader },
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
    if (this.$route.params.id) {
      this.$store.dispatch('ARTICLE_EDIT', this.$route.params.id).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>
