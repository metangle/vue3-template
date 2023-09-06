<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { NButton } from 'naive-ui'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()
const changeLanguage = () => {
  console.log('local.value', locale.value)
  console.log('t===', t('nav.Home'))
  locale.value = locale.value === 'en' ? 'zh' : 'en'
}
</script>

<template>
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
</template>

<style scoped lang="scss"></style>
