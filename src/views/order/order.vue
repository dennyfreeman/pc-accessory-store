<template>
  <div class="order">

    <!-- 头部 -->
    <div class="title">
      <!-- 背景 -->
      <div class="back">
      </div>
      <div class="text">
        <div class="content">
          <span class="title-name">订单页面</span>
          <van-icon name="like" />
          <span class="user-name">用户名称</span>
        </div>  
      </div>
    </div>

    <!-- 顶部展示选择列表 -->
    <div class="show-order">
      <van-tabs v-model:active="orderListActive" type="card">
        <van-tab title="待支付">
          <!-- 待支付 -->
          <order-tab1></order-tab1>
        </van-tab>
        <van-tab title="待收货">
          <!-- 待收货 -->
          <order-tab2></order-tab2>
        </van-tab>
        <van-tab title="标签 3">
          <!-- 已完成 -->
          内容 3
        </van-tab>
      </van-tabs>
    </div>
    

    

  </div>
</template>

<script setup>
import { ref } from 'vue';

// 导入模块
// 待支付页面
import orderTab1 from "./order-tab1/order-tab1.vue"
import orderTab2 from "./order-tab2/order-tab2.vue"

const orderListActive = ref(0)

</script>

<style lang="less" scoped>

.title {
  position: relative;
  .back {
    position: absolute;
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    width: 100%;
    height: 100vh;

    z-index: -99;
  }
  .text {
    padding-top: 10px;
    color: #fff;
    margin: 0 auto;
    width: 70%;
    font-size: 10px;
    
    .content {
      display: flex;
      justify-content: space-between;
      background-color: #000;
      padding: 10px 30px;
      border-radius: 30px;
    }
    
  }
}

.show-order {
  .list {
    .right-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .product {
      .item {
        .name {
          color: #000;
        }
      }
    }
    .price {
      font-size: 18px;
      color: #c90101;
    }
      
  }
}
</style>