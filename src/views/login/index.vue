<template>
  <div>
    <button @click="toLogin">登录</button>
  </div>
</template>


<script setup>
import { useRouter } from "vue-router";
import { useLogin } from "@/layout/components/loginutils";
import { ElNotification } from "element-plus";

const router = useRouter();
const { refReshToken } = useLogin();

const toLogin = () => {
  const tokenValue = "asdasdasdassd";
  localStorage.setItem("token", tokenValue);
  router.push({
    path: router.currentRoute.value.query.path ? router.currentRoute.value.query.path : "/index",
    query: router.currentRoute.value.query.data ? JSON.parse(router.currentRoute.value.query.data) : {}
  }).then(() => {
    refReshToken(tokenValue);
  });
  ElNotification({
    title: "登录成功",
    message: "登录成功",
    type: "success"
  });
};


//
</script>
