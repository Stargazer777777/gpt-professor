import { defineStore } from 'pinia';
import type { Option } from '@/declares/chatOption';
import { ref } from 'vue';
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
  const actionList:Array<{
    name:string,
    key:string
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

  return {
    formData,
    options,
    actionList
  };
});
