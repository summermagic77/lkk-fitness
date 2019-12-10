<template>
  <div>
    <h1 class="mb-0">
      {{ title }}
      <i
        v-show="icon"
        :class="{
          [icon]: true,
          'text-brand': true,
        }"
      />
    </h1>
    <p v-show="subTitle" class="text-black-50 mb-2">
      {{ subTitle }}
    </p>
  </div>
</template>
<script>

export default {
  name: 'b-title',
  // data: () => ({
  //     isBurgerActive: false
  // }),
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
    subTitle: {
      type: String,
    },
  },
  computed: {
  },
  methods: {
  },
};
</script>
<style>
</style>
