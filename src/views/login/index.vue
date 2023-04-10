<template>
  <div>
    <button @click="toLogin">登录</button>
  </div>
</template>


// <script>
// export default {
//   setup() {
//     const toLogin = () => {

//     }
//     return {
//       toLogin
//     }
//   }
// }
//
</script>


<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const toLogin = () => {
  localStorage.setItem('token', '!@$%#$^%UTRHFDBVSFAHDFBVSADGV')
  router.push({
    path: '/index'
  })
}



// 
</script>
