<template>
  <div>
    <b-container fluid>
      <b-row>
        <side-bar :fullPage.sync="fullPage" :width="siderBarWidth" />
        <b-col cols="12" :style="maninContentStyle">
          {{ fullPage }}
          <slot />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';

export default {
  components: {
    SideBar,
  },
  data() {
    return {
      fullPage: true,
      siderBarWidth: 350,
    };
  },
  computed: {
    maninContentStyle() {
      const menuMaxWidth = this.fullPage ? 45 : this.siderBarWidth;
      return {
        maxWidth: `calc(100% - ${menuMaxWidth}px)`,
        marginLeft: `${menuMaxWidth}px`,
      };
    },
  },
};
</script>
