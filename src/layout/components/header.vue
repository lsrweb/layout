<template>
  <div class="flex">
    <el-link href="/" class="logo_text"> 尚品蛋糕坊 </el-link>
    <div class="menu_container">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <el-menu-item index="/car">购物车 </el-menu-item>
        <el-menu-item index="/order">订单</el-menu-item>
        <el-menu-item index="loginstatus">{{ loginStatus }}</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLogin } from './loginutils.js'
const { token, isLogin, refReshToken } = useLogin()

const router = useRouter()
const activeIndex = computed(() => router.path)

const loginStatus = computed(() => {
  return token.value ? '退出登录' : '登录'
})

// onMounted(() => {
//   const isLogin = localStorage.getItem('token')
//   isLogin ? (loginStatus.value = '退出登录') : '登录'
// })

const handleSelect = (path) => {
  if (path == 'loginstatus' && isLogin()) {
    if (isLogin()) {
      localStorage.removeItem('token')
      refReshToken()
      router.push("/")
    } else {
      localStorage.setItem('token', '#^$%YTHFGDSFA')
      refReshToken()
    }
  } else if(path != 'loginstatus' && isLogin()) {
    router.push({
      path: path
    })
  } else {
    router.push({
      path: '/login'
    })
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
  background-color: #fff;
  .logo_text {
    color: #dc3545;
    font-weight: 700;
    padding-top: 0.3125rem;
    padding-bottom: 0.3125rem;
    margin-right: 1rem;
    font-size: 1.25rem;
    text-decoration: none;
    white-space: nowrap;
  }
}
.menu_container {
  :deep(.el-menu) {
    background-color: #dc3545;
  }
  .el-menu {
    background-color: #fff;
    border-bottom: 0;
  }
}
</style>
