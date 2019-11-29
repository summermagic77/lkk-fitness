<template>
  <div>
    <el-table
      v-if="!$device.mobile"
      :data="tableData"
      stripe
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
        label="性別">
      </el-table-column>
      <el-table-column
        prop="memberType"
        label="等級">
      </el-table-column>
      <el-table-column
        prop="memberPoint"
        label="點數">
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
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">編輯</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      <div v-infinite-scroll="load" style="overflow:auto">
        <el-card
          v-for="(item, idx) in tableData"
          :key="idx"
          :body-style="{ padding: '5px', display: 'flex' }"
          shadow="always"
        >
          <p>
            {{ item.memberName }}
          </p>
          <el-button type="text" size="small" class="ml-auto">編輯</el-button>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
// import FilterOutline from 'vue-material-design-icons/FilterOutline.vue';
import apiMember from '@/api/member';

export default {
  components: {
    // FilterOutline,
  },
  data() {
    return {
      search: '',
      tableData: [],
      // tableData: [{
      //   phone: '0935-879-382',
      //   name: 'Hsia',
      //   birthdate: '2016-05-02',
      //   join_date: '2016-05-02',
      //   sex: 'male',
      //   level: '1',
      //   point: 1000,
      // }],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    load() {
      console.log('load');
    },
    handleClick(row) {
      console.log(row);
    },
    async getTableData() {
      const { data } = await apiMember.getAll();
      this.tableData = data.data;
    },
    formatterDate(row, { property }) {
      return this.$moment(row[property]).format('YYYY-MM-DD');
    },
  },
  created() {
    this.getTableData();
  },
};
</script>
