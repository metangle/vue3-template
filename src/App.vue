<script setup>
// import Site from './views/Site.vue'
import {
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  NNotificationProvider,
  NLayout,
  NScrollbar,
  NEl
} from 'naive-ui'

import { useLocalStore, useThemeStore } from '@/store'
import { computed } from 'vue'

const localStore = useLocalStore()
const themeStore = useThemeStore()

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
            <n-el tag="main" style="height: 100vh">
              <n-scrollbar style="max-height: 100vh">
                <router-view />
              </n-scrollbar>
            </n-el>
          </n-layout>
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped lang="scss"></style>
