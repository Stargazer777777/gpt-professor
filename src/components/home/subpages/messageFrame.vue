<template>
  <div class="frame">
    <el-scrollbar>
      <div class="chat-content">
        <SingleMessage
          v-for="(item, index) in chatMessages"
          :chat-message="item"
          :key="index"
          :showStatus="showStatus"
        ></SingleMessage>
      </div>
    </el-scrollbar>

    <InputBox @on-submit="handleUserInput"></InputBox>
  </div>
</template>

<script setup lang="ts">
import InputBox from './messageFrame/inputBox.vue';
import SingleMessage from './messageFrame/singleMessage.vue';
import type { ChatMessage } from '@/stores/modules/chat';

type Props = {
  chatMessages: ChatMessage[];
  showStatus:boolean
};
const props = defineProps<Props>();

const emits = defineEmits(['on-userInput']);

const handleUserInput = (text: string) => {
  emits('on-userInput', text);
};
</script>

<style scoped lang="scss">
.frame {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 1px solid #e4e4e4;
  .chat-content {
    flex: 1;
  }
}
</style>
