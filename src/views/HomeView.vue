<script setup name="home">
import { ref, computed } from 'vue'
import { NButton, NInput, NSpace, NEl } from 'naive-ui'
import { get } from '@/api/request.js'

import { RouterLink, RouterView } from 'vue-router'

import { useUserStore, useCommonStore } from '../store'

let inputVal = ref('')

const user = useUserStore()
const common = useCommonStore()

const { setUserInfo, setLoginStatus, userInfo } = user
const { setYear, setMonth } = common

const isLogged = computed(() => user.isLogged)

const year = computed(() => common.year)
const month = computed(() => common.month)
const day = computed(() => common.day)

const handleUserInfo = () => {
  setUserInfo({ isLogged: false, age: 100 })
  setLoginStatus(false)
}
const handleCommon = () => {
  setYear(2025)
  setMonth(12)
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
  <div>这里是Home页面</div>
  <n-space vertical>
    <n-space vertical>
      <n-button type="primary" @click="handleRequest()">点击请求</n-button>
      <n-input v-model="inputVal" />
      <n-space> 指令：<input type="text" v-focus /> </n-space>
    </n-space>
    <n-space>
      <n-button @click="handleUserInfo">修改</n-button>
      <n-button>姓名： {{ userInfo.name }}</n-button>
      <n-button>年龄： {{ userInfo.age }}</n-button>
      <n-button>是否登录: {{ isLogged }}</n-button>
    </n-space>
    <n-space>
      <n-button @click="handleCommon">修改(year: 持久化)</n-button>
      <n-button>年月日 : {{ year }}-{{ month }}-{{ day }}</n-button>
    </n-space>
  </n-space>

  <router-link to="/test">点我去Home的子页面</router-link>
  <router-view v-slot="{ Component }">
    <transition name="router_animate">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped lang="scss"></style>
