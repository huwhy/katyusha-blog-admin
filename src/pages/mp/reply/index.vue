<template>
  <div>
    <div class="box query-box">
      <el-form :inline="true" :model="params" class="demo-form-inline">
        <el-form-item label="公众号">
          <el-select v-model="mpId" placeholder="请选择" @change="mpChange">
            <el-option
              v-for="item in mpList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="params.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <router-link to="/mp-reply/add">
            <el-button>添加</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      border
      :data="replies"
      @cell-mouse-enter="cellMouseEnter"
      style="width: 100%"
      max-height="650">
      <el-table-column fixed prop="id" label="ID" width="150"></el-table-column>
      <el-table-column label="类型" width="220">
        <template slot-scope="scope">
          <template v-if="scope.row.type === 0">
            文章
          </template>
          <template v-else-if="scope.row.type === 1">
            文本
          </template>
          <template v-else>
            图片
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="keyword" label="关键字" width="220">
      </el-table-column>
      <el-table-column prop="content" label="回复" width="220">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.row.id)"
            type="text"
            size="small">
            移除
          </el-button>
          <router-link :to="'/mp-config/' + scope.row.id">
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
  data () {
    return {
      mpId: ''
    }
  },
  methods: {
    mpChange (id) {
      this.$store.dispatch('MP_REPLY_SET_MPID', id).then((res) => {
        console.log(res)
      })
    },
    deleteRow (id) {
      this.$store.dispatch('MP_REPLY_DELETE', id).then((res) => {
        if (res.ok) {
          this.$message.success('删除成功')
        }
      })
    },
    onSubmit () {
      this.$store.dispatch('MP_REPLY_LIST').then((res) => {
        console.log(res)
      })
    },
    cellMouseEnter (row, column, cell, event) {
      // console.log(row, column, cell, event)
    },
    handleSizeChange (val) {
      this.$store.dispatch('MP_REPLY_SIZE_CHG', val)
      this.$store.dispatch('MP_REPLY_LIST')
    },
    handleCurrentChange (val) {
      this.$store.dispatch('MP_REPLY_PAGE_CHG', val)
      this.$store.dispatch('MP_REPLY_LIST')
    }
  },
  computed: {
    mpList () {
      return this.$store.getters.mpConfig.list
    },
    total () {
      return this.$store.getters.mpReply.total
    },
    params () {
      return this.$store.getters.mpReply.params
    },
    replies () {
      return this.$store.getters.mpReply.list
    }
  },
  created () {
    this.$store.dispatch('MP_CONFIG_LIST').then((res) => {
      let mps = res.data.data
      if (mps.length > 0) {
        this.mpChange(mps[0].id)
        this.mpId = mps[0].id
      }
    })
  }
}
</script>

<style type="text/css" lang="scss" scoped>
  @import '../../../assets/common.scss';
  .title {
    height: 16px;
    line-height: 16px;
    width: 200px;
    @include ellipsis;
  }
</style>
