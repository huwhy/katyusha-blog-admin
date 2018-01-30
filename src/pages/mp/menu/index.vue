<template>
  <div>
    <div>
      <el-select v-model="mpId" placeholder="请选择" @change="mpChange">
        <el-option
          v-for="item in mpList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div style="min-width: 800px;">
      <el-card class="box-card" style="width: 360px;    display: inline-block; position: relative;">
          <el-button-group class="btns">
            <div class="btns-item" v-for="(menu, index) in menus" :key="index">
              <div class="child-items" v-bind:style="{width: childItemWidth}">
                <el-button @click="editChildMenu(index, i)" v-for="(m, i) in menu.childMenus" :key="index + '-' + i" style="width: 90%;border-radius: 4px;">{{m.title}}</el-button>
                <el-button v-show="menu.childMenus.length < 5" style="width: 90%;border-radius: 4px;" @click="addChildMenu(index)" >+</el-button>
              </div>
              <el-button style="width: 100%;border-radius:0;" @click="editRootMenu(index)">{{menu.title}}</el-button>
            </div>
            <template v-if="menus.length < 3">
              <div class="btns-item">
                <el-button style="width: 100%;border-radius:0;" class="btns-item" @click="addRootMenu" >+</el-button>
              </div>
            </template>
          </el-button-group>
        </el-card>
        <el-card class="box-card" v-if="editMenu !== null" style="width: 405px;    display: inline-block;">
          <el-form ref="form" :model="editMenu" label-width="120px">
            <el-form-item label="名称">
              <el-input v-model="editMenu.title"></el-input>
            </el-form-item>
            <el-form-item label="菜单类型">
              <el-radio-group v-model="editMenu.type">
                <el-radio v-show="editMenu.type === 0" :label="0">根菜单</el-radio>
                <el-radio v-show="editMenu.type !== 0" :label="1">网页</el-radio>
                <el-radio v-show="editMenu.type !== 0" :label="2">事件</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="链接" v-if="editMenu.type === 1">
              <el-input v-model="editMenu.content"></el-input>
            </el-form-item>
            <el-form-item label="key" v-if="editMenu.type === 2">
              <el-input v-model="editMenu.content"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="cancel">取消</el-button>
              <el-button type="primary" @click="cancel">添加</el-button>
              <el-button type="warning" @click="delMenu">删除</el-button>
            </el-form-item>
          </el-form>
        </el-card>
    </div>
    <el-row style="margin-top: 5px;">
      <el-col :span="12">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="publish">发布</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  data () {
    return {
      mpId: ''
    }
  },
  methods: {
    mpChange (id) {
      this.$store.dispatch('MP_MENU_GET', id).then((res) => {
        console.log(res)
      })
    },
    addRootMenu () {
      this.$store.dispatch('MP_MENU_ADD_ROOT')
    },
    editRootMenu (i) {
      this.$store.dispatch('MP_MENU_EDIT_ROOT', i)
    },
    addChildMenu (i) {
      this.$store.dispatch('MP_MENU_ADD_CHILD', i)
    },
    editChildMenu (i, j) {
      this.$store.dispatch('MP_MENU_EDIT_CHILD', {rootIndex: i, index: j})
    },
    delMenu () {
      this.$store.dispatch('MP_MENU_DEL_MENU')
      this.cancel()
    },
    cancel () {
      this.$store.dispatch('MP_MENU_CANCEL')
    },
    save () {
      let self = this
      this.$store.dispatch('MP_MENU_POST').then((res) => {
        if (res) {
          self.$message.success('提交成功！')
        }
      })
    },
    publish () {
      let self = this
      self.$axios.post('/api/mp/menu/push', qs.stringify({menuId: this.group.id})).then((res) => {
        if (res.data.code === 200) {
          self.$message.success('发布成功！')
        } else {
          self.$message.error(res.data.message)
        }
      })
    }
  },
  computed: {
    mpList () {
      return this.$store.getters.mpConfig.list
    },
    menus () {
      return this.$store.getters.mpMenu.temp.menus
    },
    editMenu () {
      return this.$store.getters.mpMenu.temp.editMenu
    },
    childItemWidth: function () {
      let w
      if (this.menus.length === 3) {
        w = 1 / 3 * 100 + '%'
      } else {
        w = 1 / (this.menus.length + 1) * 100 + '%'
      }
      return w
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

<style scoped>
  .group {
    background-color: rgba(144,147,153,.1);
    display: inline-block;
    padding: 0 10px;
    height: 32px;
    line-height: 30px;
    font-size: 12px;
    color: #909399;
    border-radius: 4px;
    box-sizing: border-box;
    border: 1px solid rgba(144,147,153,.2);
    white-space: nowrap;
  }
  .group-success {
    background-color: rgba(103,194,58,.1);
    border-color: rgba(103,194,58,.2);
    color: #67c23a;
  }
  .el-col {
    cursor: pointer;
  }
  .box-card {
    width: 360px;
    height: 400px;
  }
  .box-card .el-card__body {
    padding: 0;
  }
  .btns {
    position: absolute;
    width: 360px;
    display: flex;
    -webkit-display: flex;
    bottom: 0;
    left: 0;
  }
  .btns .btns-item {
    flex: 1;
  }
  .child-items{
    position: absolute;
    width: 100%;
    bottom: 40px;
    display: flex;
    -webkit-display: flex;
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    border-radius: 0;
  }
</style>
