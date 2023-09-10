<script setup name="index">
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { NButton, NSpace, NCard } from 'naive-ui'
import { useLocalStore, useThemeStore } from '@/store'

const localStore = useLocalStore()
const themeStore = useThemeStore()

const currentLang = computed(() => localStore.currentLang)
const currentTheme = computed(() => themeStore.currentTheme)

const { changeLanguage } = localStore
const { changeTheme } = themeStore
</script>

<template>
  <n-space vertical>
    <n-card>
      <n-space vertical style="margin-bottom: 50px">
        <n-space>
          <n-button @click="changeLanguage">{{ currentLang.label }}</n-button>
          <n-button @click="changeTheme">{{ currentTheme.label }}</n-button>
        </n-space>

        <n-space>
          <router-link to="/">{{ $t(`title.home`) }}</router-link>
          <router-link to="/about">{{ $t(`title.about`) }}</router-link>
        </n-space>
      </n-space>
    </n-card>
  </n-space>

  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component v-if="route.meta.keepAlive" :is="Component" :key="route.name" />
    </keep-alive>
    <component v-if="!route.meta.keepAlive" :is="Component" :key="route.name" />
  </router-view>
</template>

<style scoped lang="scss"></style>
