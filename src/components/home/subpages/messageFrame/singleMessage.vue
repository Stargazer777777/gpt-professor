<template>
  <div class="box">
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
        </div>
      </template>
      <template #default>
        <div class="content">{{ chatMessage.content }}</div>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { ChatMessage } from '@/stores/modules/chat';
import { computed } from 'vue';
type Props = {
  chatMessage: ChatMessage;
  showStatus: boolean;
};

const props = defineProps<Props>();
const position = computed(() => {
  return props.chatMessage.headPosition;
});
</script>

<style scoped lang="scss">
.box {
  margin: 20px;
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
  }
}
</style>
