<script setup name="home">
import { ref, computed, onMounted, onActivated, getCurrentInstance } from 'vue'
import { NButton, NInput, NSpace, NEl, NCard, useMessage } from 'naive-ui'
import { watchDocumentScroll } from '@/util'

import { RouterLink, RouterView } from 'vue-router'

const { proxy } = getCurrentInstance()

import { useUserStore, useCommonStore } from '../store'

let inputVal = ref('')

const user = useUserStore()
const common = useCommonStore()
const message = useMessage()

const { userInfo, setUserInfo } = user
const { setYear, setMonth, setDay } = common

const year = computed(() => common.year)
const month = computed(() => common.month)
const day = computed(() => common.day)
const handleUserInfo = () => {
  setUserInfo({ age: 29 })
}
const handleCommon = () => {
  setYear(2025)
  setMonth(6)
  setDay(18)
}

const handleRequest = () => {
  proxy
    .$get(proxy.$api.KNOWLEDGE, { id: 1, page: 1, pageSize: 20 })
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.error(e)
      message.warning(e)
    })
  proxy
    .$post(proxy.$api.KNOWLEDGE, { title: '如何开发vue项目' })
    .then((res) => {
      console.log(res)
    })
    .catch((e) => {
      console.error(e)
      message.warning(e)
    })
}

onActivated(() => {
  // debugger // keepAlive: false 默认这里不会进来 但是子路由如果keepAlive true, 则这里会进来
})
onMounted(() => {
  watchDocumentScroll((direction) => {
    console.log('direction--', direction)
  }, true)
})
</script>

<template>
  <div>
    <n-card>
      <n-el tag="h3">Home Page</n-el>
      <n-el tag="h3">这里是Home Page keepAlive: false</n-el>
      <n-space vertical>
        <n-space vertical>
          <n-button type="primary" @click="handleRequest()">发送请求</n-button>

          <n-space> 指令：<n-input v-model="inputVal" v-focus /> </n-space>
        </n-space>
        <n-space>
          <n-button @click="handleUserInfo">修改年龄</n-button>
          <n-el tag="span"> 姓名： {{ userInfo.name }} 年龄： {{ userInfo.age }} </n-el>
        </n-space>
        <n-space>
          <n-button @click="handleCommon">修改年月日(持久化储存)</n-button>
          <n-el tag="span"> 年月日 : {{ year }}-{{ month }}-{{ day }} </n-el>
        </n-space>
      </n-space>
    </n-card>

    <router-link to="/todo">点我去Home的子页面-Todo页面</router-link>
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition">
        <keep-alive>
          <component v-if="route.meta.keepAlive" :is="Component" :key="route.name" />
        </keep-alive>
      </transition>

      <transition :name="route.meta.transition">
        <component v-if="!route.meta.keepAlive" :is="Component" :key="route.name" />
      </transition>
    </router-view>

    <n-el tag="article">
      盼望着，盼望着，东风来了，春天的脚步近了。
      一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。
      小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。
      桃树，杏树，梨树，你不让我，我不让你，都开满了花赶趟儿。红的像火，粉的像霞，白的像雪。花里带着甜味；闭了眼，树上仿佛已经满是桃儿，杏儿，梨儿。花下成千成百的蜜蜂嗡嗡的闹着，大小的蝴蝶飞来飞去。野花遍地是：杂样儿，有名字的，没名字的，散在草丛里像眼睛像星星，还眨呀眨。
      “吹面不寒杨柳风”，不错的，像母亲的手抚摸着你，风里带着些心翻的.泥土的气息，混着青草味儿，还有各种花的香，都在微微润湿的空气里酝酿。鸟儿将巢安在当中，高兴起来，的卖弄清脆的歌喉，唱出婉转的曲子，跟清风流水应和着。牛背上牧童的短笛，这时候也成天嘹亮的响着。
      雨是最寻常的，一下就是三两天。可别恼。看，像牛牦，像花针，像细丝，密密的斜织着，人家屋顶上全笼着一层薄烟。树叶却绿得发亮，小草也青得逼你的眼。傍晚时候，上灯了，一点点黄晕的光，烘托出一片安静而和平的夜。在乡下，小路上，石桥边，有撑着伞慢慢走着的人，地里还有工作的农民，披着所戴着笠。他们的房屋稀稀疏疏的，在雨里静默着。
      天上的风筝渐渐多了，地上的孩子也多了。城里乡下，家家户户，老老小小，也赶趟似的，一个个都出来了。舒活舒活筋骨，抖擞抖擞精神，各做各的一份事儿去。“一年之计在于春”，刚起头儿，有的是功夫，有的是希望
      春天像刚落地的娃娃，从头到脚都是新的，它生长着。 春天像小姑娘，花枝招展的笑着走着。
      春天像健壮的青年，有铁一般的胳膊和腰脚，领着我们向前去。
      盼望着，盼望着，东风来了，春天的脚步近了。
      一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。
      小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。
      桃树，杏树，梨树，你不让我，我不让你，都开满了花赶趟儿。红的像火，粉的像霞，白的像雪。花里带着甜味；闭了眼，树上仿佛已经满是桃儿，杏儿，梨儿。花下成千成百的蜜蜂嗡嗡的闹着，大小的蝴蝶飞来飞去。野花遍地是：杂样儿，有名字的，没名字的，散在草丛里像眼睛像星星，还眨呀眨。
      “吹面不寒杨柳风”，不错的，像母亲的手抚摸着你，风里带着些心翻的.泥土的气息，混着青草味儿，还有各种花的香，都在微微润湿的空气里酝酿。鸟儿将巢安在当中，高兴起来，的卖弄清脆的歌喉，唱出婉转的曲子，跟清风流水应和着。牛背上牧童的短笛，这时候也成天嘹亮的响着。
      雨是最寻常的，一下就是三两天。可别恼。看，像牛牦，像花针，像细丝，密密的斜织着，人家屋顶上全笼着一层薄烟。树叶却绿得发亮，小草也青得逼你的眼。傍晚时候，上灯了，一点点黄晕的光，烘托出一片安静而和平的夜。在乡下，小路上，石桥边，有撑着伞慢慢走着的人，地里还有工作的农民，披着所戴着笠。他们的房屋稀稀疏疏的，在雨里静默着。
      天上的风筝渐渐多了，地上的孩子也多了。城里乡下，家家户户，老老小小，也赶趟似的，一个个都出来了。舒活舒活筋骨，抖擞抖擞精神，各做各的一份事儿去。“一年之计在于春”，刚起头儿，有的是功夫，有的是希望
      春天像刚落地的娃娃，从头到脚都是新的，它生长着。 春天像小姑娘，花枝招展的笑着走着。
      春天像健壮的青年，有铁一般的胳膊和腰脚，领着我们向前去。
      盼望着，盼望着，东风来了，春天的脚步近了。
      一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。
      小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。
      桃树，杏树，梨树，你不让我，我不让你，都开满了花赶趟儿。红的像火，粉的像霞，白的像雪。花里带着甜味；闭了眼，树上仿佛已经满是桃儿，杏儿，梨儿。花下成千成百的蜜蜂嗡嗡的闹着，大小的蝴蝶飞来飞去。野花遍地是：杂样儿，有名字的，没名字的，散在草丛里像眼睛像星星，还眨呀眨。
      “吹面不寒杨柳风”，不错的，像母亲的手抚摸着你，风里带着些心翻的.泥土的气息，混着青草味儿，还有各种花的香，都在微微润湿的空气里酝酿。鸟儿将巢安在当中，高兴起来，的卖弄清脆的歌喉，唱出婉转的曲子，跟清风流水应和着。牛背上牧童的短笛，这时候也成天嘹亮的响着。
      雨是最寻常的，一下就是三两天。可别恼。看，像牛牦，像花针，像细丝，密密的斜织着，人家屋顶上全笼着一层薄烟。树叶却绿得发亮，小草也青得逼你的眼。傍晚时候，上灯了，一点点黄晕的光，烘托出一片安静而和平的夜。在乡下，小路上，石桥边，有撑着伞慢慢走着的人，地里还有工作的农民，披着所戴着笠。他们的房屋稀稀疏疏的，在雨里静默着。
      天上的风筝渐渐多了，地上的孩子也多了。城里乡下，家家户户，老老小小，也赶趟似的，一个个都出来了。舒活舒活筋骨，抖擞抖擞精神，各做各的一份事儿去。“一年之计在于春”，刚起头儿，有的是功夫，有的是希望
      春天像刚落地的娃娃，从头到脚都是新的，它生长着。 春天像小姑娘，花枝招展的笑着走着。
      春天像健壮的青年，有铁一般的胳膊和腰脚，领着我们向前去。
      盼望着，盼望着，东风来了，春天的脚步近了。
      一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。
      小草偷偷地从土地里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻俏俏的，草软绵绵的。
      桃树，杏树，梨树，你不让我，我不让你，都开满了花赶趟儿。红的像火，粉的像霞，白的像雪。花里带着甜味；闭了眼，树上仿佛已经满是桃儿，杏儿，梨儿。花下成千成百的蜜蜂嗡嗡的闹着，大小的蝴蝶飞来飞去。野花遍地是：杂样儿，有名字的，没名字的，散在草丛里像眼睛像星星，还眨呀眨。
      “吹面不寒杨柳风”，不错的，像母亲的手抚摸着你，风里带着些心翻的.泥土的气息，混着青草味儿，还有各种花的香，都在微微润湿的空气里酝酿。鸟儿将巢安在当中，高兴起来，的卖弄清脆的歌喉，唱出婉转的曲子，跟清风流水应和着。牛背上牧童的短笛，这时候也成天嘹亮的响着。
      雨是最寻常的，一下就是三两天。可别恼。看，像牛牦，像花针，像细丝，密密的斜织着，人家屋顶上全笼着一层薄烟。树叶却绿得发亮，小草也青得逼你的眼。傍晚时候，上灯了，一点点黄晕的光，烘托出一片安静而和平的夜。在乡下，小路上，石桥边，有撑着伞慢慢走着的人，地里还有工作的农民，披着所戴着笠。他们的房屋稀稀疏疏的，在雨里静默着。
      天上的风筝渐渐多了，地上的孩子也多了。城里乡下，家家户户，老老小小，也赶趟似的，一个个都出来了。舒活舒活筋骨，抖擞抖擞精神，各做各的一份事儿去。“一年之计在于春”，刚起头儿，有的是功夫，有的是希望
      春天像刚落地的娃娃，从头到脚都是新的，它生长着。 春天像小姑娘，花枝招展的笑着走着。
      春天像健壮的青年，有铁一般的胳膊和腰脚，领着我们向前去。
    </n-el>
  </div>
</template>

<style scoped lang="scss"></style>
