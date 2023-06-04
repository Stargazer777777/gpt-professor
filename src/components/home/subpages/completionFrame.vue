<template>
  <div class="context">
    <v-md-editor
      class="content"
      :mode="mdModel"
      v-model="context"
      height="75vh"
    ></v-md-editor>
  </div>
  <div class="panel">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <el-row>
        <el-col :span="18" :offset="0">
          <div class="action-list">
            <el-button
              v-for="action in actionList"
              class="action-item"
              type="primary"
              size="default"
              @click="emit('on-act', action.key)"
              >{{ action.name }}</el-button
            >
            <div class="action-item">
              <el-radio-group v-model="mdModel">
                <el-radio label="preview" size="default">预览</el-radio>
                <el-radio label="edit" size="default">编辑</el-radio>
                <el-radio label="editable" size="default">编辑预览</el-radio>
              </el-radio-group>
            </div>
          </div>
        </el-col>
        <el-col :span="6" :offset="0">
          <div class="usage" v-if="usage">
            <div class="usage-item">
              <span class="name">参数使用：</span>
              <span class="value">{{ usage.prompt_tokens }}</span>
            </div>
            <div class="usage-item">
              <span class="name">结果使用：</span>
              <span class="value">{{ usage.completion_tokens }}</span>
            </div>
            <div class="usage-item">
              <span class="name">total：</span>
              <span class="value">{{ usage.total_tokens }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import type { CreateCompletionResponseUsage } from '@/openai';
import { ref, watch } from 'vue';
type Props = {
  modelValue: string;
  actionList: Array<{ key: string; name: string }>;
  usage?: CreateCompletionResponseUsage;
};

const props = defineProps<Props>();
const emit = defineEmits(['on-act', 'update:modelValue']);

const mdModel = ref<'edit' | 'editable' | 'preview'>('edit');

const context = ref<string>(props.modelValue);
watch(
  () => props.modelValue,
  () => {
    context.value = props.modelValue;
  }
);
watch(
  () => context.value,
  () => {
    emit('update:modelValue', context.value);
  }
);
</script>

<style lang="scss" scoped>
.panel {
  margin-top: 20px;

  .action-list {
    display: flex;
    .action-item {
      margin: 0 5px;
    }
  }
  .usage {
    display: flex;
    border: 1px solid #409eff;
    border-radius: 5px;
    .usage-item {
      margin: 0 5px;
      padding: 5px;
      span {
        display: inline-block;
        vertical-align: middle;
      }
      .value {
        background-color: skyblue;
        border-radius: 5px;
        color: #fff;
        padding: 0 5px;
      }
    }
  }
}
</style>
