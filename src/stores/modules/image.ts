import { defineStore } from 'pinia';
import { reactive, ref, watch } from 'vue';
import type { Option, OperateAction } from '@/declare/common';
import { openAiManager } from '@/http/apis/openai';

import type { ChatMessage } from '@/declare/common';
import { ElMessage } from 'element-plus';

export const useImageStore = defineStore('image-store', () => {
  const options = reactive<Option[]>([
    {
      name: '模式',
      key: 'mode',
      type: 'select',
      options: [
        {
          name: '生成图片',
          value: 'create',
        },
        {
          name: '编辑图片',
          value: 'edit',
        },
        {
          name: '变化图片',
          value: 'variation',
        },
      ],
      default: 'create',
    },
    {
      name: '生成图片数量',
      key: 'n',
      type: 'slider',
      range: { start: 1, end: 10, step: 1 },
      default: 1,
    },
    {
      name: '图片尺寸',
      key: 'size',
      type: 'select',
      options: [
        { name: '256x256', value: '256x256' },
        { name: '512x512', value: '512x512' },
        { name: '1024x1024', value: '1024x1024' },
      ],
      default: '1024x1024',
    },
  ]);
  const actionList: Array<OperateAction> = [
    {
      name: '重新生成',
      key: 'reGen',
    },
  ];
  const formData = ref<Record<string, any>>({});
  // 此代码块里面的内容用于对配置的本地存储和取出
  {
    let timer: any;
    const chatOptionKeyName: string = 'imageOption';
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

  const genRequestBody = (prompt:string): any => {
    const formDataCp = {
      ...formData.value,
    };
    delete formDataCp['mode'];
    return {
      ...formDataCp,
      prompt: prompt,
    };
  };

  const setMessageStatusFalseFromEndToLastUserMessage = () => {
    for (let i = chatMessages.value.length - 1; i >= 0; i--) {
      chatMessages.value[i].status = false;
      if (chatMessages.value[i].role === 'user') break;
    }
  };

  const createImage = async (prompt:string) => {
    try {
      const res = await openAiManager.openAiAPi.createImage({
        ...genRequestBody(prompt),
      });
      const newAssitantMessage: ChatMessage = {
        role: 'assistant',
        headPosition: 'left',
        content: res.data.data
          .map((item, index) => `![](${item.url})`)
          .join('\n'),
        status: true,
      };
      chatMessages.value.push(newAssitantMessage);
    } catch (err) {
      throw err;
    }
  };

  const genImage = async (prompt?:string) => {
    try {
      if (formData.value['mode'] === 'create') {
        if(!prompt) {
            prompt = (chatMessages.value as any).findLast((message:ChatMessage)=> {
                return message.role==='user'
            }).content
        }
        if(!prompt) {
            ElMessage.warning('还没有任何输入')
            return
        }
        await createImage(prompt);
      }
    } catch (err) {
      setMessageStatusFalseFromEndToLastUserMessage();
      throw err;
    }
  };

  const chat = async (content: string) => {
    appendUserMessage(content);
    await genImage(content);
  };

  return {
    formData,
    options,
    actionList,
    chatMessages,
    genImage,
    chat,
  };
});
