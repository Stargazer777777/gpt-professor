import { ElMessage } from 'element-plus';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { Option, OperateAction } from '@/declare/common';
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
      name: '是否启用流传输',
      key: 'stream',
      type: 'switch',
      default: true,
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
    {
      name: '根据启用的信息生成',
      key: 'reGen',
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
      headPosition: 'right',
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
      if (item.status) {
        messages.push({
          role: item.role,
          content: item.content,
        });
      }
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
    };
  };

  const setMessageStatusFalseFromEndToLastUserMessage = () => {
    for (let i = chatMessages.value.length - 1; i >= 0; i--) {
      chatMessages.value[i].status = false;
      if (chatMessages.value[i].role === 'user') break;
    }
  };

  const getChatStream = async () => {
    try {
      const stream = await openAiManager.streamApi(
        'chat',
        { ...genRequestBody() },
        {
          apiKey: openAiManager.apiKey.value,
        }
      );
      return stream;
    } catch (err) {
      throw err;
    }
  };

  const createAssitantMessageFromStream = async (
    stream: ReadableStream<Uint8Array>
  ) => {
    try {
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = true;
      let partMessage: Record<string, any> = {};
      let chunk: ReadableStreamReadResult<Uint8Array>;
      const streamWaitTime = 5000;
      chatMessages.value.push({
        role: 'assistant',
        headPosition: 'left',
        status: true,
        content: '',
      });
      do {
        let timer = setTimeout(async () => {
          ElMessage.error('似乎出现了网络故障，或你暂时不可使用改模型');
          reader.releaseLock(); // 释放锁
          await stream.cancel('timeout'); // 关闭流
          throw new Error('似乎出现了网络故障，或你暂时不可使用改模型');
        }, streamWaitTime);
        chunk = await reader.read();
        clearTimeout(timer);
        done = chunk.done;
        partMessage = {};
        if (chunk.value) {
          partMessage = JSON.parse(decoder.decode(chunk.value));
        }
        if (Object.hasOwn(partMessage, 'content')) {
          chatMessages.value[chatMessages.value.length - 1].content +=
            partMessage['content'];
        }
      } while (!done);
    } catch (err) {
      throw err;
    }
  };

  const createAssitantMessageNotStream = async () => {
    try {
      const res = await openAiManager.openAiAPi.createChatCompletion({
        ...genRequestBody(),
      });
      const newAssitantMessage: ChatMessage = {
        role: 'assistant',
        headPosition: 'left',
        content: res.data.choices[0].message!.content,
        status: true,
      };
      chatMessages.value.push(newAssitantMessage);
    } catch (err) {
      throw err;
    }
  };

  const createAssistantMessage = async () => {
    try {
      if (formData.value['stream']) {
        const stream = await getChatStream();
        await createAssitantMessageFromStream(stream);
      } else {
        await createAssitantMessageNotStream();
      }
    } catch (err) {
      setMessageStatusFalseFromEndToLastUserMessage();
      throw err;
    }
  };

  const chat = async (content: string) => {
    appendUserMessage(content);
    await createAssistantMessage();
  };

  return {
    formData,
    options,
    actionList,
    chatMessages,
    chat,
    createAssistantMessage
  };
});
