<template>
  <div class="container">
    <div class="option">
      <el-affix :offset="60">
        <aiOption
          v-model="store.formData"
          :options="store.options"
          title="选项"
        ></aiOption>
      </el-affix>
    </div>

    <div class="frame">
      <completionFrame
        v-model="store.context"
        :action-list="store.actionList"
        :usage="store.usage"
        @on-act="operateAct"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import completionFrame from '@/components/home/subpages/completionFrame.vue';
import aiOption from '@/components/home/subpages/aiOption.vue';
import History from '@/components/home/subpages/history.vue';
import { ref } from 'vue';
import { useCompletiontore } from '@/stores/modules/completion';
const store = useCompletiontore();

const operateAct = (actionKey: string) => {
  switch (actionKey) {
    case 'clear':
      store.context = '';
      break;
    case 'start':
      store.createCompletion();
      break;
    default:
      break;
  }
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  .frame {
    flex: 1;
    min-height: 90vh;
  }
  .option {
    padding: 0 20px;
  }
}
</style>
