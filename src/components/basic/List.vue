<template>
  <div>
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      class="w-100">
      <el-table-column
        v-for="(item, idx) in columns"
        :key="idx"
        :label="item.label"
        :prop="item.prop"
        :formatter="item.formatter"
        >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click="handleEdit(scope.row)">
            編輯
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="text-center">
      <el-pagination
        v-if="$device.mobile"
        background
        class="mt-2"
        :pager-count="5"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        layout="total, prev, next, jumper"
        :total="total">
      </el-pagination>
      <el-pagination
        v-else
        background
        class="mt-1"
        :page-size="pageSize"
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
// import apiMember from '@/api/member';
// import apiSelections from '@/api/selections';

export default {
  props: {
    datas: {
      type: Array,
      required: true,
      default: () => [],
    },
    columns: {
      type: Array,
      required: true,
      default: () => [],
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // loading: false,
      count: 0,
      // pageSize: 10,
      // total: 0,
      currentPage: 1,
      search: '',
      // lists: [],
      tableData: [],
      // memberTypeMap: {},
    };
  },
  computed: {
    total() {
      return this.datas.length;
    },
  },
  methods: {
    handleCurrentChange(val) {
      // this.loading = true;
      this.$emit('update:loading', true);
      this.tableData = this.datas.slice((val - 1) * this.pageSize, val * this.pageSize);
      setTimeout(() => { this.$emit('update:loading', false); }, 300);
    },
    handleEdit({ memberPhone }) {
      this.$router.push({ path: `/member/${memberPhone}` });
    },
    // async getTableData() {
    //   const { data: { data = {} } } = await apiMember.getByType(this.pageType);
    //   this.lists = data;
    //   this.total = data.length;
    //   this.tableData = data.slice(0, this.pageSize);
    //   this.loading = false;
    // },
  },
  watch: {
    datas: {
      immediate: true,
      handler(val) {
        this.tableData = val.slice(0, this.pageSize);
      },
    },
  },
};
</script>
