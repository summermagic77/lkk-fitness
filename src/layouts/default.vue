<template>
  <el-container
    :class="{
      'vh-100': true
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
        'home-main': $route.path === '/'
      }"
    >
      <slot />
    </el-main>
    <!-- <el-footer v-if="$device.mobile">
      <i class="la la-home"></i>
    </el-footer> -->
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
  overflow:hidden;
}
body {
  border: 0; margin: 0; padding: 0;
  /* font-family: 'Lato'; */
  height: 100%;
  width: 100%;
  /* background: rgb(101,31,87);
  background:
    linear-gradient(45deg,
    rgba(101,31,87,1) 0%,
    rgba(225,113,87,1) 48%,
    rgba(249,248,113,1) 100%); */
}
/* .logo {
  align-self: center;
  color: #fff;
  font-weight: bold;
  font-family: 'Lato'
} */
.main-nav {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.8rem;
}
.bg-lkk {
  background-color: #29526b;
}
.home-header {
  background-color: #29526b;
  height: 55% !important;
}
.home-main {
  margin-top: -298px;
}
</style>
