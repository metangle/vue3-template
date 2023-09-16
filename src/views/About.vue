<script setup name="about">
import { NEl, NCard } from 'naive-ui'
import { onActivated } from 'vue'
import hamsterJson from '@/assets/lottie/hamster.json'
import rocketJson from '@/assets/lottie/rocket.json'
console.log(hamsterJson)
onActivated(() => {
  debugger // keepAlive: true 这里会进来
})
</script>

<template>
  <n-card>
    <n-el tag="h3">About Page</n-el>
    <n-el tag="p">这里是About页面, keepAlive: true</n-el>
    <u-lottie :jsonData="hamsterJson" />
    <u-lottie :jsonData="rocketJson" />
  </n-card>
</template>

<style scoped lang="scss"></style>
