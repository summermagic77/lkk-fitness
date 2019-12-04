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
    >
      <!-- <div v-if="fullscreen" class="fullscreen">
        <QrcodeStream @decode="onDecode" @init="onInit" class="mb-1" /> -->
      <div
        v-if="fullscreen"
        :class="{ 'fullscreen': fullscreen }"
        ref="wrapper"
        @fullscreenchange="onFullscreenChange"
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
      <div class="text-center">
        <el-image
          v-if="$device.mobile"
          style="height: 50px;"
          :src="require('@/assets/lkk-logo.png')"
          fit="contain"
          class="mb-4"
        />
        <el-radio-group v-model="checkInType" class="w-100">
          <el-row :gutter="10">
            <el-col
              v-for="(item, idx) in searchType"
              :key="idx"
              :span="12"
            >
              <el-radio
                :label="item.value"
                class="font-weight-bold w-100"
                border
              >
                {{ item.label }}
              </el-radio>
            </el-col>
          </el-row>
        </el-radio-group>
      </div>
      <el-form
        v-loading="loading"
        :model="ruleForm"
        :rules="rules"
        ref="searchMemberForm"
      >
        <el-form-item prop="checkInput">
          <el-input
            v-model="ruleForm.checkInput"
            :placeholder="`請輸入${userTypeLabel}${searchTypeLabel}搜尋`"
            class="mt-2 input-lg"
            :disabled="checkInType === 'LineUrl'"
          >
            <div v-show="checkInType === 'LineId'" slot="suffix">
              <el-button
                type="text"
                icon="el-icon-full-screen"
                class="mr-1"
                @click="openFullScreenScanner"
              />
            </div>
          </el-input>
        </el-form-item>
      </el-form>
      <el-alert
        v-show="error"
        :title="error"
        type="error"
        center
        class="mb-1"
      />
      <el-button type="primary" plain class="w-100" @click="submitForm('searchMemberForm')">
        搜尋{{ userTypeLabel }}
      </el-button>
      <div class="mt-4 text-center">
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
              v-for="(item, idx) in checkinTypeOptions"
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
      scanQRcode: false,
      selections: {},
      // checkInput: '0912345678',
      checkInType: 'Phone',
      searchType: [
        {
          label: '手機',
          value: 'Phone',
        },
        {
          label: 'LINE',
          value: 'LineId',
        },
        // {
        //   label: 'QR Code',
        //   value: 'LineUrl',
        // },
      ],
      member: {},
      ruleForm: {
        checkInput: '0912345678',
        checkType: '',
        memberLineUrl: '',
      },
      rules: {
        checkInput: [
          { required: true, message: '請輸入登入資訊', trigger: 'blur' },
        ],
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
    searchTypeLabel() {
      return this.checkInType !== 'LineUrl' ? this.searchType.find(({ value }) => value === this.checkInType).label : '';
    },
    checkinTypeOptions() {
      const { checkinTypeMap = {} } = this.selections;
      // let optionsArray = [1, 2, 3, 4, 5];
      // if (this.$meta.type === 'employee') {
      //   optionsArray = [9];
      // } else if (this.$meta.type === 'coach') {
      //   optionsArray = [7, 8];
      // }
      // return optionsArray.map(el => (
      //   {
      //     value: el,
      //     label: checkinTypeMap[Object.keys(checkinTypeMap)[el]],
      //   }
      // ));
      return checkinTypeMap;
    },
    groupClassTypeMap() {
      return this.selections.groupClassTypeMap;
    },
    coachMap() {
      return this.selections.coachMap;
    },
    memberName() {
      return this.member.memberName;
    },
  },
  methods: {
    closeFullScreenScanner() {
      this.fullscreen = false;
      this.checkInType = 'Phone';
    },
    openFullScreenScanner() {
      this.fullscreen = true;
      this.checkInType = 'LineUrl';
    },
    onDecode(result) {
      this.ruleForm.memberLineUrl = result;
      this.fullscreen = false;
      this.searchMember();
    },
    async searchMember() {
      this.fullscreenLoading = true;
      if (this.checkInType === 'LineUrl') {
        this.ruleForm.checkInput = this.ruleForm.memberLineUrl;
      }
      const { data = null } = await apiMember.getByKey(
        this.checkInType.toLowerCase(),
        { [`member${this.checkInType}`]: this.ruleForm.checkInput },
      );
      if (data.data === null) {
        // this.error = `查無此${this.userTypeLabel}，請確認資訊是否正確。`;
        this.error = data.message;
      } else {
        this.member = data.data;
      }
      this.fullscreenLoading = false;
      // this.$router.push({ path: `/member/checkin/${this.input}` });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName === 'searchMemberForm') {
            this.searchMember();
          }
        }
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
