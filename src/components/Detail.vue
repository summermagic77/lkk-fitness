<template>
  <div>
    {{ member }}
  </div>
</template>

<script>
import apiMember from '@/api/member';
// import apiSelections from '@/api/selections';

export default {
  name: 'detail',
  components: {
  },
  data() {
    return {
      selections: {},
      member: {},
    };
  },
  // computed: {
  // },
  // methods: {
  // },
  async created() {
    // const { data } = await apiSelections.get();
    // this.selections = data.data;
    this.fullscreenLoading = true;
    const { data = null } = await apiMember.getByKey(
      'phone',
      { memberPhone: this.$route.params.id },
    );
    this.member = data.data;
  },
};
</script>
<style scoped>
</style>
