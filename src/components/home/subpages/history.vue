<template>
  <el-drawer
    :title="title"
    v-model="isShow"
    :lock-scroll="true"
    direction="rtl"
    size="20%"
    :destroy-on-close="false"
    :show-close="true"
    :wrapperClosable="true"
    :modal="true"
    :append-to-body="false"
  >
    <template #header>
      <el-row :gutter="20" align="center" class="header">
        <el-col :span="6" :offset="0"> </el-col>
        <el-col :span="6" :offset="10">
          <el-popconfirm title="Sure?" @confirm="clearMessageGroups">
            <template #reference>
              <el-button
                type="danger"
                size="default"
                :icon="Delete"
                :disabled="messageGroups.length === 0"
                >清空</el-button
              >
            </template>
          </el-popconfirm>
        </el-col>
      </el-row>
    </template>
    <template #default>
      <div class="list">
        <el-scrollbar>
          <el-empty description="None" v-if="messageGroups.length === 0" />
          <el-row>
            <el-col
              :span="24"
              v-for="item in reversedMessageGroups"
              :key="item.id"
            >
              <el-card
                :class="[
                  item.id === currentMessageGroup?.id ? 'history-using' : '',
                  'history-item',
                ]"
                shadow="hover"
                @click="switchCurrentMessageGroup(item.id)"
              >
                <el-row justify="space-between">
                  <el-col :span="12" :offset="0">{{ item.title }}</el-col>
                  <el-col :span="11" :offset="0" class="date">{{
                    moment(parseInt(item.id)).format('lll')
                  }}</el-col>
                  <el-col :span="1" :offset="0" class="del">
                    <el-button
                      type="danger"
                      size="small"
                      :icon="Delete"
                      circle
                      @click="delMessageGroup(item.id)"
                    />
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-scrollbar>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import type { ChatMessage, MessageGroup } from '@/declare/common';
import { computed, ref, watch } from 'vue';
import moment from 'moment';
import { Delete } from '@element-plus/icons-vue';

type Props = {
  title?: string;
  storageKey: string;
  modelValue: ChatMessage[];
};
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const isShow = ref<boolean>(false);
const openHistory = () => {
  isShow.value = true;
};

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
const reversedMessageGroups = computed(() => {
  return messageGroups.value.reverse();
});
const currentMessageGroup = ref<MessageGroup>();

const switchCurrentMessageGroup = (id: string) => {
  currentMessageGroup.value = messageGroups.value.find(
    (item) => item.id === id
  );
  emit('update:modelValue', currentMessageGroup.value?.messages);
};

const delMessageGroup = (id: string) => {
  messageGroups.value.splice(
    messageGroups.value.findIndex((item) => item.id === id),
    1
  );
  if (id === currentMessageGroup.value?.id) {
    currentMessageGroup.value = undefined;
  }
  emit('update:modelValue', []);
};

const clearMessageGroups = () => {
  messageGroups.value = [];
  currentMessageGroup.value = undefined;
  emit('update:modelValue', []);
};

let updateTimer: any;
const waitTime = 1000;
watch(
  () => props.modelValue, // 必须通过返回值形式
  () => {
    // 防抖优化性能
    clearTimeout(updateTimer);
    updateTimer = setTimeout(() => {
      // 如果当前没有显示任何对话，则此函数不执行
      if (props.modelValue.length === 0) {
        return;
      }
      // 如果当前没有对话组，则新建一个新的对话组
      if (!currentMessageGroup.value) {
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
  messageGroups,
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
  openHistory,
});
</script>

<style lang="scss" scoped>
.list {
  height: 100%;
  .el-row {
    padding-right: 10px; // 保证滚动条显示
  }
  .history-item {
    margin-bottom: 5px;
    cursor: pointer;
    font-size: 14px;
    .date {
      font-size: 12px;
    }
  }
  .history-using {
    background-color: #ecf5ff;
  }
}
</style>
