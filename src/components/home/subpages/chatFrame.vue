<template>
  <div class="frame">
    <el-scrollbar>
      <div class="chat-content">
        <SingleChat></SingleChat>
        <SingleChat></SingleChat>
        <SingleChat></SingleChat>
        <SingleChat></SingleChat>
        <SingleChat></SingleChat>
        <SingleChat></SingleChat>
        <SingleChat></SingleChat>
      </div>
    </el-scrollbar>

    <InputBox></InputBox>
  </div>
</template>

<script setup lang="ts">
import InputBox from './common/inputBox.vue';
import SingleChat from './common/singleChat.vue';
</script>

<style scoped lang="scss">
.frame {
  width: 50%;
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #e4e4e4;
  .chat-content {
    flex: 1;
  }
}
</style>
