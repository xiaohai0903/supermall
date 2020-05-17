<template>
  <div id="app">
	<router-view></router-view>
	<MainTabBar></MainTabBar>
  </div>
</template>

<script>

import MainTabBar from '@/components/content/mainTabber/MainTabBar.vue'


export default {
  name: 'app',
  components: {
	MainTabBar
  }
}
</script>

<style>
@import url("./assets/css/base.css");

</style>
