<script setup name="site">
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { NButton, NSpace } from 'naive-ui'
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
    <n-space vertical>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <n-space>
        <n-button @click="changeLanguage">{{ currentLang.label }}</n-button>
        <n-button @click="changeTheme">{{ currentTheme.label }}</n-button>
      </n-space>

      <n-space>
        <router-link to="/">{{ $t(`title.home`) }}</router-link>
        <router-link to="/about">{{ $t(`title.about`) }}</router-link>
      </n-space>
    </n-space>

    --------------------------------
    <n-space> Router View </n-space>
    <router-view />
  </n-space>

  <!-- <router-view v-slot="{ Component, route }">
    <transition :name="route.meta.transition || 'fade'" mode="out-in">
      <n-el tag="main">
        <keep-alive>
          <component :is="Component" :key="route.meta.usePathKey ? route.path : undefined" />
        </keep-alive>
      </n-el>
    </transition>
  </router-view> -->
</template>

<style scoped lang="scss"></style>
