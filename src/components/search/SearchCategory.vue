<template>
  <el-row
    type="flex"
    class="row-bg h-100"
    justify="center"
    align="middle"
  >
    <el-col :sm="12" :md="12" :lg="8" :xl="8">
        <el-title
          title="搜尋資料"
          icon="las la-search"
          class="mb-2"
        />
      <el-card
        v-for="(item, idx) in searchItems"
        :key="idx"
        :body-style="{ padding: '0px' }"
        class="mb-1 bg-light-steel search"
        shadow="hover">
        <el-link
          :href="`/search/${item.href}`"
          class="w-100"
          :underline="false"
          style="justify-content: normal"
        >
          <div class="d-flex p-1 w-100">
            <i
              :class="{
              [item.icon]: true,
              'fs-1-5': true,
              }"
            ></i>
            <h4 class="my-0" style="margin-left: 10px;">
              {{ item.name }}
            </h4>
            <i class="la la-angle-right text-black-50 ml-auto"></i>
          </div>
        </el-link>
      </el-card>

      <!-- <p class="text-black-50 mb-2">
        輸入手機號碼、LINE ID 或 QRcode {{ userTypeLabel }}。
      </p> -->
      <!-- <el-input
        v-model="search"
        placeholder="請輸入姓名、手機或LINE ID"
        suffix-icon="el-icon-search"
        class="mb-1"
      />
      <el-scrollbar v-if="$device.mobile" style="height: 5%;">
        <el-radio-group
          v-for="(item, idx) in memberTypeOptions"
          :key="idx"
          v-model="filterMember"
          style="margin-right: 5px;"
          size="mini"
        >
          <el-radio-button
            :label="item.value"
            :value="item.value"
            class="d-inline-block"
          >
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </el-scrollbar> -->
    </el-col>
  </el-row>
</template>

<script>
// import apiMember from '@/api/member';
import apiSelections from '@/api/selections';
import ElTitle from '@/components/basic/Title.vue';

export default {
  name: 'search',
  components: {
    ElTitle,
  },
  data() {
    return {
      search: '',
      filterMember: '0',
      memberTypeMap: {},
      member: {},
      searchItems: [
        {
          name: '會員資料',
          href: 'member',
          icon: 'la la-user',
        },
        {
          name: '運動資料',
          href: '',
          icon: 'las la-running',
        },
        {
          name: '消費資料',
          href: '',
          icon: 'las la-shopping-bag',
        },
        {
          name: '入場資料',
          href: '',
          icon: 'las la-sign-in-alt',
        },
      ],
    };
  },
  computed: {
    memberTypeOptions() {
      const options = Object.entries(this.memberTypeMap).map(e => ({ label: e[1], value: e[0] }));
      return [{ label: '全部', value: '0' }, ...options];
    },
  },
  // methods: {
  // },
  async created() {
    this.fullscreenLoading = true;
    const { data: { data: { memberTypeMap = {} } } } = await apiSelections.get();
    this.memberTypeMap = memberTypeMap;
    // const { data = null } = await apiMember.getByKey(
    //   'phone',
    //   { memberPhone: this.$route.params.id },
    // );
    // this.member = data.data;
  },
};
</script>
<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-scrollbar .el-scrollbar__wrap .el-scrollbar__view{
   white-space: nowrap;
}
.search .el-link--inner {
  width: 90%;
}
</style>
