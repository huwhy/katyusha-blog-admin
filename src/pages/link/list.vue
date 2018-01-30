<template>
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
      :data="categories"
      @cell-mouse-enter="cellMouseEnter"
      style="width: 100%"
      max-height="650">
      <el-table-column fixed prop="id" label="ID" width="150"></el-table-column>
      <el-table-column label="名称" width="220">
        <div class="title" :alt="scope.row.name" slot-scope="scope">{{scope.row.name}}</div>
      </el-table-column>
      <el-table-column label="链接" width="220">
        <div class="title" :alt="scope.row.url" slot-scope="scope">{{scope.row.url}}</div>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.row.id)"
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
    deleteRow (id) {
      this.$store.dispatch('LINK_DELETE', id).then((res) => {
        if (res.ok) {
          this.$message.success('删除成功')
        }
      })
    },
    onSubmit () {
      this.$store.dispatch('LINK_LIST').then((res) => {
        console.log(res)
      })
    },
    cellMouseEnter (row, column, cell, event) {
      // console.log(row, column, cell, event)
    },
    handleSizeChange (val) {
      this.$store.dispatch('LINK_SIZE_CHG', val)
      this.$store.dispatch('LINK_LIST')
    },
    handleCurrentChange (val) {
      this.$store.dispatch('LINK_PAGE_CHG', val)
      this.$store.dispatch('LINK_LIST')
    }
  },
  computed: {
    total () {
      return this.$store.getters.link.total
    },
    params () {
      return this.$store.getters.link.params
    },
    categories () {
      return this.$store.getters.link.list
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
