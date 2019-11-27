<template>
  <el-row
    :type="$device.mobile ? '' : 'flex'"
    class="row-bg"
    justify="center"
    align="middle"
  >
    <el-col :sm="12" :md="12" :lg="8" :xl="8">
      <h1 class="mb-0 fs-2 font-weight-light">
        林小姐
      </h1>
      <p class="text-black-50 mb-1">
        普通會員
      </p>
      <!-- <el-form
        :model="ruleForm"
        :rules="rules"
        status-icon
        ref="ruleForm"
        :label-position="activeStep === 2 ? 'top' : 'left'"
      >
        <div v-if="activeStep === 1">
          <el-form-item prop="name">
            <el-input v-model="ruleForm.name" placeholder="姓名" />
          </el-form-item>
          <el-form-item prop="sex">
            <el-radio-group v-model="ruleForm.sex" class="w-100">
              <el-radio border label="男" class="radio-half" />
              <el-radio border label="女" class="float-right radio-half" />
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="birthdate">
            <el-date-picker
              v-model="ruleForm.birthdate"
              type="date"
              placeholder="選擇生日"
              class="w-100"
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
        <div v-else>
          <el-form-item label="會員等級" prop="level">
            <el-radio-group v-model="ruleForm.level" class="w-100">
              <el-radio border label="計次" class="radio-half" />
              <el-radio border label="月費" class="float-right radio-half" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="會員點數" prop="point">
            <el-input-number
              v-model="ruleForm.point"
              :step="100"
              placeholder="會員點數"
              class="w-100"
            />
          </el-form-item>
          <el-form-item label="加入日期" prop="join_date">
            <el-date-picker
              v-model="ruleForm.join_date"
              type="date"
              placeholder="選擇加入日期"
              class="w-100"
            />
          </el-form-item>
        </div>
        <el-form-item>
          <el-button
            v-if="activeStep === 1"
            type="primary"
            plain
            class="w-100"
            @click="firstStep('ruleForm')"
          >
            下一步
          </el-button>
          <div v-else>
            <el-button @click="activeStep--">上一步</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')" class="float-right">
              建立會員資料
            </el-button>
          </div>
        </el-form-item>
      </el-form> -->
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      activeStep: 1,
      ruleForm: {
        name: 'Chiquitta',
        sex: '女',
        phone: '0987654321',
        email: 'chiquitta.com@gmail.com',
        // point: 0,
        birthdate: new Date(),
        join_date: '',
      },
      rules: {
        name: [
          { required: true, message: '請輸入姓名', trigger: 'blur' },
        ],
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
        point: [
          { required: true, message: '請輸入點數', trigger: 'change' },
        ],
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
};
</script>
