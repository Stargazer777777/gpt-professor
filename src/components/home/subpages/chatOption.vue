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
import { ref, watch } from 'vue';
import type { Option } from '@/declares/chatOption';

type Props = {
  options: Option[];
};
const props = defineProps<Props>();

const formData = ref<Record<string, any>>({});

props.options.forEach((item) => {
  formData.value[item.key] = item.default || null;
});

const emits = defineEmits(['on-formUpdate']);

watch(formData.value, () => {
  console.log('here');
  
  emits('on-formUpdate', formData.value);
});
</script>

<style scoped lang="scss">
.container {
  .card {
    width: 100%;
  }
}
</style>
