<template>
  <el-row
    :gutter="20"
    type="flex"
    class="row-bg"
    justify="center"
    align="middle"
  >
    <el-col :span="12" class="text-center">
      <el-radio-group v-model="type">
        <el-radio
          v-for="(item, idx) in searchType"
          :key="idx"
          :label="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
      <el-input
        v-model="input"
        :type="inputType[type].type"
        :placeholder="inputType[type].placeholder"
        :pattern="inputType[type].pattern"
        class="mt-2"
        suffix-icon="el-icon-search"
      />
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      type: 'phone',
      inputType: {
        phone: {
          type: 'text',
          placeholder: '請輸入會員手機號碼進行搜尋',
        },
        name: {
          type: 'text',
          placeholder: '請輸入會員姓名進行搜尋',
        },
      },
      searchType: [
        {
          label: '手機',
          value: 'phone',
        },
        {
          label: '姓名',
          value: 'name',
        },
        {
          label: 'QR Code',
          value: 'qrcode',
        },
      ],
    };
  },
  methods: {
  },
};
</script>
