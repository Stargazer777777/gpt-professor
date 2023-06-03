<template>
  <div class="container">
    <Menu></Menu>
    <div class="box">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from '@/components/home/menu.vue';

</script>

<style scoped lang="scss">
.container {
  min-height: 500px;
  min-width: 1080px;
  .box {
    padding: 20px;
  }
}
</style>
