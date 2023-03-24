import { defineStore } from 'pinia';
import { ref } from 'vue';

export type Option = {
  name: string;
  key: string;
  type: Types;
  options?: Array<{ name: string; value: any }>;
  range?: { start: number; end: number };
  default?: any;
};

export type Types = 'input' | 'select' | 'slider' | 'switch' | 'textarea';

export type ChatMessage = {
  role: 'assistant' | 'user' | 'system';
  content: string;
  status: boolean;
  headPosition: 'left' | 'right';
};
export const useChatStore = defineStore('chat-store', () => {
  const options: Option[] = [
    {
      name: 'model',
      key: 'model',
      type: 'select',
      options: [
        {
          name: 'gpt4',
          value: 'gpt4',
        },
      ],
    },
  ];
  const actionList: Array<{
    name: string;
    key: string;
  }> = [
    {
      name: '清空',
      key: 'clean',
    },
    {
      name: '新对话',
      key: 'new',
    },
  ];
  const formData = ref<Record<string, any>>({});
  options.forEach((item) => {
    formData.value[item.key] = item.default || null;
  });

  const chatMessages = ref<ChatMessage[]>([
    {
      role: 'assistant',
      content: 'hello',
      status: true,
      headPosition: 'left',
    },
    {
      role: 'user',
      content: 'hi',
      status: true,
      headPosition: 'right',
    },
  ]);

  return {
    formData,
    options,
    actionList,
    chatMessages,
  };
});
