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
  apiKey: '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',
  organization: 'org-0O4E9R9cJRucPALGtEQZ5Ygz',
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
