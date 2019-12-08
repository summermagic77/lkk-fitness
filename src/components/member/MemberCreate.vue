<template>
  <div>
    <el-form-item label="會員點數" prop="memberPoint">
      <el-input-number
        v-model="ruleForm.memberPoint"
        :step="100"
        placeholder="點數"
        class="w-100"
      />
    </el-form-item>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="私人課程" prop="memberLesson">
          <el-input-number
            v-model="ruleForm.memberLesson"
            :step="1"
            placeholder="堂數"
            class="w-100"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="治療課" prop="memberTreat">
          <el-input-number
            v-model="ruleForm.memberTreat"
            :step="1"
            placeholder="堂數"
            class="w-100"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-form-item label="加入日期" prop="memberJoinDate">
          <el-date-picker
            v-model="ruleForm.memberJoinDate"
            type="date"
            placeholder="選擇加入日期"
            :editable="false"
            class="w-100"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="月費到期日" prop="memberEffectDate">
          <el-date-picker
            v-model="ruleForm.memberEffectDate"
            type="date"
            placeholder="月費到期日"
            class="w-100"
            :editable="false"
            :picker-options="pickerDisableAfter"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import apiSelections from '@/api/selections';
// import mixinQRcodeReader from '@/mixins/qrCodeReader.vue';

export default {
  props: {
    ruleForm: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // pickerDisableBefore: {
      //   disabledDate(time) {
      //     return time.getTime() > Date.now();
      //   },
      // },
      pickerDisableAfter: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>
