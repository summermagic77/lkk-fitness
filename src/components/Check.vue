<template>
  <el-row
    type="flex"
    :class="{
      'row-bg': true,
      'h-100': true,
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
      <div>
        <el-image
          v-if="$device.mobile"
          style="!height: 30px;"
          :src="require('@/assets/lkk-logo.png')"
          fit="fill"
          class="w-30 mb-2"
        />
        <h1 class="mb-0">
          {{ userTypeLabel }}
          <i v-if="checkin" class="las la-sign-in-alt text-brand" />
          <i v-else class="las la-door-open text-brand" />
        </h1>
        <p class="text-black-50 mb-2">
          輸入手機號碼、LINE ID 或 QRcode {{ userTypeLabel }}。
        </p>
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
        <el-form-item prop="checkinMember">
          <el-input
            v-model="ruleForm.checkinMember"
            :placeholder="`請輸入 ${searchTypeLabel} 搜尋`"
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
      <el-button
        type="primary"
        :plain="checkin"
        class="w-100"
        @click="submitForm('searchMemberForm')"
      >
        <span v-if="checkin">搜尋會員</span>
        <span v-else>{{ userTypeLabel }}</span>
      </el-button>
      <div class="mt-4 text-center">
        <el-link href="/create" type="info">加入新成員</el-link>
      </div>
    </el-col>
    <el-col
      v-else-if="Object.keys(check).length === 0 && checkin"
      :sm="12"
      :md="12"
      :lg="6"
      :xl="6"
      >
      <h2 class="font-weight-light">
          歡迎，{{ memberName }}
      </h2>
      <p class="text-black-50">
        ({{ memberTypeMap[memberType] }})
      </p>
      <el-form
        v-loading="loading"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item label="入場類型" prop="checkinType">
          <el-select v-model="ruleForm.checkinType" placeholder="請選擇入場類型" class="w-100">
            <el-option
              v-for="(item, idx) in checkinTypeOptions"
              :key="idx"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="ruleForm.checkinType === 4" label="課程" prop="checkinGroupClass">
          <el-select v-model="ruleForm.checkinGroupClass" placeholder="請選擇課程" class="w-100">
            <el-option
              v-for="(item, idx) in groupClassTypeOptions"
              :key="idx"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          v-if="[3, 5, 6].includes(ruleForm.checkinType)"
          label="教練"
          prop="checkinCoach"
        >
          <el-select v-model="ruleForm.checkinCoach" placeholder="請選擇教練" class="w-100">
            <el-option
              v-for="(item, idx) in coachOptions"
              :key="idx"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-if="[3, 4].includes(memberType)" prop="checkinCost">
          <el-input v-model="ruleForm.checkinCost" placeholder="請輸入金額" />
        </el-form-item>
        <el-button
          :loading="fullscreenLoading"
          type="primary"
          class="w-100"
          @click="submitForm('ruleForm')"
        >
          進場 <i class="la la-sign-in-alt" />
        </el-button>
      </el-form>
    </el-col>
    <el-col v-else :sm="12" :md="12" :lg="6" :xl="6">
      <!-- <h1 class="mb-1">{{ memberName }}，{{ userTypeLabel }}</h1> -->
      <h1 class="mb-0">Chiquitta，{{ userTypeLabel }}</h1>
      <!-- <el-card :body-style="{ padding: '10px' }" shadow="always"> -->
      <p class="text-black-50 mt-0 mb-3">
        {{ checkinTypeMap[check.checkinType] || memberTypeMap[memberType]  }}
        <!-- 一般會員 -->
      </p>
      <div v-if="checkin">
        <p class="mb-0">
          本次消費
        </p>
        <span class="font-weight-bolder my-0 fs-3">
          {{ check.checkinCost }}
          <!-- 1,000 -->
        </span>
        <span class="text-black-50 font-weight-light">點數/堂</span>
      </div>
      <p class="font-weight-bold mt-1">
        <!-- {{ check.checkinTime | moment('YYYY-MM-DD, HH:mm A') }} -->
        {{ checkTime }}
      </p>
      <div class="text-center">
        <el-button class="w-95 fixed-bottom" style="margin: 10px">
          回首頁
        </el-button>
      </div>
      <!-- </el-card> -->
    </el-col>
  </el-row>
</template>

<script>
import apiMember from '@/api/member';
import apiCheckin from '@/api/checkin';
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
      checkInType: 'LineId',
      searchType: [
        {
          label: 'LINE',
          value: 'LineId',
        },
        {
          label: '手機',
          value: 'Phone',
        },
      ],
      member: {},
      check: {},
      // checkout: {},
      ruleForm: {
        checkinMember: 'testline4',
        checkinType: null,
        checkinGroupClass: null,
        checkinCoach: null,
        checkinCost: null,
      },
      rules: {
        checkinMember: [
          { required: true, message: '請輸入登入資訊', trigger: 'blur' },
        ],
        checkinType: [
          { required: true, message: '請選擇入場類型', trigger: 'change' },
        ],
        checkinGroupClass: [
          { required: true, message: '請選擇課程', trigger: 'change' },
        ],
        checkinCoach: [
          { required: true, message: '請選教練', trigger: 'change' },
        ],
        checkinCost: [
          { required: true, message: '請輸入金額', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    userTypeLabel() {
      return this.$route.name;
    },
    checkin() {
      return this.$route.meta.type === 'checkin';
    },
    checkout() {
      return this.$route.meta.type === 'checkout';
    },
    checkTime() {
      return this.$moment(this.check[`${this.$route.meta.type}Time`]).format('YYYY-MM-DD, HH:mm A');
    },
    searchTypeLabel() {
      return this.checkInType !== 'LineUrl' ? this.searchType.find(({ value }) => value === this.checkInType).label : '';
    },
    memberTypeMap() {
      const { memberTypeMap = {} } = this.selections;
      return memberTypeMap;
    },
    checkinTypeMap() {
      return this.selections.checkinTypeMap;
    },
    checkinTypeOptions() {
      const { checkinTypeMap = {} } = this.selections;
      let optionsArray = [1, 2, 3, 4, 5, 6];
      if ([5, 6, 7].includes(this.memberType)) {
        optionsArray = [...optionsArray, ...[9]];
      } else if ([3, 4].includes(this.memberType)) {
        optionsArray = [...optionsArray, ...[7, 8]];
      }
      return optionsArray.map(el => (
        {
          value: el,
          label: checkinTypeMap[Object.keys(checkinTypeMap)[el - 1]],
        }
      ));
    },
    groupClassTypeMap() {
      return this.selections.groupClassTypeMap;
    },
    groupClassTypeOptions() {
      const { groupClassTypeMap = {} } = this.selections;
      return Object.entries(groupClassTypeMap).map(e => ({ label: e[1], value: e[0] }));
    },
    coachMap() {
      return this.selections.coachMap;
    },
    coachOptions() {
      const { coachMap = {} } = this.selections;
      return Object.entries(coachMap).map(e => ({ label: e[1], value: e[0] }));
    },
    memberName() {
      return this.member.memberName;
    },
    memberType() {
      return this.member.memberType;
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
      this.ruleForm.checkinMember = result;
      this.fullscreen = false;
      this.searchMember();
    },
    async searchMember() {
      this.fullscreenLoading = true;
      const { data = null } = await apiMember.getByKey(
        this.checkInType.toLowerCase(),
        { [`member${this.checkInType}`]: this.ruleForm.checkinMember },
      );
      if (data.data === null) {
        // this.error = `查無此${this.userTypeLabel}，請確認資訊是否正確。`;
        this.$message({
          showClose: true,
          message: data.message,
          type: 'error',
        });
      } else {
        this.member = data.data;
      }
      this.fullscreenLoading = false;
      // this.$router.push({ path: `/member/checkin/${this.input}` });
    },
    async saveCheckin() {
      this.fullscreenLoading = true;
      const { data } = await apiCheckin.saveCheckin(this.ruleForm);
      const { code } = data;
      if (code !== 0) {
        this.$message({
          showClose: true,
          message: data.message,
          type: 'error',
        });
      } else {
        this.check = data.data;
      }
      this.fullscreenLoading = false;
    },
    async saveCheckout() {
      this.fullscreenLoading = true;
      const { data } = await apiCheckin.saveCheckout({
        checkinMember: this.ruleForm.checkinMember,
      });
      const { code } = data;
      if (code !== 0) {
        this.$message({
          showClose: true,
          message: data.message,
          type: 'error',
        });
      } else {
        this.check = data.data;
      }
      this.fullscreenLoading = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName === 'searchMemberForm') {
            this.searchMember();
          } else {
            Object.keys(this.ruleForm).forEach((key) => {
              if (this.ruleForm[key] === null) {
                delete this.ruleForm[key];
              }
            });
            if (this.checkin) {
              this.saveCheckin();
            } else {
              this.saveCheckout();
            }
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
