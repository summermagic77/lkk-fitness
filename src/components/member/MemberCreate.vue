<template>
  <el-row
    :type="$device.mobile ? '' : 'flex'"
    class="row-bg"
    justify="center"
    align="middle"
  >
    <el-col :sm="12" :md="12" :lg="8" :xl="8">
      <h1 class="mb-0">
        建立新會員
      </h1>
      <p class="text-black-50 mb-1">
        填寫完整會員資料
      </p>
      <el-form
        :model="ruleForm"
        :rules="rules"
        status-icon
        ref="ruleForm"
      >
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" placeholder="姓名" />
        </el-form-item>
        <el-form-item prop="sex">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio border label="男" />
            <el-radio border label="女" />
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="手機號碼" />
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="ruleForm.email" placeholder="Email" />
        </el-form-item>
        <el-form-item label="點數" prop="point">
          <el-input-number v-model="ruleForm.point" :step="100" />
        </el-form-item>
        <el-form-item label="加入日期" prop="join_date">
          <el-date-picker
            v-model="ruleForm.join_date"
            type="date"
            placeholder="選擇加入日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="w-100" @click="submitForm('ruleForm')">建立會員資料</el-button>
          <!-- <el-button type="success" icon="el-icon-check" circle /> -->
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        sex: '男',
        email: '',
        point: 100,
        join_date: new Date(),
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
        join_date: [
          { required: true, message: '請選擇加入日期', trigger: 'change' },
        ],
      },
    };
  },
  methods: {
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
