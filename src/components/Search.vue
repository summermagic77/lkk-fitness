<template>
  <el-row
    type="flex"
    class="row-bg h-100"
    justify="center"
    align="middle"
  >
    <el-col :sm="12" :md="12" :lg="8" :xl="8">
      <el-input
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
            type="primary"
            class="d-inline-block"
          >
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </el-scrollbar>
    </el-col>
  </el-row>
</template>

<script>
// import apiMember from '@/api/member';
import apiSelections from '@/api/selections';

export default {
  name: 'search',
  components: {
  },
  data() {
    return {
      search: '',
      filterMember: '0',
      memberTypeMap: {},
      member: {},
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
</style>
