<template>
  <Slide>
    <a id="home" href="#">
      <span>Home</span>
    </a>
  </Slide>
</template>

<script>
import { Slide } from 'vue-burger-menu';

export default {
  name: 'SideBar',
  components: {
    Slide,
  },
  data() {
    return {
      menu: [
        {
          header: true,
          title: 'Main Navigation',
          hiddenOnCollapse: true,
        },
        {
          href: '/',
          title: 'Home',
          icon: {
            element: 'font-awesome-icon',
            attributes: { icon: 'home' },
          },
        },
      ],
    };
  },
  methods: {
    onCollapse(collapsed) {
      this.$emit('update:fullPage', collapsed);
    },
  },
};
</script>
