<template>
  <el-row
    type="flex"
    class="row-bg h-100"
    justify="center"
    align="middle"
  >
    <el-col v-if="Object.keys(member).length === 0" :sm="12" :md="12" :lg="8" :xl="8">
      <el-steps :active="activeStep" align-center class="mb-1">
        <!-- <el-step title="類型" description="" /> -->
        <el-step title="基本資料" description="" />
        <el-step title="詳細資訊" description="" />
      </el-steps>
      <el-form
        v-loading="loading"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        :label-position="activeStep === 1 ? 'top' : 'left'"
        >
        <div v-if="activeStep === 0">
          <el-form-item
            prop="memberType"
          >
            <el-select v-model="ruleForm.memberType" placeholder="請選擇加入類型" class="w-100">
              <el-option
                v-for="(item, idx) in memberTypeOptions"
                :key="idx"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="memberName">
            <el-input v-model="ruleForm.memberName" placeholder="姓名" />
          </el-form-item>
          <el-form-item prop="memberSex">
            <el-radio-group v-model="ruleForm.memberSex" class="w-100">
              <el-row :gutter="10">
                <el-col
                  v-for="(item, idx) in sexOptions"
                  :key="idx"
                  :span="8"
                >
                  <el-radio border class="w-100" :label="item.value">
                    {{ item.label }}
                  </el-radio>
                </el-col>
              </el-row>
            </el-radio-group>
          </el-form-item>
          <el-row :gutter="10">
            <el-col :span="12">
              <el-form-item prop="memberBirthDate">
                <el-date-picker
                  v-model="ruleForm.memberBirthDate"
                  type="date"
                  placeholder="選擇生日"
                  class="w-100"
                  :editable="false"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="memberPhone">
                <el-input v-model="ruleForm.memberPhone" placeholder="手機號碼" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="21">
              <el-form-item prop="memberLineId">
                <el-input v-model="ruleForm.memberLineId" placeholder="LINE ID">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item prop="memberLineUrl" class="qrcode mb-0">
                <i
                  :class="{
                    'la': true,
                    'la-qrcode': true,
                    'fs-3': true,
                    'text-info': !ruleForm.memberLineUrl,
                    'text-success': ruleForm.memberLineUrl,
                    'text-danger': errors.memberLineUrl,
                  }"
                  @click="openFullScreenScanner"
                />
                <el-input
                  v-model="ruleForm.memberLineUrl"
                  style="display: none;"
                />
                <div
                  v-if="fullscreen"
                  :class="{ 'fullscreen': fullscreen }"
                  ref="wrapper"
                >
                  <QrcodeStream
                    @decode="onDecode"
                    @init="logErrors"
                    class="mb-1"
                  >
                    <i
                      @click="closeFullScreenScanner"
                      class="las la-compress-arrows-alt text-white ml-1 mt-1 fs-2"
                    />
                  </QrcodeStream>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item prop="memberMail">
            <el-input v-model="ruleForm.memberMail" placeholder="Email" />
          </el-form-item>
        </div>
        <MemberCreate
          v-else
          :ruleForm.sync="ruleForm"
        />
        <el-form-item class="mt-2">
          <el-button
            v-if="[1].includes(activeStep)"
            @click="activeStep--"
            plain
          >
            上一步
          </el-button>
          <el-button
            v-if="[0].includes(activeStep)"
            type="primary"
            :class="{
              'w-100': activeStep === 0,
              'float-right': activeStep === 1,
            }"
            @click="firstStep('ruleForm')"
          >
            下一步
            <!-- <i class="el-icon-right el-icon--right"></i> -->
          </el-button>
          <el-button
            v-if="activeStep === 1"
            type="primary"
            @click.stop="submitForm('ruleForm')"
            class="float-right"
          >
            {{ saveBtnLabel }}資料
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col v-else :sm="12" :md="12" :lg="6" :xl="6">
      <el-result :member="member" :selections="selections" :failure="failure" />
    </el-col>
  </el-row>
</template>

<script>
import apiMember from '@/api/member';
import MemberCreate from '@/components/member/MemberCreate.vue';
import apiSelections from '@/api/selections';
import ElResult from '@/components/basic/Result.vue';
import mixinQRcodeReader from '@/mixins/qrCodeReader.vue';

export default {
  components: {
    MemberCreate,
    ElResult,
  },
  mixins: [mixinQRcodeReader],
  data() {
    return {
      loading: true,
      failure: false,
      member: {},
      activeStep: 0,
      selections: {},
      errors: {
        memberLineUrl: null,
      },
      ruleForm: {
        memberName: '',
        memberSex: '',
        memberPhone: '',
        memberLineId: '',
        memberLineUrl: '',
        memberMail: '',
        memberType: '',
        memberPoint: '0',
        memberLesson: '0',
        memberTreat: '0',
        memberBirthDate: '',
        memberJoinDate: new Date(),
        // memberEffectDate: new Date().setMonth(new Date().getMonth() + 1),
        memberEffectDate: '',
      },
      rules: {
        memberName: [
          { required: true, message: '請輸入姓名', trigger: 'blur' },
        ],
        memberPhone: [
          {
            required: true,
            message: '請輸入手機',
            trigger: 'blur',
          },
        ],
        memberSex: [
          { required: true, message: '請選擇性別', trigger: 'change' },
        ],
        // memberLineId: [
        //   { required: true, message: '請輸入LINE ID', trigger: 'blur' },
        // ],
        // memberLineUrl: [
        //   { required: true, message: '請掃碼', trigger: 'change' },
        // ],
        memberMail: [
          { required: true, message: '請輸入Email', trigger: 'blur' },
          { type: 'email', message: '請輸入正確的Email', trigger: ['blur', 'change'] },
        ],
        memberType: [
          { required: true, message: '請選擇類型', trigger: 'change' },
        ],
        memberPoint: [
          {
            type: 'integer',
            required: true,
            message: '請輸入點數',
            trigger: ['blur', 'change'],
          },
        ],
        memberLesson: [
          {
            type: 'integer',
            required: true,
            message: '請輸入堂數',
            trigger: ['blur', 'change'],
          },
        ],
        memberTreat: [
          {
            type: 'integer',
            required: true,
            message: '請輸入堂數',
            trigger: ['blur', 'change'],
          },
        ],
        memberBirthDate: [
          {
            // type: 'date',
            required: true,
            message: '請選擇生日',
            trigger: 'blur',
          },
        ],
        memberJoinDate: [
          {
            // type: 'date',
            required: true,
            message: '請選擇加入日期',
            trigger: 'blur',
          },
        ],
        memberEffectDate: [
          {
            // type: 'date',
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
    sexOptions() {
      const { sexMap = {} } = this.selections;
      return Object.entries(sexMap).map(e => ({ label: e[1], value: Number(e[0]) }));
    },
    memberTypeOptions() {
      const { memberTypeMap = {} } = this.selections;
      return Object.entries(memberTypeMap).map(e => ({ label: e[1], value: Number(e[0]) }));
    },
    saveBtnLabel() {
      return this.$route.name;
    },
  },
  methods: {
    closeFullScreenScanner() {
      this.fullscreen = false;
      // this.checkInType = 'Phone';
    },
    openFullScreenScanner() {
      this.fullscreen = true;
      // this.checkInType = 'LineUrl';
    },
    firstStep(formName) {
      this.$refs[formName].validate((valid, { memberLineUrl }) => {
        if (memberLineUrl) {
          this.errors.memberLineUrl = true;
        }
        if (valid) {
          this.activeStep += 1;
        }
      });
    },
    async saveMember() {
      this.fullscreenLoading = true;
      let api = 'saveMember';
      if (this.$route.params.id) {
        api = 'updateMember';
      }
      const { data: { data = {}, code, message } } = await apiMember[api](this.ruleForm);
      if (code !== 0) {
        this.failure = true;
        // this.$message({
        //   showClose: true,
        //   message,
        //   type: 'error',
        // });
        console.dir(data);
      }
      this.member = { ...{ memberName: this.memberName, message }, ...data };
      this.fullscreenLoading = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveMember();
        }
      });
    },
  },
  async created() {
    const { data: { data = {} } } = await apiSelections.get();
    this.selections = data;

    if (this.$route.params.id) {
      const info = await apiMember.getByKey(
        'phone',
        { memberPhone: this.$route.params.id },
      );
      this.ruleForm = info.data.data;
    }

    this.loading = false;
  },
};
</script>
<style>
.qrcode div.el-form-item__content {
  line-height: 0px !important;
}
</style>
