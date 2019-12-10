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
      <el-link href="/create" class="float-right mb-1">
        <i class="el-icon-plus" /> 建立新會員
      </el-link>
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
    <!-- <div v-else>
      <div class="text-right">
        <el-button type="text">
          過濾
        </el-button>
      </div>
      <el-input
        v-model="search"
        placeholder="請輸入姓名或電話"
        suffix-icon="el-icon-search"
        class="mb-1"
      />
      <div
        v-loading="loading"
        v-infinite-scroll="load"
        infinite-scroll-disabled="disabled"
        style="overflow:auto"
      >
        <el-card
          v-for="(item, idx) in tableData"
          :key="idx"
          :body-style="{ padding: '5px' }"
          shadow="hover"
          style="margin-bottom: 5px;"
        >
          <div class="d-flex">
            <p class="font-weight-bold">
              {{ item.memberName }}
            </p>
            <el-link
              :href="`/member/${item.memberPhone}`"
              size="small"
              class="ml-auto"
            >
              編輯
          </el-link>
          </div>
          <p class="text-black-50 my-0">
            {{ memberTypeMap[item.memberType] }}
          </p>
        </el-card>
      </div>
    </div> -->
    </el-row>
</template>

<script>
// import FilterOutline from 'vue-material-design-icons/FilterOutline.vue';
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
    // noMore() {
    //   return this.count >= this.total - 1;
    // },
    // disabled() {
    //   return this.loading || this.noMore;
    // },
    // sex() {
    //   return this.selections.sexMap || {};
    // },
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loadMoreData();
      }, 0);
    },
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
    // loadMoreData() {
    //   this.tableData.push(this.lists[this.count - 1]);
    //   if (!this.noMore) {
    //     this.tableData.push(this.lists[this.count]);
    //   }
    //   this.loading = false;
    // },
    async getTableData() {
      const { data: { data = {} } } = await apiMember.getByType('1+2+3+4+5+6+7+8+9');
      this.lists = data;
      this.total = data.length;
      this.tableData = data.slice(0, this.pageSize);
      this.loading = false;
    },
    // formatterSex(row, { property }) {
    //   return this.sex[row[property]];
    // },
    // formatterDate(row, { property }) {
    //   return this.$moment(row[property]).format('YYYY-MM-DD');
    // },
    // formatterDateTime(row, { property }) {
    //   return this.$moment(row[property]).format('YYYY-MM-DD, HH:mm A');
    // },
    // formatterPrice(row, { property }) {
    //   return row[property].toLocaleString();
    // },
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
