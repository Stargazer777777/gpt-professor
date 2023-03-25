<template>
  <div class="container">
    <div class="op-box">
      <aiOperate
        :action-list="store.actionList"
        @on-act="operateAct"
      ></aiOperate>
    </div>
    <div class="frame">
      <MessageFrame
        :showStatus="true"
        :chat-messages="store.chatMessages"
        @on-user-input="chat"
      ></MessageFrame>
    </div>
    <div class="option">
      <aiOption v-model="store.formData" :options="store.options"></aiOption>
    </div>
  </div>
</template>

<script setup lang="ts">
import MessageFrame from '@/components/home/subpages/messageFrame.vue';
import aiOperate from '@/components/home/subpages/Operate.vue';
import aiOption from '@/components/home/subpages/aiOption.vue';
import { useChatStore } from '@/stores/modules/chat';
const store = useChatStore();

const operateAct = (actionKey: string) => {
  switch (actionKey) {
    case 'new':
      store.chatMessages = [];
      break;

    default:
      break;
  }
};

const chat = (text: string) => {
  store.chat(text);
};
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
