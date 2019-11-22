<template>
  <div>
    <el-container>
        <!-- <el-header>Header</el-header> -->
        <el-container>
          <el-aside width="300px">
            <side-bar />
          </el-aside>
          <el-main>
              <slot />
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';

export default {
  components: {
    SideBar,
  },
  data() {
    return {
    };
  },
  computed: {
  },
};
</script>
