<template>
  <Menu></Menu>
  <div class="box">
    <RouterView></RouterView>
  </div>
</template>

<script setup lang="ts">
import Menu from '@/components/home/menu.vue';
</script>

<style scoped lang="scss">
.box {
    padding: 20px;
}
</style>
