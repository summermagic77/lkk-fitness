<template>
  <el-container>
    <el-header class="home-header">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6"><div class="grid-content bg-purple-light">Header</div></el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row :gutter="20" type="flex" class="row-bg" justify="center">
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="text-center">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <el-link href="/member" class="w-100" :underline="false" style="padding: 20px 0;">
                <!-- <h1><i class="el-icon-plus" /></h1> -->
                <account-check class="icon-3x" />
                <h3>
                  會員進場
                </h3>
              </el-link>
            </el-card>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="text-center">
          <el-card shadow="hover">
            <!-- <h1><i class="el-icon-plus" /></h1> -->
            <h1>
              <account-plus class="icon-3x" />
            </h1>
            建立新會員
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20" type="flex" class="row-bg" justify="center">
        <el-col :span="6">
          <el-card shadow="hover" class="text-center">
            <h1>
              <account-badge-outline class="icon-3x" />
            </h1>
            員工打卡
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="text-center">
            <h1>
              <!-- <font-awesome-icon icon="id-card-alt" class="fa-2x" /> -->
              <account-multiple-check class="icon-3x" />
            </h1>
            教練場租
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import AccountCheck from 'vue-material-design-icons/AccountCheck.vue';
import AccountPlus from 'vue-material-design-icons/AccountPlus.vue';
import AccountBadgeOutline from 'vue-material-design-icons/AccountBadgeOutline.vue';
import AccountMultipleCheck from 'vue-material-design-icons/AccountMultipleCheck.vue';

export default {
  name: 'home',
  components: {
    AccountCheck,
    AccountPlus,
    AccountBadgeOutline,
    AccountMultipleCheck,
  },
};
</script>

<style scoped="scss">
/* .home-header {
  background-color: #29526b;
} */
.material-design-icon.icon-3x {
  height: 3em;
  width: 3em;
}
.material-design-icon.icon-3x > .material-design-icon__svg {
  height: 3em;
  width: 3em;
}
.text-center {
  text-align: center;
}
.w-100 {
  width: 100%;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
