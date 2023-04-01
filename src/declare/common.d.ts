export type Option = {
  name: string;
  key: string;
  type: Types;
  options?: Array<{ name: string; value: any }>;
  range?: { start: number; end: number; step: number };
  default?: any;
  disabled?:boolean;
};

export type Types =
  | 'input'
  | 'select'
  | 'slider'
  | 'switch'
  | 'textarea'
  | 'number';

  export type OperateAction = {
    name: string;
    key: string;
  }

  export interface RequestMessage {
    role: 'assistant' | 'user' | 'system';
    content: string;
  }
  
  export interface ChatMessage extends RequestMessage {
    status: boolean;
    headPosition: 'left' | 'right';
    usage?: {
      completion_tokens: number;
      prompt_tokens: number;
      total_tokens: number;
    };
  }