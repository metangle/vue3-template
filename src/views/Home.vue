<script setup name="home">
import { ref, computed } from 'vue'
import { NButton, NInput, NSpace, NEl, NCard } from 'naive-ui'
import { get } from '@/api/request.js'

import { RouterLink, RouterView } from 'vue-router'

import { useUserStore, useCommonStore } from '../store'

let inputVal = ref('')

const user = useUserStore()
const common = useCommonStore()

const { userInfo, setUserInfo } = user
const { setYear, setMonth, setDay } = common

const isLogged = computed(() => user.isLogged)

const year = computed(() => common.year)
const month = computed(() => common.month)
const day = computed(() => common.day)

const handleUserInfo = () => {
  setUserInfo({ age: 29 })
}
const handleCommon = () => {
  setYear(2025)
  setMonth(6)
  setDay(18)
}

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
  <n-card>
    <n-el tag="h3">Home Page</n-el>
    <n-space vertical>
      <n-space vertical>
        <n-button type="primary" @click="handleRequest()">发送请求</n-button>

        <n-space> 指令：<n-input v-model="inputVal" v-focus /> </n-space>
      </n-space>
      <n-space>
        <n-button @click="handleUserInfo">修改年龄</n-button>
        <n-el tag="span"> 姓名： {{ userInfo.name }} 年龄： {{ userInfo.age }} </n-el>
      </n-space>
      <n-space>
        <n-button @click="handleCommon">修改年月日(持久化储存)</n-button>
        <n-el tag="span"> 年月日 : {{ year }}-{{ month }}-{{ day }} </n-el>
      </n-space>
    </n-space>
  </n-card>

  <router-link to="/todo">点我去Home的子页面-Todo页面</router-link>
  <router-view v-slot="{ Component }">
    <transition name="router_animate">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped lang="scss"></style>
