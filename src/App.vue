<script setup>
import { RouterLink } from 'vue-router'
import Site from './views/Site.vue'
import {
  NButton,
  NSpace,
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
            <n-space vertical>
              <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
              <n-space>
                <n-button @click="changeLanguage">{{ currentLang.label }}</n-button>
                <n-button @click="changeTheme">{{ currentTheme.label }}</n-button>
              </n-space>

              <n-space>
                <RouterLink to="/">{{ $t(`title.home`) }}</RouterLink>
                <RouterLink to="/about">{{ $t(`title.about`) }}</RouterLink>
              </n-space>
            </n-space>
            <site />
          </n-layout>
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped lang="scss"></style>
