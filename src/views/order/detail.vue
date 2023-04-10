<template>
  <div>
    <el-image :src="route.query.image"></el-image>
    <el-link>{{ route.query.title }}</el-link>
    <el-link>价格：￥{{ route.query.price }}</el-link>
    <!-- {{ route.query.size}} -->
    <div class="size">
      <ul v-if="route.query.size">
        <li v-for="item in route.query.size" :key="item.id">{{ item }}寸</li>
      </ul>
      <div v-else>暂无蛋糕尺寸信息</div>
    </div>

    <el-button @click="toCardData">添加购物车</el-button>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const toCardData = () => {
  // let localStorageData = JSON.parse(localStorage.getItem('cardData'))

  // if (localStorageData) {
  //   localStorageData.forEach((item, index) => {
  //     if (item.id == route.query.id) {
  //       item.count++
  //       // localStorageData[index] = item
  //       localStorage.setItem('cardData', JSON.stringify(localStorageData))
  //     }
  //     localStorageData.push(route.query)
  //     localStorage.setItem('cardData', JSON.stringify(localStorageData))
  //   })
    
  //   // localStorage.setItem('cardData', JSON.stringify(localStorageData))
  // } else {
  //   localStorage.setItem('cardData', JSON.stringify([route.query]))
  // }
}
</script>

<style>
</style>
