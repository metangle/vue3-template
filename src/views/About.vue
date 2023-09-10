<script setup name="about">
import { NEl, NCard } from 'naive-ui'
import { onActivated } from 'vue'
onActivated(() => {
  debugger // keepAlive: true 这里会进来
})
</script>

<template>
  <n-card>
    <n-el tag="h3">About Page</n-el>
    <n-el tag="p">这里是About页面, keepAlive: true</n-el>
  </n-card>
</template>

<style scoped lang="scss"></style>
