<template>
  <div class="vfor-container">
    <indexItem
      v-for="(item, index) in data"
      :key="index"
      :title="item.title"
      :image="item.im"
      :sale="item.sale"
      :price="item.price"
      class="item"
      @click="toUrl(item)"
    />
  </div>
</template>

<script setup>
import indexItem from '@/components/indexItem.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const data = [
  {
    image: 'http://qiniu.picgo.srliforever.ltd/img/picacomic_2.png',
    price: 100,
    sale: 2,
    title: '这是一个蛋糕1',
    size: ['16', '18', '10'],
    id: 1,
    count:0
  },
  {
    image: 'http://qiniu.picgo.srliforever.ltd/img/bilibili_link.png',
    price: 100,
    sale: 2,
    title: '这是一个蛋糕2',
    id:2
  },
  {
    image: 'http://qiniu.picgo.srliforever.ltd/img/bilibili_link.png',
    price: 100,
    sale: 2,
    title: '这是一个蛋糕2',
    id: 3
  },
  {
    image: 'http://qiniu.picgo.srliforever.ltd/img/bilibili_link.png',
    price: 100,
    sale: 2,
    title: '这是一个蛋糕2',
    id:4
  },
  {
    image: 'http://qiniu.picgo.srliforever.ltd/img/bilibili_link.png',
    price: 100,
    sale: 2,
    title: '这是一个蛋糕2',
    id:5
  }
]

const toUrl = (item) => {
  router.push({
    path: '/detail',
    query: item
  })
}
</script>

<style scoped lang="scss">
.vfor-container {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -1);
  margin-right: calc(var(--bs-gutter-x) / -2);
  margin-left: calc(var(--bs-gutter-x) / -2);
  .item {
    width: calc((100% / 4) - 50px);
    margin: 0 10px;
  }
}
</style>
