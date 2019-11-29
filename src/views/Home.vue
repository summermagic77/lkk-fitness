<template>
  <div class="text-center">
    <div class="overlap-bg" />
  <!-- <el-container> -->
    <!-- <el-header class="home-header">
      <el-link href="/" :underline="false">
        <el-image
          style="height: 50px;"
          :src="require('@/assets/lkk-logo.png')"
          fit="contain"
        />
      </el-link>
    </el-header> -->
    <!-- <el-main> -->
    <el-link href="/" :underline="false"  class="mb-1">
      <el-image
        style="height: 200px;"
        :src="require('@/assets/lkk-color.png')"
        fit="contain"
      />
    </el-link>
    <el-row
      :gutter="20"
      type="flex"
      class="row-bg h-100"
      justify="center"
      align="middle"
    >
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="text-center">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <el-link href="/member/checkin" class="w-100 py-1" :underline="false">
            <account-check class="icon-3x" />
            <h1 class="font-weight-light">
              會員進場
            </h1>
          </el-link>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="text-center">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <el-link href="/member/create" class="w-100 py-1" :underline="false">
            <account-plus class="icon-3x" />
            <h1 class="font-weight-light">
              建立新會員
            </h1>
          </el-link>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" class="row-bg" justify="center">
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="text-center">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <el-link href="/employee/checkin" class="w-100 py-1" :underline="false">
            <account-badge-outline class="icon-3x" />
            <h1 class="font-weight-light">
              員工打卡
            </h1>
          </el-link>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="text-center">
        <el-card :body-style="{ padding: '0px' }" shadow="hover">
          <el-link href="/coach/checkin" class="w-100 py-1" :underline="false">
            <account-multiple-check class="icon-3x" />
            <h1 class="font-weight-light">
              教練場租
            </h1>
          </el-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
    <!-- </el-main>
  </el-container> -->
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
/* .overlap-bg {
  background-color: #29526b;
  position: relative;
} */
.material-design-icon.icon-3x {
  height: 3em;
  width: 3em;
}
.material-design-icon.icon-3x > .material-design-icon__svg {
  height: 3em;
  width: 3em;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
