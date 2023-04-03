<template>
  <el-drawer
    :title="title"
    v-model="isShow"
    :lock-scroll="false"
    direction="rtl"
    size="30%"
    :destroy-on-close="true"
    :show-close="true"
    :wrapperClosable="true"
  >
  </el-drawer>
</template>

<script lang="ts" setup>
import type { ChatMessage, MessageGroup } from '@/declare/common';
import { ref, watch } from 'vue';

type Props = {
  title?: string;
  storageKey: string;
  modelValue: ChatMessage[];
};
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const isShow = ref<boolean>(false);

const getStorageMessageGroups = (): MessageGroup[] => {
  const jsonValue = localStorage.getItem(props.storageKey);
  let messageGroups = [];
  if (jsonValue) {
    messageGroups = JSON.parse(jsonValue);
  }
  return messageGroups;
};

const saveMessageGroups = () => {
  const jsonValue = JSON.stringify(messageGroups.value);
  localStorage.setItem(props.storageKey, jsonValue);
};

const newMessageGroup = (title: string): MessageGroup => {
  currentMessageGroup.value = {
    id: Date.now().toString(),
    title,
    messages: [],
  };
  // 装载进入存储的对话组中
  messageGroups.value.push(currentMessageGroup.value);
  return currentMessageGroup.value;
};

const messageGroups = ref<MessageGroup[]>(getStorageMessageGroups());
const currentMessageGroup = ref<MessageGroup>();

let updateTimer: any;
const waitTime = 1000;
watch(
  () => props.modelValue, // 必须通过返回值形式
  () => {
    console.log('watch');

    // 防抖优化性能
    clearTimeout(updateTimer);
    updateTimer = setTimeout(() => {
      // 如果当前没有显示任何对话，则此函数不执行
      if (props.modelValue.length === 0) {
        return;
      }
      // 如果当前没有对话组，则新建一个新的对话组
      console.log('here');

      if (!currentMessageGroup.value) {
        console.log('create');

        currentMessageGroup.value = newMessageGroup(
          props.modelValue[0].content.slice(0, 10) // 对话组的标题取第一条消息的前十个字符
        );
      }
      // 更新当前组的消息
      currentMessageGroup.value.messages = props.modelValue;
      // 寻找当前组在存储的对话组中的位置
      const recordedMessageGroupIndex = messageGroups.value.findIndex(
        (item) => item.id === currentMessageGroup.value!.id
      );
      if (recordedMessageGroupIndex !== -1) {
        // 更新存储的对话信息
        messageGroups.value[recordedMessageGroupIndex].messages =
          props.modelValue;
      } else {
        throw new Error('error when storage message');
      }
    }, waitTime);
  },
  {
    deep: true,
  }
);

let saveTimer: any;
watch(
  messageGroups.value,
  () => {
    // 防抖优化性能
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveMessageGroups();
    }, waitTime);
  },
  {
    deep: true,
  }
);

defineExpose({
  closeCurrentGroup() {
    emit('update:modelValue', []);
    currentMessageGroup.value = undefined;
  },
});
</script>

<style lang="scss" scoped></style>
