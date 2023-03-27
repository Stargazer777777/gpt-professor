<template>
  <div class="frame">
    <el-scrollbar ref="scrollRef">
      <div class="chat-content" ref="chatContentRef">
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
import { computed, ref, watch } from 'vue';
import { ElScrollbar } from 'element-plus';

type Props = {
  chatMessages: ChatMessage[];
  showStatus: boolean;
};
const props = defineProps<Props>();

const scrollRef = ref<InstanceType<typeof ElScrollbar>>();
const chatContentRef = ref<HTMLDivElement>()
const messageAmount = computed(() => {
  return props.chatMessages.length;
});

watch(messageAmount, (newVal, oldVal) => {
  if (newVal > oldVal) {
    // console.log(scrollRef.value?.$el.offsetHeight,'scroll');
    // console.log(chatContentRef.value?.offsetHeight,'div');
    
    scrollRef.value?.scrollTo(0, chatContentRef.value?.offsetHeight);
  }
});

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
    padding-bottom: 50%;
  }
}
</style>
