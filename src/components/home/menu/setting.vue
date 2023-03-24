<template>
  <el-popover placement="bottom-end" title="设置" width="" trigger="hover" @before-leave="hidePopoverHandler">
    <template #reference
      ><div class="setting">
        <el-icon class="icon" :size="30"> <Setting /> </el-icon></div
    ></template>
    <el-form ref="form" label-position="top" :inline="false" size="default">
        <el-form-item label="apiKey">
            <el-input v-model="openAiManager.apiKey.value" ></el-input>
        </el-form-item>
        <el-form-item label="organization">
            <el-input v-model="openAiManager.organization.value" ></el-input>
        </el-form-item>
    </el-form>
    
  </el-popover>
</template>

<script lang="ts" setup>
    import {openAiManager} from '@/http/apis/openai'
import { ElMessage } from 'element-plus';
    const hidePopoverHandler = ()=> {
        openAiManager.update()
        ElMessage.success('设置更新成功')
    }
</script>

<style lang="scss" scoped>
.setting {
  cursor: pointer;
  .icon {
    vertical-align: middle;
  }
}
</style>
