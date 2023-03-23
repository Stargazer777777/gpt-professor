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
          <el-button class="btn"
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
const actionList: Action[] = [
  {
    name: '清空',
    key: 'clean',
  },
  {
    name: '新对话',
    key: 'new',
  },
];
const act = (key: string) => {
  console.log(key);
};
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
