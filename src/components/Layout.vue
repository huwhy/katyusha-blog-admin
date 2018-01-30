<template>
  <div>
    <v-header/>
    <v-sidebar />
    <div class="container">
      <div class="tabs">
        <v-topbar></v-topbar>
      </div>
      <div class="content">
        <transition name="move" mode="out-in"><router-view></router-view></transition>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import topbar from '@/components/TopBar.vue'
export default {
  components: {
    'v-header': Header,
    'v-sidebar': Sidebar,
    'v-topbar': topbar
  }
}
</script>

<style type="text/css" lang="scss" scoped>
@import '../assets/base.scss';
.tabs {
    background: none repeat scroll 0 0 #fff;
    height: 36px;
    width: auto;
}
.container {
  @include flex;
  @include flex_direct(column);
  position: absolute;
  left: 250px;
  top: 60px;
  right: 0;
  bottom: 0;
  .tabs {
    background: none repeat scroll 0 0 #fff;
    height: 36px;
    width: 100%;
  }
  .content {
    flex: 1;
    overflow: scroll;
    padding: 12px;
  }
}
</style>
