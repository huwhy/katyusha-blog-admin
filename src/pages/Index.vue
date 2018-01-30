<!-- <template>
  <div>
    <div class="box query-box">
      <el-form :inline="true" :model="params" class="demo-form-inline">
        <el-form-item label="标题">
          <el-input v-model="params.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
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
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
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
      // this.$store.dispatch('ARTICLE_LIST').then((res) => {
      //   console.log(res)
      // })
    },
    cellMouseEnter (row, column, cell, event) {
      // console.log(row, column, cell, event)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  computed: {
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
  @import '../assets/common.scss';
  .title {
    height: 16px;
    line-height: 16px;
    width: 200px;
    @include ellipsis;
  }
</style>
 -->