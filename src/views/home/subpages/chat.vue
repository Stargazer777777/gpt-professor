<template>
  <div class="container">
    <div class="op-box">
      <chatOperate :action-list="store.actionList" @on-act="operateAct"></chatOperate>
    </div>
    <div class="frame">
      <ChatFrame></ChatFrame>
    </div>
    <div class="option">
      <ChatOption
        :options="store.options"
        @on-form-update="updateFrom"
      ></ChatOption>
    </div>
  </div>
</template>

<script setup lang="ts">
import ChatFrame from '@/components/home/subpages/chatFrame.vue';
import chatOperate from '@/components/home/subpages/chatOperate.vue';
import ChatOption from '@/components/home/subpages/chatOption.vue';
import { useChatStore } from '@/stores/modules/chat';
const store = useChatStore();
const updateFrom = (formData: Record<string, any>) => {
  store.formData = formData;
};
const operateAct = (actionKey:string)=> {
  console.log(actionKey);
  
}

</script>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  .op-box {
    flex: 1;
    padding: 20px;
  }
  .frame {
    flex: 2;
    height: calc(100vh - 100px);
    min-height: 500px;
  }
  .option {
    flex: 1;
    padding: 20px;
  }
}
</style>
