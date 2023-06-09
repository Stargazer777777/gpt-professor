<template>
  <div class="box">
    <el-icon class="close" :size="20" @click="emit('on-clickClose', index)">
      <Close />
    </el-icon>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <div class="role header-item">{{ chatMessage.role }}</div>
          <div class="status header-item">
            <el-switch
              v-if="showStatus"
              v-model="chatMessage.status"
              class="ml-2"
              style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: #ff4949;
              "
            />
          </div>
          <div class="edit header-item">
            <el-radio-group v-model="mdModel">
              <el-radio label="preview" size="default">预览</el-radio>
              <el-radio label="edit" size="default">编辑</el-radio>
              <el-radio label="editable" size="default">编辑预览</el-radio>
            </el-radio-group>
          </div>
          <div class="usage header-item" v-if="chatMessage.usage">
            <div class="usage-item">
              <span class="name">参数使用：</span>
              <span class="value">{{ chatMessage.usage.prompt_tokens }}</span>
            </div>
            <div class="usage-item">
              <span class="name">结果使用：</span>
              <span class="value">{{
                chatMessage.usage.completion_tokens
              }}</span>
            </div>
            <div class="usage-item">
              <span class="name">total：</span>
              <span class="value">{{ chatMessage.usage.total_tokens }}</span>
            </div>
          </div>
        </div>
      </template>
      <template #default>
        <v-md-editor
          class="content"
          :mode="mdModel"
          v-model="chatMessage.content"
        ></v-md-editor>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from '@/declare/common';
import { computed, ref } from 'vue';
import { Close } from '@element-plus/icons-vue';

type Props = {
  chatMessage: ChatMessage;
  showStatus: boolean;
  index: number;
  defaultMdModle?: 'edit' | 'editable' | 'preview';
};

const mdModel = ref<'edit' | 'editable' | 'preview'>('preview');

const props = defineProps<Props>();

if (props.defaultMdModle) {
  mdModel.value = props.defaultMdModle;
}
const position = computed(() => {
  return props.chatMessage.headPosition;
});

const emit = defineEmits(['on-clickClose']);
</script>

<style scoped lang="scss">
.box {
  position: relative;
  margin: 20px;
  .close {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 5;
    box-shadow: 0 0 2px rgba($color: #000000, $alpha: 0.3);
    cursor: pointer;
    &:hover {
      color: #539cfe;
      box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.3);
    }
  }
  .card-header {
    display: flex;
    justify-content: v-bind(position);
    align-items: center;
    .header-item {
      margin: 0 5px;
    }
    .role {
      padding: 5px 10px;
      background-color: skyblue;
      border-radius: 10px;
      color: #fff;
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
}
</style>
