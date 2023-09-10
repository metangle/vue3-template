<script setup>
import { RouterLink } from 'vue-router'
import Site from './views/Site.vue'
import {
  NButton,
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  NNotificationProvider,
  NLayout
} from 'naive-ui'

import { useLocalStore, useThemeStore } from '@/store'
import { computed } from 'vue'

const localStore = useLocalStore()
const themeStore = useThemeStore()

const { changeLanguage } = localStore
const { changeTheme } = themeStore

const currentLang = computed(() => localStore.currentLang)
const currentTheme = computed(() => themeStore.currentTheme)
</script>

<template>
  <n-config-provider
    :locale="currentLang.locale"
    :date-locale="currentLang.dateLocal"
    :theme="currentTheme.data"
    preflight-style-disabled
  >
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <n-layout>
            <header>
              <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
              <div>
                <n-button @click="changeLanguage">切换语言-{{ currentLang.label }}</n-button>
              </div>
              <div>
                <n-button @click="changeTheme">切换主题-{{ currentTheme.label }}</n-button>
              </div>

              <nav>
                <RouterLink to="/">{{ $t(`nav.Home`) }}</RouterLink>
                <RouterLink to="/about">{{ $t(`nav.About`) }}</RouterLink>
              </nav>
            </header>
            <site />
          </n-layout>
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped lang="scss"></style>
