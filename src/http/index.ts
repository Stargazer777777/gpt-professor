import axios, { AxiosError } from 'axios';
import { apiKey, organization } from '@/tmp/index';
import {
  ElMessage,
  ElIcon,
  type MessageHandler,
  ElNotification,
} from 'element-plus';
import { Loading } from '@element-plus/icons-vue';
import { h } from 'vue';
// 自定义的实例
const openAiInstance2 = axios.create();

openAiInstance2.interceptors.request.use((config) => {
  if (!apiKey) {
    ElMessage.error('似乎没有填apiKey呢');
    return Promise.reject('without apiKey');
  }
  if (!organization) {
    ElMessage.error('似乎没有填organization呢');
    return Promise.reject('without organization');
  }
  config.headers['Authorization'] = 'Bearer ' + apiKey;
  config.headers['organization '] = organization;
  return config;
});

// 官方提供的openAI库的axios实例
const openAiInstance1 = axios.create();

let loadingMessage: MessageHandler;

export const closeMessage = (message: MessageHandler) => {
  if (message) {
    message.close();
  }
};

export const showLoadingMessage = (title: string): MessageHandler => {
  return ElMessage({
    message: h('p', null, [
      h('span', { style: 'vertical-align: middle;' }, title),
      h(ElIcon, { class: 'is-loading', style: 'vertical-align: middle;' }, [
        h(Loading),
      ]),
    ]),
    type: 'info',
    duration: 0,
  });
};

openAiInstance1.interceptors.request.use(
  (config) => {
    loadingMessage = showLoadingMessage('请求中');
    return config;
  },
  (error) => {
    closeMessage(loadingMessage);
    ElMessage.error('似乎在请求前出错啦');
    return Promise.reject(error);
  }
);
export const axiosRespnseErrorHandler = (error: AxiosError) => {
  let title = '';
  if (error.code === 'ERR_NETWORK') {
    ElMessage.error('请求超时，请确定你是否能连上openAI');
  } else if (error.response?.status === 401) {
    ElMessage.error('apiKey或organization错误，如果没填请在右上角填写');
    title = '401 error';
  } else if (error.response?.status === 404) {
    ElMessage.error('not found');
    title = '404 error';
  } else if (error.response?.status === 429) {
    ElMessage.error('你已达请求限制或服务器繁忙');
    title = '429 error';
  } else if (error.response?.status === 500) {
    ElMessage.error('服务器错误');
    title = '500 error';
  } else {
    ElMessage.error('未知错误');
    title = 'unknown error';
  }
  if (error.response) {
    ElNotification({
      title: title,
      message: (error.response.data as any).error.message,
      duration: 0,
    });
  }
  return Promise.reject(error);
};
openAiInstance1.interceptors.response.use(
  (response) => {
    closeMessage(loadingMessage);
    return response;
  },
  (error) => {
    closeMessage(loadingMessage);
    if (error instanceof Error) {
      if (error instanceof AxiosError) {
        return axiosRespnseErrorHandler(error);
      }
    }
    ElMessage.error('出错啦');
    return Promise.reject(error);
  }
);

export { openAiInstance2, openAiInstance1 };
