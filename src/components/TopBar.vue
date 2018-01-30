<template>
  <div class="scroll-wrapper" ref="wrapper">
    <div class="scroll-content">
      <router-link class="tab-item" :class="{active: openTab === tab.path}" :to="{path: tab.path}" v-for="(tab, i) in tabs" :key="tab + i">
        {{viewName(tab.path)}}
        <span class='el-icon-close' @click='closeViewTags(tab, $event)'></span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    this.addView()
    this.openTab = this.$route.path
  },
  data () {
    return {
      openTab: ''
    }
  },
  methods: {
    addView () {
      this.addTabView()
    },
    viewName (path) {
      let name = this.$store.getters.tabNames[path]
      if (!name) {
        for (const i in this.$store.getters.tabRegNames) {
          let item = this.$store.getters.tabRegNames[i]
          if (item.reg.test(path)) {
            return item.name
          }
        }
      }
      return name
    },
    closeViewTags (view, $event) {
      this.removeView(view.path)
      $event.preventDefault()
    },
    isActive (view) {
      return view.path === this.openTab
    }
  },
  computed: {
    tabs () {
      return this.$store.getters.tabViews
    }
  },
  watch: {
    $route () {
      this.openTab = this.$route.path
      this.addView()
    }
  }
}
</script>

<style scoped>
.scroll-wrapper {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  background: #fff;
  height: 33px;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
}
.scroll-content {
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden;
  height: 33px;
}
.scroll-content::-webkit-scrollbar{
  display:none;
}
.tab-item {
  display: inline-block;
  position: relative;
  height: 26px;
  line-height: 26px;
  border: 1px solid #d8dce5;
  color: #495060;
  background: #fff;
  padding: 0 8px;
  font-size: 12px;
  margin: 2px 5px;
}
.tab-item.active {
  background-color: #42b983;
  color: #fff;
  border-color: #42b983;
}
.tab-item.active::before {
  content: '';
  background: #fff;
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: relative;
  margin-right: 2px;
}
</style>
