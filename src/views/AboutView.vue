<script setup>
import { NEl } from 'naive-ui'
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <n-el
      tag="span"
      style="color: var(--primary-color); transition: 0.3s var(--cubic-bezier-ease-in-out)"
    >
      我是个 span 标签
    </n-el>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
