<template>
  <div>
    <nav class="main-nav">
      <!-- <div class="logo" /> -->
      <Burger />
    </nav>
    <Sidebar />
    <slot />
  </div>
</template>

<script>
// import FileImageOutline from 'vue-material-design-icons/FileImageOutline.vue';
import Burger from '@/components/Menu/Burger.vue';
import Sidebar from '@/components/Menu/Sidebar.vue';

export default {
  components: {
    Burger,
    Sidebar,
    // FileImageOutline,
  },
  data() {
    return {
    };
  },
  computed: {
  },
};
</script>
<style>
html {
    height: 100%;
    overflow:hidden;
  }
body {
  border: 0; margin: 0; padding: 0;
  font-family: 'Lato';
  height: 100%;
  /* background: rgb(101,31,87);
  background:
    linear-gradient(45deg,
    rgba(101,31,87,1) 0%,
    rgba(225,113,87,1) 48%,
    rgba(249,248,113,1) 100%); */
}
/* .logo {
  align-self: center;
  color: #fff;
  font-weight: bold;
  font-family: 'Lato'
} */
.main-nav {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.8rem;
}
</style>
