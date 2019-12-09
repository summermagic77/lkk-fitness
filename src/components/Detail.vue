<template>
  <el-row
    type="flex"
    class="row-bg h-100"
    justify="center"
    align="middle"
    v-loading.fullscreen.lock="fullscreenLoading"
  >
    <el-col v-if="!fullscreenLoading" :sm="12" :md="12" :lg="8" :xl="8">
      <!-- {{ member }} -->
      <small class="text-black-50">
        姓名
      </small>
      <p class="mt-0 font-weight-bold">
        {{ name }}
      </p>
      <small class="text-black-50">
        手機
      </small>
      <p class="mt-0 font-weight-bold">
        {{ phone }}
      </p>
      <small class="text-black-50">
        Email
      </small>
      <p class="mt-0 font-weight-bold">
        {{ email }}
      </p>
      <small class="text-black-50">
        加入日期
      </small>
      <p class="mt-0 font-weight-bold">
        {{ join_date }}
      </p>
    </el-col>
  </el-row>
</template>

<script>
import apiMember from '@/api/member';
// import apiSelections from '@/api/selections';

export default {
  name: 'detail',
  components: {
  },
  data() {
    return {
      fullscreenLoading: false,
      selections: {},
      member: {},
    };
  },
  computed: {
    name() {
      return this.member.memberName;
    },
    phone() {
      return this.member.memberPhone;
    },
    email() {
      return this.member.memberMail;
    },
    join_date() {
      return this.$moment(this.member.memberJoinDate).format('YYYY-MM-DD');
    },
  },
  // methods: {
  // },
  async created() {
    // const { data } = await apiSelections.get();
    // this.selections = data.data;
    this.fullscreenLoading = true;
    const { data = null } = await apiMember.getByKey(
      'phone',
      { memberPhone: this.$route.params.id },
    );
    this.member = data.data;
    this.fullscreenLoading = false;
  },
};
</script>
<style scoped>
</style>
