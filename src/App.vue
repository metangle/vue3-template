<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { NConfigProvider, zhCN, enUS, dateZhCN, dateEnUS, NButton } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { computed, ref, reactive } from 'vue'

const { locale, t } = useI18n()

const changeLanguage = () => {
  try {
    console.log('test-t-nav.Home===', t('nav.Home'))
    locale.value = locale.value === 'en' ? 'zh' : 'en'
  } catch (e) {
    console.error('[changeLanguage error]: ', e)
  }
}

const componentLang = computed(() => {
  return locale.value === 'en'
    ? {
        locale: enUS,
        dateLocal: dateEnUS
      }
    : {
        locale: zhCN,
        dateLocal: dateZhCN
      }
})
</script>

<template>
  <n-config-provider :locale="componentLang.locale" :date-locale="componentLang.dateLocal">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
      <div>
        <n-button @click="changeLanguage">切换语言</n-button>
      </div>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">{{ $t(`nav.Home`) }}</RouterLink>
          <RouterLink to="/about">{{ $t(`nav.About`) }}</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </n-config-provider>
</template>

<style scoped lang="scss"></style>
