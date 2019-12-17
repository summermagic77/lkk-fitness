<template>
  <el-row
    type="flex"
    :class="{
      'h-100': false,
    }"
    justify="center"
    align="middle"
  >
    <el-col :sm="24" :md="24" :lg="24" :xl="24">
      <el-list
        :loading="loading"
        :datas="lists"
        :columns="columns">
      </el-list>
    </el-col>
  </el-row>
</template>

<script>
import apiMember from '@/api/member';
import apiSelections from '@/api/selections';
import ElList from '@/components/basic/List.vue';

export default {
  components: {
    ElList,
  },
  data() {
    return {
      loading: false,
      count: 0,
      pageSize: 10,
      total: 0,
      currentPage: 1,
      search: '',
      lists: [],
      tableData: [],
      memberTypeMap: {},
      columns: [
        {
          prop: 'memberName',
          label: '姓名',
        },
        {
          prop: 'memberType',
          label: '類型',
          formatter: this.formatterType,
        },
        {
          prop: 'memberPhone',
          label: '手機',
        },
      ],
    };
  },
  computed: {
    pageType() {
      const { type } = this.$route.meta;
      let types = '1+2';
      if (type === 'employee') {
        types = '5+6+7';
      } else if (type === 'coach') {
        types = '3+4';
      }
      return types;
    },
  },
  methods: {
    async getTableData() {
      this.loading = true;
      const { data: { data = {} } } = await apiMember.getByType(this.pageType);
      this.lists = data;
      this.loading = false;
    },
    formatterType(row, { property }) {
      return this.memberTypeMap[row[property]];
    },
  },
  async created() {
    this.getTableData();
    const { data: { data: { memberTypeMap } } } = await apiSelections.get();
    this.memberTypeMap = memberTypeMap;
  },
};
</script>
