import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Option,OperateAction } from '@/declare/common';
import { openAiManager } from '@/http/apis/openai';

export interface RequestMessage {
  role: 'assistant' | 'user' | 'system';
  content: string;
}

export interface ChatMessage extends RequestMessage {
  status: boolean;
  headPosition: 'left' | 'right';
}

export const useChatStore = defineStore('chat-store', () => {
  const options: Option[] = [
    {
      name: 'model',
      key: 'model',
      type: 'select',
      options: [
        {
          name: 'gpt-4',
          value: 'gpt-4',
        },
        {
          name: 'gpt-4-0314',
          value: 'gpt-4-0314',
        },
        {
          name: 'gpt-4-32k',
          value: 'gpt-4-32k',
        },
        {
          name: 'gpt-4-32k-0314',
          value: 'gpt-4-32k-0314',
        },
        {
          name: 'gpt-3.5-turbo',
          value: 'gpt-3.5-turbo',
        },
        {
          name: 'gpt-3.5-turbo-0301',
          value: 'gpt-3.5-turbo-0301',
        },
      ],
      default: 'gpt-3.5-turbo',
    },
    {
      name: 'system',
      key: 'system',
      type: 'textarea',
      default: '',
    },
    {
      name: 'temperature(默认为1)不建议和top_p一起改',
      key: 'temperature',
      type: 'slider',
      range: { start: 0, end: 2, step: 0.1 },
      default: 1,
    },
    {
      name: 'top_p(默认为1)',
      key: 'top_p',
      type: 'slider',
      range: { start: 0, end: 1, step: 0.1 },
      default: 1,
    },
    {
      name: 'stop',
      key: 'stop',
      type: 'input',
      default: '',
    },
    {
      name: '最大生成令牌数，设置-1表示无限',
      key: 'max_tokens',
      type: 'number',
      range: { start: -1, end: 32000, step: 1 },
      default: -1,
    },
    {
      name: '谈论新主题可能性，默认为0',
      key: 'presence_penalty',
      type: 'slider',
      range: { start: -2, end: 2, step: 0.1 },
      default: 0,
    },
    {
      name: '重复同样的话的可能。默认为0',
      key: 'frequency_penalty',
      type: 'slider',
      range: { start: -2, end: 2, step: 0.1 },
      default: 0,
    },
  ];
  const actionList: Array<OperateAction> = [
    {
      name: '新对话',
      key: 'new',
    },
  ];
  const formData = ref<Record<string, any>>({});
  // 此代码块里面的内容用于对配置的本地存储和取出
  {
    let timer: any;
    const chatOptionKeyName: string = 'chatOption';
    const initFormData = () => {
      const localChatOptionJson = localStorage.getItem(chatOptionKeyName);
      let localChatOption: Record<string, any> = {};
      if (localChatOptionJson) {
        localChatOption = JSON.parse(localChatOptionJson);
      }
      options.forEach((item) => {
        if (Object.hasOwn(localChatOption, item.key)) {
          formData.value[item.key] = localChatOption[item.key];
        } else {
          formData.value[item.key] = item.default;
        }
      });
    };
    initFormData();
    watch(
      formData,
      () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          localStorage.setItem(
            chatOptionKeyName,
            JSON.stringify(formData.value)
          );
        }, 1000);
      },
      { deep: true }
    );
  }

  const chatMessages = ref<ChatMessage[]>([]);

  const appendUserMessage = (content: string) => {
    chatMessages.value.push({
      role: 'user',
      content,
      headPosition: 'left',
      status: true,
    });
  };

  const genRequestMessages = (): Array<RequestMessage> => {
    const messages: RequestMessage[] = [];
    if (formData.value['system']) {
      messages.push({
        role: 'system',
        content: formData.value['system'],
      });
    }
    chatMessages.value.forEach((item) => {
      messages.push({
        role: item.role,
        content: item.content,
      });
    });
    return messages;
  };

  const genRequestBody = (): any => {
    const formDataCp = {
      ...formData.value,
    };
    delete formDataCp['system'];
    if (formDataCp['max_tokens'] === -1) {
      formDataCp['max_tokens'] = Infinity;
    }
    return {
      ...formDataCp,
      messages: genRequestMessages(),
      stream: false,
    };
  };

  const chat = async (content: string) => {
    appendUserMessage(content);
    const res = await openAiManager.openAiAPi.createChatCompletion({
      ...genRequestBody(),
    });
    console.log(res);
  };

  return {
    formData,
    options,
    actionList,
    chatMessages,
    chat,
  };
});
