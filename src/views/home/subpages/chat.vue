<template>
  <div class="container">
    <div class="op-box">
      <chatOp></chatOp>
    </div>
    <div class="frame">
      <ChatFrame></ChatFrame>
    </div>
    <div class="option">
      <ChatOption></ChatOption>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatFrame from '@/components/home/subpages/chatFrame.vue';
import chatOp from '@/components/home/subpages/chatOp.vue';
import ChatOption from '@/components/home/subpages/chatOption.vue';

</script>

<style scoped lang="scss">
.container {
    display: flex;
    justify-content: center;
    .op-box {
      flex: 1;
      padding: 20px;
    }
    .frame {
      flex: 2;
      height: calc(100vh - 100px);
      min-height: 500px;
    }
    .option {
      flex: 1;
      padding: 20px;
    }
}
</style>
