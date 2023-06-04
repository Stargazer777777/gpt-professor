import { ElMessage, ElNotification } from 'element-plus';
import { defineStore } from 'pinia';
import { computed, reactive, ref, watch } from 'vue';
import type { Option, OperateAction } from '@/declare/common';
import { openAiManager } from '@/http/apis/openai';
import {
  axiosRespnseErrorHandler,
  closeMessage,
  showLoadingMessage,
} from '@/http/index';
import { AxiosError } from 'axios';
import type { CreateCompletionResponseUsage } from '@/openai';

export const useCompletiontore = defineStore('completion-store', () => {
  const options = reactive<Option[]>([
    {
      name: 'model',
      key: 'model',
      type: 'select',
      options: [
        {
          name: 'text-davinci-003',
          value: 'text-davinci-003',
        },
        {
          name: 'code-davinci-002',
          value: 'code-davinci-002',
        },
        {
          name: 'text-davinci-002',
          value: 'text-davinci-002',
        },
      ],
      default: 'text-davinci-003',
    },
    {
      name: '生成目标token的可能({"target": -100~100})',
      key: 'logit_bias',
      type: 'textarea',
      default: '{}',
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
  ]);
  const actionList: Array<OperateAction> = [
    {
      name: '开始',
      key: 'start',
    },
    {
      name: '清空',
      key: 'clear',
    },
  ];
  const formData = ref<Record<string, any>>({});
  // 此代码块里面的内容用于对配置的本地存储和取出
  {
    let timer: any;
    const completionOptionKeyName: string = 'completionOption';
    const initFormData = () => {
      const localCompletionOptionJson = localStorage.getItem(
        completionOptionKeyName
      );
      let localCompletionOption: Record<string, any> = {};
      if (localCompletionOptionJson) {
        localCompletionOption = JSON.parse(localCompletionOptionJson);
      }
      options.forEach((item) => {
        if (Object.hasOwn(localCompletionOption, item.key)) {
          formData.value[item.key] = localCompletionOption[item.key];
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
            completionOptionKeyName,
            JSON.stringify(formData.value)
          );
        }, 1000);
      },
      { deep: true }
    );
  }

  const context = ref<string>('');
  const usage = ref<CreateCompletionResponseUsage>();

  const genRequestBody = (): any => {
    const formDataCp = {
      ...formData.value,
    };
    if (formDataCp['max_tokens'] === -1) {
      delete formDataCp.max_tokens;
    }

    formDataCp['logit_bias'] = (formDataCp['logit_bias'] as string).trim();
    let logit_bias: Record<string, number> = {};
    if (formDataCp['logit_bias']) {
      try {
        const userInputLogit_bias: Record<string, any> = JSON.parse(
          formDataCp['logit_bias']
        );
        if (userInputLogit_bias instanceof Array) {
          throw new Error('cant be array');
        }
        for (let k in userInputLogit_bias) {
          if (!parseInt(k)) {
            throw new Error('key is not a numeric string');
          }
          if (userInputLogit_bias[k]! instanceof Number) {
            throw new Error('value is not a number');
          }
        }
        logit_bias = userInputLogit_bias;
      } catch (err) {
        ElMessage.warning('输入的[生成目标token的可能性格式错误]');
        ElNotification({
          message:
            '生成目标token的可能性应该是一个JSON对象，键是token数，值是可能性（-100~100）',
        });
      }
    }
    formDataCp['logit_bias'] = logit_bias;
    formDataCp['prompt'] = context.value;

    return formDataCp;
  };

  const getCompletionStream = async () => {
    const messageHandler = showLoadingMessage('请稍等');
    try {
      const stream = await openAiManager.streamApi(
        'completions',
        { ...genRequestBody() },
        {
          apiKey: openAiManager.apiKey.value,
        }
      );

      return stream;
    } catch (err) {
      if (err instanceof Error) {
        if (err instanceof AxiosError) {
          return axiosRespnseErrorHandler(err);
        }
        ElMessage.error(err.message);
        ElNotification({
          title: 'stream error',
          message: '如果你想知道确切的原因，最好不要使用流模式',
          duration: 0,
        });
      }
      throw err;
    } finally {
      closeMessage(messageHandler);
    }
  };

  const createCompletionFromStream = async (
    stream: ReadableStream<Uint8Array>
  ) => {
    try {
      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = true;
      let partMessage: string = '';
      let chunk: ReadableStreamReadResult<Uint8Array>;
      const streamWaitTime = 1 * 60 * 1000;
      do {
        let timer = setTimeout(async () => {
          // ElMessage.error('似乎出现了网络故障，或你暂时不可使用改模型');
          reader.releaseLock(); // 释放锁
          await stream.cancel('timeout'); // 关闭流
          throw new Error('stream read error');
        }, streamWaitTime);
        chunk = await reader.read();
        clearTimeout(timer);
        done = chunk.done;
        partMessage = '';
        if (chunk.value) {
          partMessage = decoder.decode(chunk.value);
        }

        context.value += partMessage;
      } while (!done);
      ElMessage.success('done!');
    } catch (err) {
      if (err instanceof Error) {
        if ((err as any).type === 'MAX_TOKENS') {
          ElMessage.warning('达到最大token');
          ElNotification({
            title: 'stream error',
            message: err.message,
          });
          return;
        }
      }
      throw err;
    }
  };

  const createCompletionNotStream = async () => {
    try {
      const res = await openAiManager.openAiAPi.createCompletion({
        ...genRequestBody(),
      });
      context.value += res.data.choices[0].text || '';
      usage.value = res.data.usage;
    } catch (err) {
      throw err;
    }
  };

  const createCompletion = async () => {
    try {
      usage.value = undefined
      if (formData.value['stream']) {
        const stream = await getCompletionStream();
        await createCompletionFromStream(stream);
      } else {
        await createCompletionNotStream();
      }
    } catch (err) {
      throw err;
    }
  };

  return {
    formData,
    options,
    actionList,
    createCompletion,
    context,
    usage,
  };
});
