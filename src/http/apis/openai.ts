import { OpenAIApi, Configuration } from '@/openai';

class OpenAiManager {
  openAiAPi: OpenAIApi = new OpenAIApi();

  update(apiKey: string, organization: string) {
    const configuration = new Configuration({ apiKey, organization });
    this.openAiAPi = new OpenAIApi(configuration);
    return this.openAiAPi;
  }
}

export const openAiManager = new OpenAiManager();
