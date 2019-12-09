<template>
  <div>
    <el-link href="/create" class="float-right mb-2">
      <i class="el-icon-plus" /> 建立新會員
    </el-link>
    <div v-if="!$device.mobile">
      <el-table
        v-loading="loading"
        :data="lists"
        empty-text="暫無數據"
        stripe
        border
        class="w-100">
        <el-table-column
          prop="memberName"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="memberPhone"
          label="電話">
        </el-table-column>
        <el-table-column
          prop="memberSex"
          label="性別"
          :formatter="formatterSex">
        </el-table-column>
        <el-table-column
          prop="memberType"
          label="等級">
        </el-table-column>
        <el-table-column
          prop="memberPoint"
          label="點數"
          :formatter="formatterPrice">
        </el-table-column>
        <el-table-column
          prop="memberBirthDate"
          label="生日"
          :formatter="formatterDate">
        </el-table-column>
        <el-table-column
          prop="memberJoinDate"
          label="加入時間"
          :formatter="formatterDate">
        </el-table-column>
        <el-table-column
          prop="memberCheckDate"
          label="最近打卡時間"
          :formatter="formatterDate">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-link
              :href="`/member/${scope.row.memberPhone}`"
              size="small"
              class="ml-auto"
            >
              查看
          </el-link>
            <!-- <el-button type="text" size="small">編輯</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="text-center block">
        <el-pagination
          background
          class="mt-2"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <div v-else>
      <!-- <div class="text-right">
        <el-button type="text">
          過濾
        </el-button>
      </div> -->
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
    </div>
  </div>
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
      search: '',
      lists: [],
      tableData: [],
      selections: {},
    };
  },
  computed: {
    noMore() {
      return this.count >= this.total - 1;
    },
    disabled() {
      return this.loading || this.noMore;
    },
    sex() {
      return this.selections.sexMap || {};
    },
    total() {
      return this.lists.length;
    },
    memberTypeMap() {
      return this.selections.memberTypeMap;
    },
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loadMoreData();
      }, 2000);
    },
    handleClick(row) {
      console.log(row);
    },
    loadMoreData() {
      this.tableData.push(this.lists[this.count - 1]);
      if (!this.noMore) {
        this.tableData.push(this.lists[this.count]);
      }
      this.loading = false;
    },
    async getTableData() {
      const { data } = await apiMember.getByType('1+2+3+4+5+6+7+8+9');
      const [first, second] = data.data;
      this.tableData = [first, second];
      this.lists = data.data;
      this.loading = false;
    },
    formatterSex(row, { property }) {
      return this.sex[row[property]];
    },
    formatterDate(row, { property }) {
      return this.$moment(row[property]).format('YYYY-MM-DD');
    },
    formatterPrice(row, { property }) {
      return row[property].toLocaleString();
    },
  },
  async created() {
    this.getTableData();
    const { data } = await apiSelections.get();
    this.selections = data.data;
  },
};
</script>
