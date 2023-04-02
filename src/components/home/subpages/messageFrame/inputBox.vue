<template>
  <div class="box">
    <el-input
      v-model="text"
      placeholder="请输入内容"
      type="textarea"
      maxlength="4096"
      :autosize="{ minRows: 2, maxRows: 6 }"
      show-word-limit
      resize="none"
      class="ipt"
      @keydown="keydownHandler"
    ></el-input>
    <div class="op-box">
      <div class="optional-operate">
        <el-button
          type="primary"
          plain
          size="default"
          @click="emits('on-operateAct', item.key)"
          v-for="item in actionList"
          >{{ item.name }}</el-button
        >
      </div>
      <el-button
        class="submit"
        :disabled="submitDisable"
        type="primary"
        size="default"
        @click="submit"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ElMessage } from 'element-plus';
import type { OperateAction } from '@/declare/common';

type Props = {
  actionList: Array<OperateAction>;
};
const props = defineProps<Props>();

const text = ref('');
const submitDisable = computed(() => {
  return text.value == '';
});
const emits = defineEmits(['on-submit', 'on-operateAct']);
const submit = () => {
  if (text.value != '') {
    emits('on-submit', text.value);
    setTimeout(() => {
      text.value = '';
    });
  } else {
    ElMessage.error('请输入内容');
  }
};

const keydownHandler = (e: KeyboardEvent) => {
  if (e.shiftKey && e.key === 'Enter') {
  } else if (e.key === 'Enter') {
    submit();
  }
};
</script>

<style scoped lang="scss">
.box {
  .op-box {
    display: flex;
    .optional-operate {
      flex: 1;
    }
  }
}
</style>
