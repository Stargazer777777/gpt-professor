<template>
  <div class="container">
    <el-card shadow="always" class="card">
      <template #header>
        <div class="card-header">
          <div class="title">{{ title }}</div>
        </div>
      </template>
      <template #default>
        <div class="card-content">
          <el-scrollbar>
            <el-form
              :model="tempFormData"
              ref="form"
              label-width="200px"
              label-position="top"
              :inline="false"
              size="default"
            >
              <el-form-item :label="item.name" v-for="item in options">
                <el-input
                  v-if="item.type === 'input'"
                  v-model="tempFormData[item.key]"
                  :disabled="item.disabled"
                ></el-input>
                <el-select
                  v-if="item.type === 'select'"
                  v-model="tempFormData[item.key]"
                  clearable
                  filterable
                  :disabled="item.disabled"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.name"
                    :value="option.value"
                    :disabled="item.disabled"
                  >
                  </el-option>
                </el-select>
                <el-slider
                  v-if="item.type === 'slider'"
                  v-model="tempFormData[item.key]"
                  :min="item.range?.start"
                  :max="item.range?.end"
                  :step="item.range?.step"
                  :disabled="item.disabled"
                >
                </el-slider>
                <el-input-number
                  v-if="item.type === 'number'"
                  v-model="tempFormData[item.key]"
                  :min="item.range?.start"
                  :max="item.range?.end"
                  :step="item.range?.step"
                  :controls="true"
                  :disabled="item.disabled"
                >
                </el-input-number>
                <el-switch
                  v-if="item.type === 'switch'"
                  v-model="tempFormData[item.key]"
                  :active-value="true"
                  :inactive-value="false"
                  :disabled="item.disabled"
                >
                </el-switch>
                <el-input
                  v-if="item.type === 'textarea'"
                  v-model="tempFormData[item.key]"
                  type="textarea"
                  clearable
                  resize="none"
                  :autosize="{ minRows: 2, maxRows: 6 }"
                  :maxlength="32000"
                  show-word-limit
                  :disabled="item.disabled"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-scrollbar>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Option } from '@/declare/common';

type Props = {
  options: Option[];
  modelValue: Record<string, any>;
  title?:string
};
const props = defineProps<Props>();
const tempFormData = ref<Record<string, any>>({
  ...props.modelValue,
});
const emit = defineEmits(['update:modelValue']);

watch(tempFormData.value, () => {
  emit('update:modelValue', tempFormData.value);
});
</script>

<style scoped lang="scss">
.container {
  .card {
    .card-content {
      height: calc(100vh - 300px);
      min-height: 300px;
      .el-form {
        padding: 0 20px;
      }
    }
  }
}
</style>
