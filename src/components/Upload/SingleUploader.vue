<template>
  <el-upload
    class="single-uploader"
    :action="action"
    :name="name"
    :show-file-list="false"
    :on-success="handleUploadSuccess"
    :before-upload="beforeUpload">
    <img v-if="imageUrl" :src="imageUrl" class="single-img">
    <i v-else class="el-icon-plus single-uploader-icon"></i>
  </el-upload>
</template>

<script>
export default {
  props: {
    action: {
      type: String,
      default: '/api/upload'
    },
    name: {
      type: String,
      default: 'file'
    },
    img: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      imageUrl: ''
    }
  },
  methods: {
    handleUploadSuccess (res, file) {
      this.imageUrl = '/file?file=' + res.data
      this.$emit('upload-success', '/file?file=' + res.data)
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  watch: {
    img (newV, oldV) {
      this.imageUrl = newV
    }
  }
}
</script>

<style lang="scss">
  .single-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409EFF;
    }
  }
  .single-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .single-img {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
