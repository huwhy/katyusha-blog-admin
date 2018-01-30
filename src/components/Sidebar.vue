<template>
  <div class="slidebar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      unique-opened
      router>
      <el-submenu :index="menu.index" v-for="menu in menus" :key="menu.index">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{menu.name}}</span>
        </template>
        <el-menu-item :index="m.index" v-if="menu.subs" v-for="m in menu.subs" :key="m.index">{{m.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      activeIndex: '1',
      menus: [
        {
          name: '博客',
          index: '/',
          subs: [
            {
              name: '文章',
              index: '/article'
            },
            {
              name: '类目',
              index: '/category'
            },
            {
              name: '链接',
              index: '/link'
            }
          ]
        },
        {
          name: '公众号设置',
          index: '/mp',
          subs: [
            {
              name: '公众号配置',
              index: '/mp-config'
            },
            {
              name: '公众号菜单设置',
              index: '/mp-menu'
            },
            {
              name: '自动回复设置',
              index: '/mp-reply'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style type="text/css" lang="scss" scoped>
  .slidebar {
    display: block;
    position: absolute;
    width: 250px;
    left: 0;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
    &>ul {
      height: 100%;
    }
  }
</style>
