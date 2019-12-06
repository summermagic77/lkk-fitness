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
        <el-form-item prop="checkinMember">
          <el-input
            v-model="ruleForm.checkinMember"
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
      <el-button type="primary" plain class="w-100" @click="submitForm('searchMemberForm')">
        搜尋{{ userTypeLabel }}
      </el-button>
      <div class="mt-4 text-center">
        <el-link href="/member/create" type="info">建立會員</el-link>
        <el-divider direction="vertical"></el-divider>
        <el-link href="/employee/create" type="info">建立員工</el-link>
        <el-divider direction="vertical"></el-divider>
        <el-link href="/coach/create" type="info">建立場租教練</el-link>
      </div>
    </el-col>
    <el-col v-else-if="Object.keys(checkin).length === 0" :sm="12" :md="12" :lg="6" :xl="6">
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
      <h1>{{ memberName }}，歡迎入場</h1>
      <p class="text-black-50 font-weight-bold">
        {{ checkinTypeMap[checkin.checkinType] }}
      </p>
      <p class="">
        使用
        <span class="font-weight-bold fs-2">
          {{ checkin.checkinCost }}
        </span>
        點/堂
      </p>
      <p class="font-weight-bold">
        {{ checkin.checkinTime | moment('YYYY-MM-DD, HH:mm A') }}
      </p>
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
      // checkInput: '0912345678',
      checkInType: 'Phone',
      searchType: [
        {
          label: 'LINE',
          value: 'LineId',
        },
        {
          label: '手機',
          value: 'Phone',
        },
        // {
        //   label: 'QR Code',
        //   value: 'LineUrl',
        // },
      ],
      member: {},
      checkin: {},
      ruleForm: {
        checkinMember: '0912345678',
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
      return this.$route.meta.typeLabel;
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
        optionsArray = [9];
      } else if ([3, 4].includes(this.memberType)) {
        optionsArray = [7, 8];
      }
      return optionsArray.map(el => (
        {
          value: el,
          label: checkinTypeMap[Object.keys(checkinTypeMap)[el - 1]],
        }
      ));
      // return Object.entries(checkinTypeMap).map(e => ({ label: e[1], value: e[0] }));
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
        // this.error = data.message;
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
        this.checkin = data.data;
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
            this.saveCheckin();
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
