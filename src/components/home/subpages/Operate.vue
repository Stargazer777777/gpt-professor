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
          <el-button
            class="btn"
            v-for="item in actionList"
            :key="item.key"
            type="primary"
            plain
            size="large"
            @click="act(item.key)"
            >{{ item.name }}</el-button
          >
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup lang="ts">
type Action = {
  name: string;
  key: string;
};

type Props = {
  actionList: Action[];
  title?:string
};
const props = defineProps<Props>();

const act = (key: string) => {
  emit('on-act', key);
};
const emit = defineEmits(['on-act']);
</script>

<style scoped lang="scss">
.container {
  .card {
    width: 100%;
    .card-content {
      display: flex;
      flex-wrap: wrap;
      .btn {
        width: 100%;
        margin: 5px;
      }
    }
  }
}
</style>
