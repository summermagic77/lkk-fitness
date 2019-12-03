<template>
  <el-row
    type="flex"
    :class="{
      'row-bg': true,
      'h-100': true
    }"
    justify="center"
    align="middle"
  >
    <el-col :sm="12" :md="12" :lg="6" :xl="6" class="text-center">
      <div v-if="checkInType === 'LineUrl'" class="fullscreen">
        <el-alert
          :title="error"
          type="error"
        />
        <!-- <p class="decode-result">{{ result }}</p> -->
        <QrcodeStream @decode="onDecode" @init="onInit" class="mb-1" />
      </div>
      <!-- <h1>
        <account-check class="icon-3x" />
      </h1> -->
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
      <div class="mt-2">
        <el-link href="/member/create" type="info">建立會員</el-link>・
        <el-link href="/employee/create" type="info">建立員工</el-link>・
        <el-link href="/coach/create" type="info">建立場租教練</el-link>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import apiMember from '@/api/member';
import mixinQRcodeReader from '@/mixins/qrCodeReader.vue';
// import AccountCheck from 'vue-material-design-icons/AccountCheck.vue';

export default {
  name: 'checkin',
  components: {
    // AccountCheck,
  },
  mixins: [mixinQRcodeReader],
  data() {
    return {
      input: '0912345678',
      checkInType: 'Phone',
      searchType: [
        {
          label: '手機',
          value: 'Phone',
          // key: 'memberPhone',
        },
        {
          label: 'LINE ID',
          value: 'LineId',
          // key: 'memberLineId',
        },
        {
          label: 'QR Code',
          value: 'LineUrl',
          // key: 'memberLineUrl',
        },
      ],
    };
  },
  computed: {
    userTypeLabel() {
      return this.$route.meta.typeLabel;
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
  },
  methods: {
    async searchMember() {
      const { data } = await apiMember.getByKey(this.checkInType.toLowerCase(), { [`member${this.checkInType}`]: this.input });
      console.dir(data);
      // this.$router.push({ path: `/member/checkin/${this.input}` });
    },
  },
};
</script>
<style scoped>
</style>
