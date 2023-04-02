<template>
  <el-affix :offset="0">
    <el-menu
      mode="horizontal"
      :default-active="defaultActive"
      router
      @select=""
    >
      <div class="left">
        <div class="logo">GTP-Pro</div>
        <el-menu-item index="/home/chat" key="chat">Chat</el-menu-item>
        <el-menu-item index="/home/image" key="chat">Image</el-menu-item>
        <el-menu-item index="/home/help" key="help">帮助</el-menu-item>
      </div>
      <div class="right">
        <div class="setting"><Setting /></div>
      </div>
    </el-menu>
  </el-affix>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';
import Setting from './menu/setting.vue';

const defaultActive = ref<string>('');
defaultActive.value = router.currentRoute.value.path;
</script>

<style scoped lang="scss">
.el-menu {
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;
    .logo {
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
    }
  }
  .right {
    padding: 0 30px;
    display: flex;
    align-items: center;
    .setting {
      padding-right: 100px;
    }
  }
}
</style>
