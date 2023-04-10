<template>
  <div class="flex">
    <el-link href="/" class="logo_text"> 尚品蛋糕坊</el-link>
    <div class="menu_container">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
        ref="elMenuRef"
      >
        <el-menu-item index="/car">购物车</el-menu-item>
        <el-menu-item index="/order">订单</el-menu-item>
        <el-menu-item index="loginstatus">{{ loginStatus }}</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import {useRouter } from "vue-router";
import { useLogin } from "./loginutils.js";
import { ElNotification } from "element-plus";
import { useStore } from "vuex";


const { isLogin, refReshToken } = useLogin();
const store = useStore()
const router = useRouter();
const activeIndex = computed(() => router.path);
const loginStatus = computed(() => {
  return store.state.token ? "退出登录" : "登录";
});


const handleSelect = (path) => {
  // 这里的退出登录以下情况
  if (path == "loginstatus") {
    // 已登录    ==> 点击后退出登录,清空token,刷新token,跳转到首页
    if (isLogin()) {
      localStorage.removeItem("token");
      refReshToken("");
      router.push({
        path: "/index"
      });

      ElNotification({
        title: "退出登录",
        message: "退出登录成功",
        type: "success"
      });
    }
    // 未登录    ==> 点击后跳转到登录页面
    // 如果当前页面是登录页面,则不跳转
    if (!isLogin()) {
      if (router.currentRoute.value.path == "/login") return;
      router.push({
        path: "/login"
      });
    }
  } else {
    // 其他情况
    router.push({
      path: path
    });
  }
};
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
