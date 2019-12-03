<template>
  <el-row
    type="flex"
    :class="{
      'row-bg': true,
      'h-100': true
    }"
    justify="center"
    align="middle"
    v-loading.fullscreen.lock="fullscreenLoading"
  >
    <el-col
      v-if="Object.keys(member).length === 0"
      :sm="12"
      :md="12"
      :lg="6"
      :xl="6"
      class="text-center"
    >
      <div v-if="checkInType === 'LineUrl'" class="fullscreen">
        <!-- <el-alert
          v-show="error"
          :title="error"
          type="error"
        /> -->
        <QrcodeStream @decode="onDecode" @init="onInit" class="mb-1" />
      </div>
      <el-radio-group v-model="checkInType">
        <el-radio
          v-for="(item, idx) in searchType"
          :key="idx"
          :label="item.value"
          class="font-weight-bold"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
      <el-input
        v-show="checkInType !== 'LineUrl'"
        v-model="input"
        :type="inputType[checkInType].type"
        :placeholder="inputType[checkInType].placeholder"
        :pattern="inputType[checkInType].pattern"
        class="mt-2 input-lg"
      >
        <div slot="suffix">
          <el-button type="text" icon="el-icon-search" class="mr-1" @click="searchMember" />
        </div>
      </el-input>
      <el-alert
        v-show="error"
        :title="error"
        type="error"
        center
        class="mt-1"
      />
      <div class="mt-4">
        <el-link href="/member/create" type="info">建立會員</el-link>・
        <el-link href="/employee/create" type="info">建立員工</el-link>・
        <el-link href="/coach/create" type="info">建立場租教練</el-link>
      </div>
    </el-col>
    <el-col v-else :sm="12" :md="12" :lg="6" :xl="6">
      <h1 class="fs-2 font-weight-light">
          歡迎，{{ memberName }}
      </h1>
      <el-form
        v-loading="loading"
        :model="ruleForm"
        :rules="rules"
        status-icon
        ref="ruleForm"
        label-position="left"
      >
        <el-form-item label="入場類型" prop="checkType">
          <el-select v-model="ruleForm.checkType" placeholder="請選擇入場類型" class="w-100">
            <el-option
              v-for="(item, idx) in checkinTypeMap"
              :key="idx"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
          <el-button
            type="primary"
            class="w-100"
            @click="submitForm('ruleForm')"
          >
            進場 <i class="la la-sign-in-alt" />
          </el-button>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import apiMember from '@/api/member';
import apiSelections from '@/api/selections';
import mixinQRcodeReader from '@/mixins/qrCodeReader.vue';

export default {
  name: 'checkin',
  components: {
  },
  mixins: [mixinQRcodeReader],
  data() {
    return {
      loading: false,
      error: null,
      fullscreenLoading: false,
      selections: {},
      input: '0912345678',
      checkInType: 'Phone',
      searchType: [
        {
          label: '手機',
          value: 'Phone',
        },
        {
          label: 'LINE ID',
          value: 'LineId',
        },
        {
          label: 'QR Code',
          value: 'LineUrl',
        },
      ],
      member: {},
      ruleForm: {
        checkType: '',
      },
      rules: {
        checkType: [
          { required: true, message: '請輸入姓名', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    userTypeLabel() {
      return this.$route.meta.typeLabel;
    },
    checkinTypeMap() {
      return this.selections.checkinTypeMap;
    },
    inputType() {
      return {
        Phone: {
          type: 'text',
          placeholder: `請輸入${this.userTypeLabel}手機號碼搜尋`,
        },
        LineId: {
          type: 'text',
          placeholder: `請輸入${this.userTypeLabel}LINE ID搜尋`,
        },
        LineUrl: {
          type: 'text',
          placeholder: '',
        },
      };
    },
    memberName() {
      return this.member.memberName;
    },
  },
  methods: {
    async searchMember() {
      this.fullscreenLoading = true;
      const { data = null } = await apiMember.getByKey(this.checkInType.toLowerCase(), { [`member${this.checkInType}`]: this.input });
      if (data.data === null) {
        this.error = `查無此${this.userTypeLabel}，請確認資訊是否正確。`;
      } else {
        this.member = data.data;
      }
      this.fullscreenLoading = false;
      // this.$router.push({ path: `/member/checkin/${this.input}` });
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
  },
};
</script>
<style scoped>
</style>
