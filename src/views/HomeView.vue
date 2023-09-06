<script setup>
import { ref } from 'vue'
import { NButton, NInput } from 'naive-ui'
import { get } from '@/api/request.js'
let inputVal = ref('')

const handleRequest = () => {
  get('/user', { id: 1 })
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <main>
    <n-button type="primary" @click="handleRequest()">按钮</n-button>
    <n-input v-model="inputVal" />
    <input type="text" v-focus />
  </main>
</template>

<style scoped lang="scss"></style>
