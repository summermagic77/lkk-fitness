<script>
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
  components: {
    QrcodeStream,
  },
  // props: {
  //   result: {
  //     type: String,
  //     required: true,
  //   },
  // },
  data() {
    return {
      // result: '',
      error: '',
      fullscreen: false,
    };
  },
  // watch: {
  //   fullscreen(enterFullscreen) {
  //     console.dir(enterFullscreen);
  //     // if (enterFullscreen) this.requestFullscreen();
  //     // if (!enterFullscreen) this.exitFullscreen();
  //   },
  // },
  methods: {
    onDecode(result) {
      this.ruleForm.memberLineUrl = result;
      this.fullscreen = false;
      this.scanQRcode = false;
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
    onFullscreenChange() {
      // This becomes important when the user doesn't use the button to exit
      // fullscreen but hits ESC on desktop, pushes a physical back button on
      // mobile etc.
      this.fullscreen = document.fullscreenElement !== null;
    },
    requestFullscreen() {
      const elem = this.$refs.wrapper;

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
    },
    exitFullscreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
    },
    logErrors(promise) {
      promise.catch(console.error);
    },
  },
};
</script>

<style scoped>
</style>
