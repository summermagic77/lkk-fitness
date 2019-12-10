<template>
  <div class="text-center">
    <div class="overlap-bg" />
    <el-image
      style="height: 160px;"
      :src="require('@/assets/lkk-color.png')"
      fit="contain"
      class="mb-4"
    />
    <el-row
      :gutter="10"
      type="flex"
      class="row-bg h-100 mt-3"
      justify="center"
      align="middle"
    >
      <el-col :xs="8" :sm="8" :md="4" :lg="4" :xl="4">
        <el-card :body-style="{ padding: '0px' }" shadow="always">
          <el-link href="/checkin" class="w-100 pt-1" :underline="false">
            <i class="las la-sign-in-alt text-brand fs-3" />
            <h4 class="my-1">入場</h4>
          </el-link>
        </el-card>
      </el-col>
      <el-col :xs="8" :sm="8" :md="4" :lg="4" :xl="4">
        <el-card :body-style="{ padding: '0px' }" shadow="always">
          <el-link href="/checkout" class="w-100 pt-1" :underline="false">
            <i class="las la-door-open text-brand fs-3" />
            <h4 class="my-1">離場</h4>
          </el-link>
        </el-card>
      </el-col>
      <el-col :xs="8" :sm="8" :md="4" :lg="4" :xl="4">
        <el-card :body-style="{ padding: '0px' }" shadow="always">
          <el-link href="/create" class="w-100 pt-1" :underline="false">
            <i class="las la-user-plus text-brand fs-3"/>
            <h4 class="my-1">加入</h4>
          </el-link>
        </el-card>
      </el-col>
    </el-row>
    <el-row
      :gutter="10"
      type="flex"
      class="row-bg h-100"
      justify="center"
      align="middle"
    >
      <el-col :xs="8" :sm="8" :md="4" :lg="4" :xl="4">
        <el-card :body-style="{ padding: '0px' }" shadow="never" class="bg-light">
          <el-link class="w-100 pt-1" :underline="false">
            <i class="la la-shopping-bag fs-3"/>
            <h4 class="my-1">消費</h4>
          </el-link>
        </el-card>
      </el-col>
      <el-col :xs="8" :sm="8" :md="4" :lg="4" :xl="4">
        <el-card :body-style="{ padding: '0px' }" shadow="always">
          <el-link href="/search" class="w-100 pt-1" :underline="false">
            <i class="las la-search text-brand fs-3" />
            <h4 class="my-1">查詢</h4>
          </el-link>
        </el-card>
      </el-col>
      <el-col :xs="8" :sm="8" :md="4" :lg="4" :xl="4">
        <el-card :body-style="{ padding: '0px' }" shadow="never" class="bg-light">
          <el-link class="w-100 pt-1" :underline="false">
            <i class="lar la-clipboard fs-3" />
            <h4 class="my-1">紀錄</h4>
          </el-link>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'home',
  components: {
  },
};
</script>

<style scoped="scss">
/* .home-header {
  background-color: #29526b;
}
.overlap-bg {
  background-color: #29526b;
  position: relative;
} */
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
