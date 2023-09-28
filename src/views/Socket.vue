<script setup name="about">
import { NEl, NCard, NInput, NButton, NSpace } from 'naive-ui'
import { onMounted, ref } from 'vue'
import socket from '@/util/socket.js'
// import SocketService from '@/util/socket.js'

let inputVal = ref('Allen')
let receiveInfo = ref('')

const handleSubmit = () => {
  socket.emit('sendMessage', {
    data: { name: inputVal.value }
  })
}

onMounted(() => {
  socket.on('connect', () => {
    socket.on('back', function (params) {
      console.log('socket传来数据--', params)
      receiveInfo.value = params.data.hello
    })
  })
})
</script>

<template>
  <n-card>
    <n-el tag="h2">Socket</n-el>
    <n-space>
      请输入您的姓名：<n-input v-model:value="inputVal" />
      <n-button type="primary" @click="handleSubmit">确定</n-button>
    </n-space>
    <n-space> 收到消息：{{ receiveInfo }} </n-space>
  </n-card>
</template>

<style scoped lang="scss"></style>
