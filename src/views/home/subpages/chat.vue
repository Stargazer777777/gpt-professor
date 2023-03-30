<template>
  <div class="container">
    <el-affix :offset="60">
      <div class="option">
      <aiOption v-model="store.formData" :options="store.options" title="选项"></aiOption>
    </div>
  </el-affix>
    
    <div class="frame">
      <MessageFrame
        :showStatus="true"
        :chat-messages="store.chatMessages"
        :action-list="store.actionList"
        @on-user-input="chat"
        @on-operate-act="operateAct"
        @on-click-close-single-message="deleteMessageByIndex"
      ></MessageFrame>
    </div>
  </div>
</template>

<script setup lang="ts">
import MessageFrame from '@/components/home/subpages/messageFrame.vue';
import aiOption from '@/components/home/subpages/aiOption.vue';
import { useChatStore } from '@/stores/modules/chat';
const store = useChatStore();

const operateAct = (actionKey: string) => {
  switch (actionKey) {
    case 'new':
      store.chatMessages = [];
      break;
    case 'reGen':
      store.createAssistantMessage();
      break;
    default:
      break;
  }
};

const deleteMessageByIndex = (index:number)=> {
  store.chatMessages.splice(index,1)
}

const chat = (text: string) => {
  store.chat(text);
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  .frame {
    flex: 1;
    min-height: 90vh;
  }
  .option {
    padding:0 20px;
  }
}
</style>
