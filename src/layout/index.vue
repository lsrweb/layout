<template>
  <div>
    <el-container>
      <el-header class="bg-white header_shadown">
        <div class="container">
          <Header />
        </div>
      </el-header>
      <el-main>
        <section class="container sec_body">
          <RouterView></RouterView>
        </section>
      </el-main>
      <el-footer>
        <div class="container">尾</div>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import Header from './components/header.vue'
</script>
