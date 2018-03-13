<template>
  <div>
    <div class="box query-box">
      <el-form :inline="true" :model="params" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <!-- <el-button type="primary" @click="handleDownload">下载</el-button> -->
          <router-link to="/banner/add">
            <el-button>添加</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      border
      :data="banners"
      @cell-mouse-enter="cellMouseEnter"
      style="width: 100%"
      max-height="650">
      <el-table-column fixed prop="id" label="ID" width="150"></el-table-column>
      <el-table-column prop="img" label="IMG" width="220">
        <template slot-scope="scope">
          <img :src="scope.row.img" :alt="scope.row.img" width="60" height="60" class="am-img-thumbnail">
        </template>
      </el-table-column>
      <el-table-column prop="url" label="URL" width="120"></el-table-column>
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
      this.$store.dispatch('BANNER_DELETE', id).then((res) => {
        if (res.ok) {
          this.$message.success('删除成功')
        }
      })
    },
    onSubmit () {
      if (this.params.cid === 0) {
        this.$message({
          showClose: true,
          message: '请选择类别',
          type: 'warning'
        })
        return
      }
      this.$store.dispatch('BANNER_PAGE_CHG', 1)
      this.$store.dispatch('BANNER_LIST').then((res) => {
        console.log(res)
      })
    },
    cellMouseEnter (row, column, cell, event) {
      // console.log(row, column, cell, event)
    },
    handleSizeChange (val) {
      this.$store.dispatch('BANNER_SIZE_CHG', val)
      this.$store.dispatch('BANNER_LIST')
    },
    handleCurrentChange (val) {
      this.$store.dispatch('BANNER_PAGE_CHG', val)
      this.$store.dispatch('BANNER_LIST')
    }
  },
  computed: {
    total () {
      return this.$store.getters.banner.total
    },
    params () {
      return this.$store.getters.banner.params
    },
    banners () {
      return this.$store.getters.banner.list
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
