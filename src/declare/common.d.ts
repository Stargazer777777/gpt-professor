export type Option = {
  name: string;
  key: string;
  type: Types;
  options?: Array<{ name: string; value: any }>;
  range?: { start: number; end: number; step: number };
  default?: any;
};

export type Types =
  | 'input'
  | 'select'
  | 'slider'
  | 'switch'
  | 'textarea'
  | 'number';
