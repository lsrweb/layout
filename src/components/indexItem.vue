<template>
  <div class="card border-light" style="background-color: white; cursor: pointer">
    <img :src="image" class="card-img-top" />
    <div class="card-body">
      <div class="text-danger fw-bold">¥ {{ price }}</div>
      <div class="card-text text-truncate" style="font-size: 12px">{{ title }}</div>
      <div class="text-muted" style="font-size: 10px">热销 {{ sale }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
defineProps({
  image: {
    type: String,
    default: 'http://qiniu.picgo.srliforever.ltd/a8.png'
  },
  title: {
    type: String,
    default: ''
  },
  price: {
    type: Number,
    default: 0
  },
  sale: {
    type: Number,
    default: 0
  }
})
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  margin-bottom: 20px !important;
  .card-img-top {
    border-top-left-radius: calc(0.25rem - 1px);
    border-top-right-radius: calc(0.25rem - 1px);
  }
  .card-body {
    flex: 1 1 auto;
    padding: 1rem 1rem;
  }
}

.text-danger {
  color: #dc3545 !important;
}

.fw-bold {
  font-weight: 700 !important;
}
.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  .text-muted {
    font-size: 10px;
    color: #6c757d !important;
  }
}
</style>
