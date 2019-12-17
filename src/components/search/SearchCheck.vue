<template>
  <el-row
    type="flex"
    :class="{
      'h-100': members.length === 0,
    }"
    justify="center"
    align="middle"
    v-loading.fullscreen.lock="fullscreenLoading"
  >
    <el-col
      v-if="members.length === 0"
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
        <el-title
          :title="userTypeLabel"
          icon="la la-user"
          :sub-title="`輸入手機號碼、LINE ID 或 姓名${userTypeLabel}`"
        />
        <el-radio-group v-model="checkInType" class="w-100">
          <el-row :gutter="10">
            <el-col
              v-for="(item, idx) in searchType"
              :key="idx"
              :span="8"
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
            <!-- <div v-show="checkInType === 'LineId'" slot="suffix">
              <el-button
                type="text"
                icon="el-icon-full-screen"
                class="mr-1"
                @click="openFullScreenScanner"
              />
            </div> -->
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
    </el-col>
    <el-col
      v-else
      :sm="24"
      :md="24"
      :lg="24"
      :xl="24"
      >
      <el-list :datas="members" :columns="tableColumns"></el-list>
    </el-col>
  </el-row>
</template>

<script>
import apiMember from '@/api/member';
// import apiCheckin from '@/api/checkin';
import apiSelections from '@/api/selections';
import ElTitle from '@/components/basic/Title.vue';
import ElList from '@/components/basic/List.vue';
import mixinQRcodeReader from '@/mixins/qrCodeReader.vue';

export default {
  name: 'checkin',
  components: {
    ElTitle,
    ElList,
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
        {
          label: '姓名',
          value: 'Name',
        },
      ],
      members: [],
      columns: [
        {
          prop: 'memberName',
          label: '姓名',
        },
        {
          prop: 'memberPhone',
          label: '手機',
        },
        {
          prop: 'memberType',
          label: '類型',
          formatter: this.formatterType,
        },
      ],
      columnsPlus: [
        {
          prop: 'memberPoint',
          label: '點數',
        },
        {
          prop: 'memberLesson',
          label: '課程',
        },
        {
          prop: 'memberTreat',
          label: '治療',
        },
      ],
      check: {},
      memberTypeMap: {},
      ruleForm: {
        checkinMember: '',
      },
      rules: {
        checkinMember: [
          { required: true, message: '請輸入搜尋資訊', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    tableColumns() {
      return this.$device.mobile ? this.columns : [...this.columns, ...this.columnsPlus];
    },
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
      const time = this.check[`${this.$route.meta.type}Time`];
      return this.$moment(time).utc().format('YYYY-MM-DD, HH:mm A');
    },
    searchTypeLabel() {
      return this.checkInType !== 'LineUrl' ? this.searchType.find(({ value }) => value === this.checkInType).label : '';
    },
    memberName() {
      return this.member.memberName || this.member.checkinName;
    },
    memberType() {
      return this.member.memberType || this.member.checkinType;
    },
  },
  methods: {
    formatterType(row, { property }) {
      return this.memberTypeMap[row[property]];
    },
    async searchMember() {
      this.fullscreenLoading = true;
      const { data: { data = null, code, message } } = await apiMember.getByCon(
        { [`member${this.checkInType}`]: this.ruleForm.checkinMember },
      );
      if (code !== 0) {
        this.$message({
          showClose: true,
          message,
          type: 'error',
        });
      } else {
        this.members = data;
      }
      this.fullscreenLoading = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.searchMember();
        }
      });
    },
  },
  async created() {
    const { data: { data: { memberTypeMap } } } = await apiSelections.get();
    this.memberTypeMap = memberTypeMap;
  },
};
</script>
<style scoped>
</style>
