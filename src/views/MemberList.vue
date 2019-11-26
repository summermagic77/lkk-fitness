<template>
  <el-table
    :data="tableData"
    stripe
    border
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
  </el-table>
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
  },
};
</script>
