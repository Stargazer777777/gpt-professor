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

import { Configuration, OpenAIApi } from '@/openai';
const configuration = new Configuration({
  apiKey: '',
  organization: '',
});
const openai = new OpenAIApi(configuration);
</script>

<style scoped lang="scss">
.container {
  min-height: 500px;
  .box {
    padding: 20px;
  }
}
</style>
