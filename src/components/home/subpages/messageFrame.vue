<template>
  <div class="frame">
    <div class="chat-content" ref="chatContentRef">
      <SingleMessage
        v-for="(item, index) in chatMessages"
        :chat-message="item"
        :index="index"
        :key="index"
        :showStatus="showStatus"
        @on-click-close="handleCloseMessage"
      ></SingleMessage>
    </div>

    <el-affix position="bottom" :offset="20">
      <div class="input-box">
        <InputBox
          @on-submit="handleUserInput"
          :action-list="actionList"
          @on-operate-act="operateActHandler"
        ></InputBox>
      </div>
    </el-affix>
  </div>
</template>

<script setup lang="ts">
import InputBox from './messageFrame/inputBox.vue';
import SingleMessage from './messageFrame/singleMessage.vue';
import type { ChatMessage } from '@/stores/modules/chat';
import { computed, ref, watch } from 'vue';

import type { OperateAction } from '@/declare/common';

type Props = {
  chatMessages: ChatMessage[];
  showStatus: boolean;
  actionList: Array<OperateAction>;
};
const props = defineProps<Props>();

// const scrollRef = ref<InstanceType<typeof ElScrollbar>>();
const chatContentRef = ref<HTMLDivElement>();
const messageAmount = computed(() => {
  return props.chatMessages.length;
});

watch(messageAmount, (newVal, oldVal) => {
  if (newVal > oldVal) {
    window.scrollTo(0, chatContentRef.value?.offsetHeight || 0);
  }
});

const emits = defineEmits([
  'on-userInput',
  'on-operateAct',
  'on-clickCloseSingleMessage',
]);

const handleUserInput = (text: string) => {
  emits('on-userInput', text);
};

const operateActHandler = (key: string) => {
  emits('on-operateAct', key);
};

const handleCloseMessage = (index: number) => {
  emits('on-clickCloseSingleMessage', index);
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
  .input-box {
    margin: 0 auto;
    width: 80%;
  }
}
</style>
