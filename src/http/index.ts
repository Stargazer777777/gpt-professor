import axios from 'axios';
import { apiKey, organization } from '@/tmp/index';
import { ElMessage } from 'element-plus';
const openAiInstance = axios.create();

openAiInstance.interceptors.request.use((config) => {
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

export { openAiInstance };
