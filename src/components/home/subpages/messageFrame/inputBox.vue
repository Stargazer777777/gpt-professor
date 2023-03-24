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
    ></el-input>
    <div class="op-box">
      <el-button class="btn" type="primary" size="default" @click="submit">提交</el-button>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const text = ref('');
const emits = defineEmits(['on-submit'])
const submit = () => {
  emits('on-submit',text.value)
};
</script>

<style scoped lang="scss">
.box {
  .op-box {
    display: flex;
    justify-content: flex-end;
    
  }
}
</style>
