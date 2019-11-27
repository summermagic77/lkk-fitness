<template>
  <div class="sidebar">
    <el-drawer
      title="練健康"
      :size="$device.mobile ? '50%' : '25%'"
      :visible.sync="isPanelOpen"
      :direction="direction">
      <ul class="sidebar-panel-nav">
        <li><el-link href="/" :underline="false">首頁</el-link></li>
        <li><el-link href="/member" :underline="false">會員</el-link></li>
        <li><el-link href="/employee" :underline="false">員工</el-link></li>
        <li><el-link href="/coach" :underline="false">教練</el-link></li>
      </ul>
    </el-drawer>
    <!-- <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
    <transition name="slide">
      <div v-if="isPanelOpen" class="sidebar-panel">
        <ul class="sidebar-panel-nav">
          <li><el-link href="/" :underline="false">首頁</el-link></li>
          <li><el-link href="/member" :underline="false">會員</el-link></li>
          <li><el-link href="/employee" :underline="false">員工</el-link></li>
          <li><el-link href="/coach" :underline="false">教練</el-link></li>
        </ul>
      </div>
    </transition> -->
  </div>
</template>
<script>
import { store, mutations } from '@/store';

export default {
  data() {
    return {
      drawer: false,
      direction: 'ltr',
    };
  },
  methods: {
    // closeSidebarPanel: mutations.toggleNav,
  },
  computed: {
    isPanelOpen: {
      get() {
        return store.isNavOpen;
      },
      set() {
        mutations.toggleNav();
      },
    },
  },
};
</script>
<style>
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.2s ease;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translateX(-100%);
    transition: all 150ms ease-in 0s
  }

  .sidebar-backdrop {
    /* background-color: rgba(19, 15, 64, .4); */
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
  }

  .sidebar-panel {
    overflow-y: auto;
    background-color: #EBEEF5;
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    z-index: 999;
    padding: 3rem 20px 2rem 20px;
    width: 250px;
  }
  ul.sidebar-panel-nav {
    list-style-type: none;
  }

  ul.sidebar-panel-nav > li > a {
    color: #fff;
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: 300;
    display: block;
    padding-bottom: 0.5em;
  }
</style>
