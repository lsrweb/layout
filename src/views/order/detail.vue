<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-image :src="nowRouteData.image" class="el-image">
          <template #error>
            <div class="image-slot">
              <el-icon size="60">
                <icon-picture />
              </el-icon>
              <div>
                <span>图片加载失败</span>
                <span>请检查网络或图片地址</span>
              </div>
            </div>
          </template>
        </el-image>
      </el-col>
      <el-col :span="12">
        <el-link>{{ nowRouteData.title }}</el-link>
        <div></div>
        <el-link>销量：{{ nowRouteData.sale }}</el-link>
        <div></div>
        <el-link>价格：￥{{ nowRouteData.price || "免费" }}</el-link>
        <div class="size gray">
          <span>选择尺寸:</span>
          <div class="white">
            <ul v-if="nowRouteData.size">
              <li v-for="item in nowRouteData.size" :key="item.id">{{ item }}寸</li>
            </ul>
            <div v-else>暂无蛋糕尺寸信息</div>
          </div>
        </div>
        <div class="address gray">
          <span>选择地址:</span>
          <div class="white">
            <ul v-if="userAddress.length">
              <li v-for="item in userAddress" :key="item.id">
                <el-radio v-model="nowRouteData.address" :label="item.id">{{ item.address }}</el-radio>
              </li>
            </ul>
            <div v-else>
              暂无地址信息
              <div></div>
              <el-button type="primary" @click="toAddress" plain size="small">添加地址</el-button>
            </div>
            <el-dialog title="添加地址" :model-value="showAddres" @close="showAddres = false">
              <el-form :model="addAddress" ref="addAddress" label-width="80px">
                <el-form-item label="收货人">
                  <el-input v-model="addAddress.name" placeholder="请输入收货人姓名"></el-input>
                </el-form-item>
                <el-form-item label="联系电话">
                  <el-input v-model="addAddress.phone" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item label="收货地址">
                  <el-input v-model="addAddress.address" placeholder="请输入收货地址"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="showAddres = false">取 消</el-button>
                <el-button type="primary" @click="addAddressData">确 定</el-button>
              </span>
            </el-dialog>
          </div>

        </div>
        <!--     添加数量选择器   -->
        <el-input-number v-model="nowRouteData.count" :min="1" :max="10"></el-input-number>
        <div style="margin: 20px 0"></div>
        <el-button @click="toCardData" :loading="loading">添加购物车</el-button>
        <el-button @click="buyNow" :loading="loading">立即购买</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { Picture as IconPicture } from "@element-plus/icons-vue";

import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import { ElNotification } from "element-plus";

const route = useRoute();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const nowRouteData = ref(JSON.parse(route.query.data));

const loading = ref(false);

const userAddress = ref([]);
const toAddress = () => {
};
// watch count,refresh localstorage count
watch(nowRouteData.value.count, val => {
  const cardData = JSON.parse(localStorage.getItem("cardData")) || [];
  const index = cardData.findIndex(item => item.id === nowRouteData.value.id);
  cardData[index].count = val;
  localStorage.setItem("cardData", JSON.stringify(cardData));
});
// 理论而言,添加到购物车中的商品不能重复,如果重复,只对数量进行加1操作
const toCardData = async () => {
  loading.value = true;

  await sleep(Math.random() * 3000 + 1000);

  // 如果count +1后大于10,或者 count 当前已经是10,则不允许再进行加1操作
  if (nowRouteData.value.count + 1 > 10 || nowRouteData.value.count === 10) {
    ElNotification({
      title: "提示",
      dangerouslyUseHTMLString: true,
      message: `当前商品数量已经达到上限,请结算后再次进行购买<a href="#/shopcar">去购物车</a>`,
      type: "warning",
      duration: 0
    });
    loading.value = false;
    return;
  }

  // 1.获取本地存储中的数据
  const cardData = JSON.parse(localStorage.getItem("cardData")) || [];
  // 2.判断本地存储中是否有数据
  if (cardData.length > 0) {
    // 3.如果有数据,判断本地存储中是否有当前商品
    const isExist = cardData.some(item => item.id === nowRouteData.value.id);
    if (isExist) {
      // 4.如果有当前商品,只对数量进行加1操作
      const cardItem = cardData.find(item => item.id === nowRouteData.value.id);
      cardItem.count += 1;
    } else {
      // 5.如果没有当前商品,直接添加到本地存储中
      cardData.push({ ...nowRouteData.value, count: 1 });
    }
  } else {
    // 6.如果没有数据,直接添加到本地存储中
    cardData.push({ ...nowRouteData.value, count: 1 });
  }
  // 7.将数据存储到本地存储中
  localStorage.setItem("cardData", JSON.stringify(cardData));

  // 转圈圈结束,消息提示
  loading.value = false;
  ElNotification({
    title: "成功",
    message: "添加购物车成功",
    type: "success",
    offset: 160,
    position: "top-left"
  });

  // 刷新nowRouteData.count
  nowRouteData.value.count++;
};
//**************************
//购买逻辑
//**************************
const showAddres = ref(false)
const addAddress = ref({})
const buyNow = async () => {
  loading.value = true
  if(!userAddress.value.length){
    ElNotification({
      title: "提示",
      message: "请先添加地址",
      type: "warning",
    });
    await sleep(1000)
    showAddres.value = true
    loading.value = false
    return;
  }
}
const addAddressData = async () => {
}

// *****************************
// Page
// *****************************
onMounted(() => {
  // 查询本地存储中是否有当前商品
  const cardData = JSON.parse(localStorage.getItem("cardData")) || [];
  const isExist = cardData.some(item => item.id === nowRouteData.value.id);
  if (isExist) {
    // 如果有当前商品,获取当前商品的数量
    const cardItem = cardData.find(item => item.id === nowRouteData.value.id);
    nowRouteData.value.count = cardItem.count;
  } else {
    // 如果没有当前商品,数量为1
    nowRouteData.value.count = 1;
  }
});
</script>

<style scoped>
.el-image {
    margin: 0 auto;
    border-radius: 5px;
    box-shadow: 0 0 10px #ccc;
    width: 300px;
    height: 300px;
}

.image-slot {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    color: #909399;
    font-size: 14px;
    text-align: center;
}
.gray {
    color:#f2f2f2;
    color: #000;

}
.white {
    background-color: #fff;
    color: #000;
}

.size {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
}

.size ul {
    display: flex;
    flex-wrap: wrap;
}

.size ul li {
    width: 50px;
    height: 50px;
    border: 1px solid #ccc;
    margin: 5px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.size ul li:hover {
    background-color: #ccc;
    cursor: pointer;
}

.size ul li.active {
    background-color: #ccc;
}


</style>
