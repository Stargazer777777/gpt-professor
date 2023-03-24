import { OpenAIApi, Configuration } from '@/openai';
import { ref } from 'vue';

class OpenAiManager {
  apiKey = ref<string>('');
  organization = ref<string>('');
  openAiAPi: OpenAIApi = new OpenAIApi();

  update() {
    const configuration = new Configuration({
      apiKey: this.apiKey.value,
      organization: this.organization.value,
    });
    console.log(configuration);
    
    this.openAiAPi = new OpenAIApi(configuration);
    return this.openAiAPi;
  }
}

export const openAiManager = new OpenAiManager();
