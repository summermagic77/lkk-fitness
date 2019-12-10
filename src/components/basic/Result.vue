<template>
  <div>
    <h1 class="mb-0">{{ memberName }}，{{ userTypeLabel }}{{ failureLabel }}</h1>
    <p class="text-black-50 mt-0 mb-3">
      {{ selections.memberTypeMap[memberType]  }}
    </p>
    <div v-if="pageType === 'checkin'">
      <div v-if="!failure">
        <p class="mb-0">
          本次消費
        </p>
        <span class="font-weight-bolder my-0 fs-3">
          {{ member.checkinCost }}
        </span>
        <span class="text-black-50 font-weight-light">點數/堂</span>
        <p class="font-weight-bold mt-1">
          {{ checkinTime }}
        </p>
      </div>
    </div>
    <div v-else-if="pageType === 'create'">
      {{ memberJoinTime }}
    </div>
    <el-alert
      v-if="failure"
      :title="member.message"
      type="error"
      show-icon>
    </el-alert>
    <div v-else-if="pageType === 'checkout'">
      {{ checkoutTime }}
    </div>
    <div class="text-center">
      <el-button
        @click="$router.push({ path: '/' })"
        :class="{
          'mt-3': !$device.mobile,
          'w-95': $device.mobile,
          'w-100': !$device.mobile,
          'fixed-bottom': $device.mobile
        }"
        :style="$device.mobile ? 'margin: 10px' : ''">
        回首頁
      </el-button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'b-result',
  data() {
    return {
      checkinSuccess: {
        member: '',
        checkinType: '',
        checkinCost: '',
        checkinTime: '',
      },
      checkinFailed: {
        member: '',
        checkinType: '',
        message: '',
      },
      checkoutSuccess: {
        member: '',
        checkoutTime: '',
      },
      checkoutFailed: {
        member: '',
        message: '',
      },
      cuSuccess: {
        memberName: '',
        memberType: '',
        memberJoinTime: '',
      },
      cuFailed: {
        memberName: '',
        message: '',
      },
    };
  },
  props: {
    member: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    failure: {
      type: Boolean,
      required: true,
      default: false,
    },
    selections: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  computed: {
    userTypeLabel() {
      return this.$route.name;
    },
    pageType() {
      return this.$route.meta.type;
    },
    failureLabel() {
      return this.failure ? '失敗' : '成功';
    },
    memberName() {
      return this.member.memberName || this.member.checkinMemberName;
    },
    memberType() {
      return this.member.memberType;
    },
    checkinTime() {
      return this.$moment(this.member.checkinTime).utc().format('YYYY-MM-DD, HH:mm A');
    },
    checkoutTime() {
      const { checkinList = [] } = this.member;
      const latest = checkinList.slice(-1).pop();
      const { checkoutTime = null } = latest;
      // console.dir(checkoutTime);
      return this.$moment(checkoutTime).utc().format('YYYY-MM-DD, HH:mm A');
    },
    // memberType() {
    //   return this.member.memberType;
    // },
    memberJoinTime() {
      return this.$moment(this.member.memberJoinTime).utc().format('YYYY-MM-DD, HH:mm A');
    },
  },
  methods: {
  },
  created() {
    console.dir(this.member);
  },
};
</script>
<style>
</style>
