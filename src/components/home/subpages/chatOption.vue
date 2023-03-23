<template>
  <div class="container">
    <el-card shadow="always" class="card">
      <template #header>
        <div class="card-header">
          <div class="title">title</div>
        </div>
      </template>
      <template #default>
        <div class="card-content">
          <el-form
            :model="formData"
            ref="form"
            label-width="200px"
            label-position="top"
            :inline="false"
            size="default"
          >
            <el-form-item :label="item.name" v-for="item in options">
              <el-input
                v-if="item.type === 'input'"
                v-model="formData[item.key]"
              ></el-input>
              <el-select
                v-if="item.type === 'select'"
                v-model="formData[item.key]"
                clearable
                filterable
                @change=""
              >
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :label="option.name"
                  :value="option.value"
                >
                </el-option>
              </el-select>
              <el-slider
                v-if="item.type === 'slider'"
                v-model="formData[item.key]"
                :min="item.range?.start"
                :max="item.range?.end"
                :step="0.01"
                @change=""
              >
              </el-slider>
              <el-switch
                v-if="item.type === 'switch'"
                v-model="formData[item.key]"
                :active-value="true"
                :inactive-value="false"
                @change=""
              >
              </el-switch>
              <el-input
                v-if="item.type === 'textarea'"
                v-model="formData[item.key]"
                type="textarea"
                clearable
                resize="none"
                :autosize="{ minRows: 2, maxRows: 6 }"
                :maxlength="2000"
                show-word-limit
                @change=""
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

type Types = 'input' | 'select' | 'slider' | 'switch' | 'textarea';

type Option = {
  name: string;
  key: string;
  type: Types;
  options?: Array<{ name: string; value: any }>;
  range?: { start: number; end: number };
  default?: any;
};

const options: Option[] = [
  {
    name: 'input',
    key: 'inputkey',
    type: 'input',
    default: 'xxx',
  },
  {
    name: 'select',
    key: 'selectKey',
    type: 'select',
    options: [
      {
        name: 'op1',
        value: 'op1',
      },
      {
        name: 'op2',
        value: 'op2',
      },
    ],
    default: 'op2',
  },
  {
    name: 'slider',
    key: 'sliderKey',
    type: 'slider',
    default: 1,
    range: { start: 0, end: 2 },
  },
  {
    name: 'switch',
    key: 'switchKey',
    type: 'switch',
    default: true,
  },
  {
    name: 'textarea',
    key: 'textareaKey',
    type: 'textarea',
    default: 'xxx',
  },
];
const formData = ref<Record<string, any>>({
  inputKey: '',
});

options.forEach((item) => {
  formData.value[item.key] = item.default || null;
});
</script>

<style scoped lang="scss">
.container {
  .card {
    width: 100%;
  }
}
</style>
