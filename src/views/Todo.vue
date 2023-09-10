<script setup name="site">
import { ref } from 'vue'
import { NCheckboxGroup, NCheckbox, NSpace, NEl, NCard } from 'naive-ui'

const done = ref(['article'])
</script>

<template>
  <n-card vertical>
    <n-el tag="h4">Todo Tasks</n-el>
    <n-checkbox-group v-model:value="done">
      <n-space vertical>
        <n-checkbox value="article" label="写一篇作文" />
        <n-checkbox value="cat" label="养一只猫" />
        <n-checkbox value="man" label="帮助一位老人" />
      </n-space>
    </n-checkbox-group>
  </n-card>
</template>

<style scoped lang="scss"></style>
