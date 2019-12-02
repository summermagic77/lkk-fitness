<template>
  <el-row
    type="flex"
    class="row-bg h-100"
    justify="center"
    align="middle"
  >
    <el-col :sm="12" :md="12" :lg="8" :xl="8">
      <el-steps :active="activeStep" align-center class="mb-1">
        <el-step title="基本資料" description="員工資料" />
        <!-- <el-step title="聯絡方式" description="員工聯絡方式" /> -->
        <el-step title="人事資料" description="" />
      </el-steps>
      <el-form
        v-loading="loading"
        :model="ruleForm"
        :rules="rules"
        status-icon
        ref="ruleForm"
        :label-position="activeStep === 2 ? 'top' : 'left'"
      >
        <div v-if="activeStep === 0">
          <el-form-item prop="name">
            <el-input v-model="ruleForm.name" placeholder="姓名" />
          </el-form-item>
          <!-- <el-form-item prop="engName">
            <el-input v-model="ruleForm.engName" placeholder="英文名字" />
          </el-form-item> -->
          <el-form-item prop="sex">
            <el-radio-group v-model="ruleForm.sex" class="w-100">
              <el-radio
                v-for="(item, idx) in sex"
                :key="idx"
                border
                :label="item"
                class="w-25"
              />
              <!-- <el-radio border label="女" class="float-right radio-half" /> -->
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item prop="idNumber">
            <el-input v-model="ruleForm.idNumber" placeholder="身分證號" />
          </el-form-item> -->
          <el-form-item prop="birthdate">
            <el-date-picker
              v-model="ruleForm.birthdate"
              type="date"
              placeholder="出生日期"
              class="w-100"
              :editable="false"
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="手機號碼" />
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="ruleForm.email" placeholder="Email" />
          </el-form-item>
        </div>
          <!-- <el-form-item prop="tel">
            <el-input v-model="ruleForm.tel" placeholder="電話號碼" />
          </el-form-item> -->
          <!-- <el-form-item prop="household">
            <el-input v-model="ruleForm.household" placeholder="戶籍地址" />
          </el-form-item>
          <el-form-item prop="address">
            <el-input v-model="ruleForm.address" placeholder="通訊地址" />
          </el-form-item> -->
        <div v-else>
          <el-form-item prop="memberType">
            <el-select v-model="ruleForm.memberType" placeholder="員工類型" class="w-100">
              <el-option
                v-for="item in memberType"
                :key="item.value"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="join_date">
            <el-date-picker
              v-model="ruleForm.join_date"
              type="date"
              placeholder="到職日期"
              :editable="false"
              class="w-100"
            />
          </el-form-item>
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
          <!-- <div v-else-if="activeStep === 1">
            <el-button @click="activeStep--">上一步</el-button>
            <el-button
              type="primary"
              plain
              class="float-right"
              @click="firstStep('ruleForm')"
            >
              下一步
            </el-button>
          </div> -->
          <div v-else>
            <el-button @click="activeStep--">上一步</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" class="float-right">
              建立員工資料
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
      activeStep: 0,
      selections: {},
      ruleForm: {
        memberName: '林小姐',
        // engName: 'Chiquitta',
        memberSex: '女性',
        // idNumber: 'A123456789',
        // tel: '0229220123',
        memberPhone: '0987654321',
        memberMail: 'chiquitta.com@gmail.com',
        // memberType: '編制人員',
        // point: 0,
        birthdate: new Date(),
        join_date: '',
      },
      rules: {
        name: [
          { required: true, message: '請輸入姓名', trigger: 'blur' },
        ],
        // engName: [
        //   { required: true, message: '請輸入姓名', trigger: 'blur' },
        // ],
        // tel: [
        //   { required: true, message: '請輸入手機', trigger: 'blur' },
        // ],
        phone: [
          { required: true, message: '請輸入手機', trigger: 'blur' },
        ],
        sex: [
          { required: true, message: '請選擇性別', trigger: 'change' },
        ],
        email: [
          { required: true, message: '請輸入Email', trigger: 'blur' },
          { type: 'email', message: '請輸入正確的Email', trigger: ['blur', 'change'] },
        ],
        memberType: [
          {
            required: true,
            message: '請選擇類型',
            trigger: 'change',
          },
        ],
        // point: [
        //   { required: true, message: '請輸入點數', trigger: 'change' },
        // ],
        birthdate: [
          {
            type: 'date',
            required: true,
            message: '請選擇生日',
            trigger: 'blur',
          },
        ],
        join_date: [
          {
            type: 'date',
            required: true,
            message: '請選擇加入日期',
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
        memberTypeMap[Object.keys(memberTypeMap)[4]],
        memberTypeMap[Object.keys(memberTypeMap)[5]],
        memberTypeMap[Object.keys(memberTypeMap)[6]],
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
