import axios from 'axios';
import { apiKey, organization } from '@/tmp/index';
import { ElMessage, ElIcon, type MessageHandler } from 'element-plus';
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

const closeMessage = (message: MessageHandler) => {
  if (message) {
    message.close();
  }
};

openAiInstance1.interceptors.request.use(
  (config) => {
    loadingMessage = ElMessage({
      message: h('p', null, [
        h('span', { style: 'vertical-align: middle;' }, '请求中 '),
        h(ElIcon, { class: 'is-loading',style: 'vertical-align: middle;' }, [h(Loading)]),
      ]),
      type: 'info',
      duration: 0,
    });
    return config;
  },
  (error) => {
    closeMessage(loadingMessage);
    ElMessage.error('似乎在请求前出错啦');
    return Promise.reject(error);
  }
);

openAiInstance1.interceptors.response.use(
  (response) => {
    closeMessage(loadingMessage);
    return response;
  },
  (error) => {
    closeMessage(loadingMessage);
    ElMessage.error('出错啦');
    return Promise.reject(error);
  }
);

export { openAiInstance2, openAiInstance1 };
