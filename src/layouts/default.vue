<template>
  <el-container
    :class="{
      'vh-100': true,
    }"
  >
    <el-header
      :class="{
        'home-header': $route.path === '/'
      }"
    >
      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="!$device.mobile && $route.path !== '/' ? 6 : 18" class="mt-1">
          <el-page-header
            v-if="$route.path !== '/'"
            :content="$route.name"
            class=""
            @back="goBack"
          />
        </el-col>
        <el-col v-if="!$device.mobile && $route.path !== '/'" :span="6" class="mt-1">
          <el-link href="/" :underline="false">
            <el-image
              style="height: 30px;"
              :src="require('@/assets/lkk-logo.png')"
              fit="contain"
            />
          </el-link>
        </el-col>
        <el-col :span="$route.path !== '/' ? 6 : 24">
          <Burger class="float-right" />
        </el-col>
      </el-row>
    </el-header>
    <el-aside>
      <Sidebar />
    </el-aside>
    <el-main
      :class="{
        'home-main': $route.path === '/',
        'page-component__scroll': true
      }"
    >
      <slot />
    </el-main>
    <!-- <el-footer v-if="$device.mobile">
      <i class="la la-home"></i>
    </el-footer> -->
    <el-backtop target=".page-component__scroll"></el-backtop>
  </el-container>
</template>

<script>
// import FileImageOutline from 'vue-material-design-icons/FileImageOutline.vue';
import Burger from '@/components/Menu/Burger.vue';
import Sidebar from '@/components/Menu/Sidebar.vue';

export default {
  components: {
    Burger,
    Sidebar,
    // FileImageOutline,
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
<style>
html {
  height: 100%;
  width: 100%;
  overflow: hidden;
  touch-action: manipulation;
}
body {
  border: 0; margin: 0; padding: 0;
  height: 100%;
  width: 100%;
  touch-action: manipulation;
}
.main-nav {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.8rem;
}
.home-header {
  background-color: #29526b;
  height: 50% !important;
}
.home-main {
  margin-top: -258px;
}
</style>
