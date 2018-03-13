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
          name: '官网',
          index: '/',
          subs: [
            {
              name: '文章',
              index: '/article'
            },
            {
              name: '轮播广告',
              index: '/banner'
            },
            {
              name: '公司介绍',
              index: '/about'
            },
            {
              name: '系统设置',
              index: '/system'
            },
            {
              name: 'SEO设置',
              index: '/seo'
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
