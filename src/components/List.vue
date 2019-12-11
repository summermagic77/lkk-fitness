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
      <!-- <el-link href="/create" class="float-right mb-1">
        <i class="el-icon-plus" /> 加入
      </el-link> -->
      <div>
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          class="w-100">
          <el-table-column
            v-if="!$device.mobile"
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="memberName"
            label="姓名">
            <template slot-scope="scope">
              <b class="text-brand">{{ scope.row.memberName }}</b>
            </template>
          </el-table-column>
          <el-table-column
            prop="memberType"
            label="類型"
            :formatter="formatterType">
          </el-table-column>
          <el-table-column
            prop="memberPhone"
            label="電話">
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
              @click="handleEdit(scope.row)">編輯</el-button>
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
            class="mt-2"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import apiMember from '@/api/member';
import apiSelections from '@/api/selections';

export default {
  components: {
    // FilterOutline,
  },
  data() {
    return {
      loading: true,
      count: 0,
      pageSize: 10,
      total: 0,
      currentPage: 1,
      search: '',
      lists: [],
      tableData: [],
      memberTypeMap: {},
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
    handleClick(row) {
      this.$router.push({ path: `/member/${row.memberPhone}` });
    },
    handleEdit({ memberPhone }) {
      this.$router.push({ path: `/member/${memberPhone}` });
    },
    handleCurrentChange(val) {
      this.loading = true;
      this.tableData = this.lists.slice((val - 1) * this.pageSize, val * this.pageSize);
      setTimeout(() => { this.loading = false; }, 300);
    },
    async getTableData() {
      const { data: { data = {} } } = await apiMember.getByType(this.pageType);
      this.lists = data;
      this.total = data.length;
      this.tableData = data.slice(0, this.pageSize);
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
