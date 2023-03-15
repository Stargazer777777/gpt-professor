<template>
  <div class="box">
    <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <div class="role">system</div>
      </div>
    </template>
    <template #default>
        <div class="content">
            daawfakfjawdjailwfhawk
        </div>
    </template>
  </el-card>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.box {
    margin: 20px;
    .card-header {
        display: flex;
        justify-content: left;
        .role {
            padding: 5px 10px;
            background-color: skyblue;
            border-radius: 10px;
            color: #fff;
        }
    }
}
</style>
