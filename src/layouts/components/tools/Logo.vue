<template>
  <div class="logo">
    <router-link :to="{path:'/'}">
      <h1>{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    title: {
      type: String,
      default: process.env.VUE_APP_HOME_TITLE,
      required: false
    }
  }
};
</script>
