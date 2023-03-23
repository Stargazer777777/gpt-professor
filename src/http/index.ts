import axios from 'axios';
import { apiKey, organization } from '@/tmp/index';
import { ElMessage } from 'element-plus';
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
openAiInstance1.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { openAiInstance2, openAiInstance1 };
