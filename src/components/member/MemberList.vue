<template>
  <div>
    <el-table
      v-if="!$device.mobile"
      :data="tableData"
      stripe
      class="w-100">
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="電話">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性別">
      </el-table-column>
      <el-table-column
        prop="level"
        label="等級">
      </el-table-column>
      <el-table-column
        prop="point"
        label="點數">
      </el-table-column>
      <el-table-column
        prop="birthdate"
        label="生日">
      </el-table-column>
      <el-table-column
        prop="join_date"
        label="加入時間">
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
    <div v-infinite-scroll="load" style="overflow:auto">
      <el-card
        v-for="(item, idx) in tableData"
        :key="idx"
        :body-style="{ padding: '5px', display: 'flex' }"
        shadow="always"
      >
        <p>
          {{ item.name }}
        </p>
        <el-button type="text" size="small" class="ml-auto">編輯</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
        phone: '0935-879-382',
        name: 'Hsia',
        birthdate: '2016-05-02',
        join_date: '2016-05-02',
        sex: 'male',
        level: '1',
        point: 1000,
      }],
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
  },
};
</script>
