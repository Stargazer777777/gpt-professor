import { OpenAIApi, Configuration } from '@/openai';
import { ref } from 'vue';
import {OpenAI as streamOpenAi,} from 'openai-streams'

class OpenAiManager {
  apiKey = ref<string>('');
  organization = ref<string>('');
  openAiAPi: OpenAIApi = new OpenAIApi();
  streamApi = streamOpenAi
  private storageKey: string = 'openAiConfig';

  constructor() {
    const storegeConfigJson = localStorage.getItem(this.storageKey);
    if (storegeConfigJson) {
      const storegeConfig = JSON.parse(storegeConfigJson);
      this.apiKey.value = storegeConfig['apiKey'];
      this.organization.value = storegeConfig['organization'];
      this.update();
    }
  }

  update() {
    const configuration = new Configuration({
      apiKey: this.apiKey.value,
      organization: this.organization.value,
    });
    window.localStorage.setItem(
      this.storageKey,
      JSON.stringify({ apiKey: this.apiKey.value, organization: this.organization.value })
    );

    this.openAiAPi = new OpenAIApi(configuration);
    return this.openAiAPi;
  }

}

export const openAiManager = new OpenAiManager();
