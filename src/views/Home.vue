<template>
  <div class="text-center">
    <div class="overlap-bg" />
    <!-- <el-link href="/" :underline="false"  class="mb-2"> -->
    <el-image
      style="height: 160px;"
      :src="require('@/assets/lkk-color.png')"
      fit="contain"
    />
    <!-- </el-link> -->
    <!-- <el-row
      :gutter="20"
      type="flex"
      class="row-bg h-100 mt-1"
      justify="center"
      align="middle"
    >
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card :body-style="{ padding: '10px' }" class="bg-brand text-white mt-1">
          <el-row>
            <el-col :span="8">
              <p class="fs-2 my-0 font-weight-bold">
                10
              </p>
              <span class="my-0">會員</span>
            </el-col>
            <el-col :span="8">
              <p class="fs-2 my-0 font-weight-bold">
                8
              </p>
              <span class="my-0">員工</span>
            </el-col>
            <el-col :span="8">
              <p class="fs-2 my-0 font-weight-bold">
                2
              </p>
              <span class="my-0">教練</span>
            </el-col>
          </el-row>
        </el-card>
        <el-badge :value="2" class="item mr-2" type="primary">
          <el-button>會員</el-button>
        </el-badge>
        <el-badge :value="5" class="item mr-2" type="primary">
          <el-button>員工</el-button>
        </el-badge>
        <el-badge :value="2" class="item" type="primary">
          <el-button>教練</el-button>
        </el-badge>
      </el-col>
    </el-row> -->
    <el-row
      :gutter="20"
      type="flex"
      class="row-bg h-100"
      justify="center"
      align="middle"
      >
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="text-center">
        <el-card :body-style="{ padding: '0px' }" shadow="always">
          <el-link href="/checkin" class="w-100 py-1" :underline="false">
            <!-- <account-check class="icon-3x" /> -->
            <i class="las la-sign-in-alt text-brand fs-3" />
            <h1 class="font-weight-light">
              入場
            </h1>
          </el-link>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="text-center">
        <el-card :body-style="{ padding: '0px' }" shadow="always">
          <el-link href="/checkout" class="w-100 py-1" :underline="false">
            <i class="las la-door-open text-brand fs-3" />
            <h1 class="font-weight-light">
              離場
            </h1>
          </el-link>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" class="row-bg" justify="center">
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="text-center">
        <el-card :body-style="{ padding: '0px' }" shadow="always">
          <el-link href="/consume" class="w-100 py-1" :underline="false">
            <!-- <account-badge-outline class="icon-3x" /> -->
            <!-- <i class="la la-shopping-bag text-brand fs-3"/> -->
            <h1 class="font-weight-light">
              <i class="la la-shopping-bag text-brand fs-1"/>
              消費
            </h1>
          </el-link>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="text-center">
        <el-card :body-style="{ padding: '0px' }" shadow="always">
          <el-link href="/search" class="w-100 py-1" :underline="false">
            <!-- <account-multiple-check class="icon-3x" /> -->
            <!-- <i class="las la-search text-brand fs-3" /> -->
            <h1 class="font-weight-light">
              <i class="las la-search text-brand fs-1" />
              查詢
            </h1>
          </el-link>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" type="flex" class="row-bg" justify="center">
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="text-center">
        <el-card :body-style="{ padding: '0px' }" shadow="always">
          <el-link href="/create" class="w-100 py-1" :underline="false">
            <!-- <account-badge-outline class="icon-3x" /> -->
            <!-- <i class="las la-user-plus text-brand fs-3"/> -->
            <h1 class="font-weight-light">
              <i class="las la-user-plus text-brand fs-1"/>
              加入
            </h1>
          </el-link>
        </el-card>
      </el-col>
      <el-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6" class="text-center">
        <el-card :body-style="{ padding: '0px' }" shadow="always">
          <el-link href="/record" class="w-100 py-1" :underline="false">
            <!-- <account-multiple-check class="icon-3x" /> -->
            <h1 class="font-weight-light">
              <i class="lar la-clipboard text-brand fs-1" />
              紀錄
            </h1>
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
        <el-card :body-style="{ padding: '10px' }" shadow="always">
          <el-link href="/consume" class="w-100" :underline="false">
            <i class="la la-shopping-bag text-brand fs-3"/>
            <h4 class="my-1">消費</h4>
          </el-link>
        </el-card>
      </el-col>
      <el-col :xs="8" :sm="8" :md="4" :lg="4" :xl="4">
        <el-card :body-style="{ padding: '10px' }" shadow="always">
          <el-link href="/search" class="w-100" :underline="false">
            <i class="las la-search text-brand fs-3" />
            <h4 class="my-1">查詢</h4>
          </el-link>
        </el-card>
      </el-col>
      <el-col :xs="8" :sm="8" :md="4" :lg="4" :xl="4">
        <el-card :body-style="{ padding: '10px' }" shadow="always">
          <el-link href="/record" class="w-100" :underline="false">
            <i class="lar la-clipboard text-brand fs-3" />
            <h4 class="my-1">紀錄</h4>
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
// import AccountCheck from 'vue-material-design-icons/AccountCheck.vue';
// import AccountPlus from 'vue-material-design-icons/AccountPlus.vue';
// import AccountBadgeOutline from 'vue-material-design-icons/AccountBadgeOutline.vue';
// import AccountMultipleCheck from 'vue-material-design-icons/AccountMultipleCheck.vue';

export default {
  name: 'home',
  components: {
    // AccountCheck,
    // AccountPlus,
    // AccountBadgeOutline,
    // AccountMultipleCheck,
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
