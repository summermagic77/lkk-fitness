<template>
  <el-container>
    <el-header>
      <el-page-header @back="goBack" :content="$route.name" />
      <!-- {{ $route.params }} -->
    </el-header>
    <el-main>
      <el-row
        :type="$device.mobile ? '' : 'flex'"
        class="row-bg"
        justify="center"
        align="middle"
      >
        <el-col :sm="12" :md="12" :lg="6" :xl="6" class="text-center">
          <div v-if="type === 'qrcode'" class="fullscreen">
            <el-alert
              :title="error"
              type="error"
              show-icon>
            </el-alert>
            <p class="decode-result">{{ result }}</p>
            <QrcodeStream @decode="onDecode" @init="onInit" class="mb-1" />
          </div>
          <el-radio-group v-model="type">
            <el-radio
              v-for="(item, idx) in searchType"
              :key="idx"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
          <el-input
            v-if="type !== 'qrcode'"
            v-model="input"
            :type="inputType[type].type"
            :placeholder="inputType[type].placeholder"
            :pattern="inputType[type].pattern"
            class="mt-2"
          >
            <div slot="suffix">
              <el-button type="text" icon="el-icon-search" class="mr-1" />
            </div>
          </el-input>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
  name: 'checkin',
  components: {
    QrcodeStream,
  },
  data() {
    return {
      result: '',
      error: '',
      input: '',
      type: 'phone',
      inputType: {
        phone: {
          type: 'text',
          placeholder: '請輸入會員手機號碼進行搜尋',
        },
        name: {
          type: 'text',
          placeholder: '請輸入會員姓名進行搜尋',
        },
        qrcode: {
          type: 'text',
          placeholder: '',
        },
      },
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
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    onDecode(result) {
      this.result = result;
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
