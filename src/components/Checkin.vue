<template>
  <el-row
    :type="'flex'"
    :class="{
      'row-bg': true,
      'h-100': true
    }"
    justify="center"
    align="middle"
  >
    <el-col :sm="12" :md="12" :lg="6" :xl="6" class="text-center">
      <div v-if="type === 'qrcode'" class="fullscreen">
        <el-alert
          :title="error"
          type="error"
        />
        <!-- <p class="decode-result">{{ result }}</p> -->
        <QrcodeStream @decode="onDecode" @init="onInit" class="mb-1" />
      </div>
      <h1>
        <account-check class="icon-3x" />
      </h1>
      <el-radio-group v-model="type">
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
        v-show="type !== 'qrcode'"
        v-model="input"
        :type="inputType[type].type"
        :placeholder="inputType[type].placeholder"
        :pattern="inputType[type].pattern"
        class="mt-2 input-lg"
      >
        <div slot="suffix">
          <el-button type="text" icon="el-icon-search" class="mr-1" @click="searchMember" />
        </div>
      </el-input>
    </el-col>
  </el-row>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';
import AccountCheck from 'vue-material-design-icons/AccountCheck.vue';

export default {
  name: 'checkin',
  components: {
    QrcodeStream,
    AccountCheck,
  },
  data() {
    return {
      result: '',
      error: '',
      input: '0987654321',
      type: 'phone',
      searchType: [
        {
          label: '手機',
          value: 'phone',
        },
        {
          label: '姓名',
          value: 'name',
        },
        {
          label: 'QR Code',
          value: 'qrcode',
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
        phone: {
          type: 'text',
          placeholder: `請輸入${this.userTypeLabel}手機號碼搜尋`,
        },
        name: {
          type: 'text',
          placeholder: `請輸入${this.userTypeLabel}姓名搜尋`,
        },
        qrcode: {
          type: 'text',
          placeholder: '',
        },
      };
    },
  },
  methods: {
    searchMember() {
      this.$router.push({ path: `/member/checkin/${this.input}` });
    },
    onDecode(result) {
      this.result = result;
      console.dir(result);
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          this.error = 'ERROR: you need to grant camera access permisson';
        } else if (error.name === 'NotFoundError') {
          this.error = 'ERROR: no camera on this device';
        } else if (error.name === 'NotSupportedError') {
          this.error = 'ERROR: secure context required (HTTPS, localhost)';
        } else if (error.name === 'NotReadableError') {
          this.error = 'ERROR: is the camera already in use?';
        } else if (error.name === 'OverconstrainedError') {
          this.error = 'ERROR: installed cameras are not suitable';
        } else if (error.name === 'StreamApiNotSupportedError') {
          this.error = 'ERROR: Stream API is not supported in this browser';
        }
      }
    },
  },
};
</script>
<style scoped>
</style>
