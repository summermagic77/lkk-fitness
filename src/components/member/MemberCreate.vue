<template>
  <el-row
    type="flex"
    class="row-bg h-100"
    justify="center"
    align="middle"
  >
    <el-col :sm="12" :md="12" :lg="8" :xl="8">
      <el-steps :active="activeStep" align-center class="mb-1">
        <el-step title="基本資料" description="填寫會員資料" />
        <el-step title="入會資訊" description="填寫入會資訊" />
      </el-steps>
      <el-form
        v-loading="loading"
        :model="ruleForm"
        :rules="rules"
        status-icon
        ref="ruleForm"
        :label-position="activeStep === 1 ? 'top' : 'left'"
      >
        <div v-if="activeStep === 0">
          <el-form-item prop="memberName">
            <el-input v-model="ruleForm.memberName" placeholder="姓名" />
          </el-form-item>
          <el-form-item prop="memberSex">
            <el-radio-group v-model="ruleForm.memberSex" class="w-100">
              <el-row :gutter="10">
                <el-col
                  v-for="(item, idx) in sex"
                  :key="idx"
                  :span="8"
                >
                  <el-radio
                    border
                    class="w-100"
                    :label="item"
                  />
                </el-col>
              </el-row>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="memberBirthDate">
            <el-date-picker
              v-model="ruleForm.memberBirthDate"
              type="date"
              placeholder="選擇生日"
              class="w-100"
              :editable="false"
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item prop="memberPhone">
            <el-input v-model="ruleForm.memberPhone" placeholder="手機號碼" />
          </el-form-item>
          <el-form-item prop="memberMail">
            <el-input v-model="ruleForm.memberMail" placeholder="Email" />
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="會員類型" prop="memberType">
            <el-radio-group v-model="ruleForm.memberType" class="w-100">
              <el-row :gutter="10">
                <el-col
                  v-for="(item, idx) in memberType"
                  :key="idx"
                  :span="12"
                >
                  <el-radio
                    border
                    class="w-100"
                    :label="item"
                  />
                </el-col>
              </el-row>
            </el-radio-group>
          </el-form-item>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item label="加入日期" prop="memberJoinDate">
                <el-date-picker
                  v-model="ruleForm.memberJoinDate"
                  type="date"
                  placeholder="選擇加入日期"
                  class="w-100"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="生效日期" prop="memberEffectDate">
                <el-date-picker
                  v-model="ruleForm.memberEffectDate"
                  type="date"
                  placeholder="選擇生效日期"
                  class="w-100"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="10">
              <el-form-item label="會員點數" prop="memberPoint">
                <el-input-number
                  v-model="ruleForm.memberPoint"
                  :step="100"
                  placeholder="會員點數"
                  class="w-100"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="教練課" prop="memberLesson">
                <el-input-number
                  v-model="ruleForm.memberLesson"
                  :step="1"
                  placeholder="教練課堂"
                  class="w-100"
                />
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="物理治療次數" prop="memberTreat">
                <el-input-number
                  v-model="ruleForm.memberTreat"
                  :step="1"
                  placeholder="物理治療次數"
                  class="w-100"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-form-item>
          <!-- <div v-if="activeStep === 1"> -->
          <el-button
            v-if="activeStep === 0"
            type="primary"
            plain
            class="w-100"
            @click="firstStep('ruleForm')"
          >
            下一步
          </el-button>
          <!-- </div> -->
          <div v-else>
            <el-button @click="activeStep--">上一步</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" class="float-right">
              建立會員資料
            </el-button>
          </div>
          <!-- <el-button type="success" icon="el-icon-check" circle /> -->
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import apiSelections from '@/api/selections';

export default {
  data() {
    return {
      loading: true,
      activeStep: 1,
      selections: {},
      ruleForm: {
        memberName: 'Chiquitta',
        memberSex: '男性',
        memberPhone: '0987654321',
        memberMail: 'chiquitta.com@gmail.com',
        memberType: '一般會員',
        memberPoint: 0,
        memberLesson: 0,
        memberTreat: 0,
        memberBirthDate: new Date(),
        memberJoinDate: '',
        memberEffectDate: '',
      },
      rules: {
        memberName: [
          { required: true, message: '請輸入姓名', trigger: 'blur' },
        ],
        memberPhone: [
          { required: true, message: '請輸入手機', trigger: 'blur' },
        ],
        memberSex: [
          { required: true, message: '請選擇性別', trigger: 'change' },
        ],
        memberMail: [
          { required: true, message: '請輸入Email', trigger: 'blur' },
          { type: 'email', message: '請輸入正確的Email', trigger: ['blur', 'change'] },
        ],
        memberType: [
          { required: true, message: '請選擇類型', trigger: 'change' },
        ],
        memberPoint: [
          { required: true, message: '請輸入點數', trigger: 'change' },
        ],
        memberLesson: [
          { required: true, message: '請輸入點數', trigger: 'change' },
        ],
        memberTreat: [
          { required: true, message: '請輸入點數', trigger: 'change' },
        ],
        memberBirthDate: [
          {
            type: 'date',
            required: true,
            message: '請選擇生日',
            trigger: 'blur',
          },
        ],
        memberJoinDate: [
          {
            type: 'date',
            required: true,
            message: '請選擇加入日期',
            trigger: 'blur',
          },
        ],
        memberEffectDate: [
          {
            type: 'date',
            required: true,
            message: '請選擇生效日期',
            trigger: 'blur',
          },
        ],
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  computed: {
    sex() {
      return this.selections.sexMap;
    },
    memberType() {
      const { memberTypeMap = {} } = this.selections;
      return [
        memberTypeMap[Object.keys(memberTypeMap)[0]],
        memberTypeMap[Object.keys(memberTypeMap)[1]],
      ];
    },
  },
  methods: {
    firstStep(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.activeStep += 1;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.dir(valid);
        // if (valid) {
        //   console.dir('submit!');
        // } else {
        //   console.log('error submit!!');
        //   return false;
        // }
      });
    },
  },
  async created() {
    const { data } = await apiSelections.get();
    this.selections = data.data;
    this.loading = false;
    // const { sexMap } = data.data;
  },
};
</script>
