<template>
  <sidebar-menu
    :menu="menu"
    theme="white-theme"
    :collapsed="true"
    @toggle-collapse="onCollapse"
  >
    <span slot="toggle-icon"><font-awesome-icon icon="arrows-alt-h" /></span>
    <span slot="dropdown-icon"><font-awesome-icon icon="caret-right" /></span>
  </sidebar-menu>
</template>

<script>
export default {
  name: 'SideBar',
  props: {
    fullPage: {
      type: Boolean,
      required: true,
    },
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
