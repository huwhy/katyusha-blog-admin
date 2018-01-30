<template>
  <div>
    <div class="box query-box">
      <el-form :inline="true" :model="params" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="params.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="handleDownload">下载</el-button>
          <router-link to="/article/add">
            <el-button>添加</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      border
      :data="articles"
      @cell-mouse-enter="cellMouseEnter"
      style="width: 100%"
      max-height="650">
      <el-table-column fixed prop="id" label="ID" width="150"></el-table-column>
      <el-table-column prop="title" label="标题" width="220">
        <div class="title" :alt="scope.row.title" slot-scope="scope">{{scope.row.title}}</div>
      </el-table-column>
      <el-table-column prop="author" label="作者" width="120"></el-table-column>
      <el-table-column prop="status" label="状态" width="120"></el-table-column>
      <el-table-column prop="tags" label="标签" width="120"></el-table-column>
      <el-table-column prop="views" label="浏览" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index)"
            type="text"
            size="small">
            移除
          </el-button>
          <router-link :to="'/article/' + scope.row.id">
            <el-button
            type="text"
            size="small">
            编辑
          </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.page"
      :page-sizes="[5, 10, 20, 50, 100]"
      :page-size="params.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  methods: {
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    onSubmit () {
      this.$store.dispatch('ARTICLE_PAGE_CHG', 1)
      this.$store.dispatch('ARTICLE_LIST').then((res) => {
        console.log(res)
      })
    },
    cellMouseEnter (row, column, cell, event) {
      // console.log(row, column, cell, event)
    },
    handleSizeChange (val) {
      this.$store.dispatch('ARTICLE_SIZE_CHG', val)
      this.$store.dispatch('ARTICLE_LIST')
    },
    handleCurrentChange (val) {
      this.$store.dispatch('ARTICLE_PAGE_CHG', val)
      this.$store.dispatch('ARTICLE_LIST')
    },
    handleDownload () {
      require.ensure([], () => {
        const { exportJsonToExcel } = require('@/vendor/Export2Excel')
        const tHeader = ['序号', '标题', '作者', '阅读数']
        const filterVal = ['id', 'title', 'author', 'views']
        const list = this.articles
        const data = this.formatJson(filterVal, list)
        exportJsonToExcel(tHeader, data, '文章列表')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  },
  computed: {
    total () {
      return this.$store.getters.article.total
    },
    params () {
      return this.$store.getters.article.params
    },
    articles () {
      return this.$store.getters.article.list
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
  @import '../../assets/common.scss';
  .title {
    height: 16px;
    line-height: 16px;
    width: 200px;
    @include ellipsis;
  }
</style>
