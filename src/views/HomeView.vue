<script setup>
import { ref } from 'vue'
import { NButton, NInput } from 'naive-ui'

let inputVal = ref('')
</script>

<template>
  <main>
    <n-button type="primary">按钮</n-button>
    <n-input v-model="inputVal" />
    <input type="text" v-focus />
  </main>
</template>

<style scoped lang="scss"></style>
