<template>
  <el-affix :offset="0">
    <el-menu mode="horizontal" :default-active="defaultActive" router @select="">
      <div class="logo">GTP-Pro</div>
      <el-menu-item index="/home/chat" key="chat">Chat</el-menu-item>
    </el-menu>
  </el-affix>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';

const defaultActive = ref<string>('')
defaultActive.value = router.currentRoute.value.path
</script>

<style scoped lang="scss">
.logo {
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}
</style>
