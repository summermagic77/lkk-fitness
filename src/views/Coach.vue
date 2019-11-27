<template>
  <el-container>
    <el-header>
      <el-page-header @back="goBack" :content="$route.name" />
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>
