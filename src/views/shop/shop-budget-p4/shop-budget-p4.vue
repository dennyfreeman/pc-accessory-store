<template>
  <div class="shopBudgetP4">
    <!-- 头部 -->
    <div class="title">
      <!-- 背景 -->
      <div class="back">
      </div>
      <div class="text">
        <div class="content">
          <span class="title-name">预算选配</span>
          <van-icon name="like" />
          <span class="user-name">用户名称</span>
        </div>  
      </div>
    </div>

    <!-- 文字提示 -->
    <div class="attention">
      <div class="text1">
        <span>下单成功！</span>
      </div>
      <div class="text2">
        <span>您的订单已生成，实在是等不及带回家的话，快去支付吧！</span>
      </div>
    </div>
  </div>

  <!-- 下一步按钮 -->
  <div class="btn-nextpage">
      <div class="btn">
        <van-button 
          type="primary" 
          size="large"
          color="linear-gradient(270deg, #84fab0 0%, #8fd3f4 100%)"
          @click="toOrderPage"
          >前往订单</van-button>
      </div>
      <div class="btn">
        <van-button 
          type="primary" 
          size="large"
          color="linear-gradient(270deg, #84fab0 0%, #8fd3f4 100%)"
          @click="toShopPage"
          >回到首页</van-button>
      </div>
    </div>


</template>

<script setup>
// 导入插件
import { useRouter } from "vue-router";

const router = useRouter()

// 根据用户的选择，前往特定页面
// 前往订单页面
const toOrderPage = () => {
  router.push("/order")
}
// 前往首页
const toShopPage = () => {
  router.push("/shop")
}


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

.attention {
  padding-top: 30px;
  padding-left: 10px;
  font-weight: 500;
  color: #3e3e3e;
  .text1 {
    flex-shrink: 0;
    font-size: 60px;
  }
  .text2 {
    margin: 0 10px;
    margin-top: 20px;
    font-size: 24px;
  }
}

.btn-nextpage {
  padding-top: 50px;
  .btn {
    font-size: 48px;
    border-radius: 30px;

    --van-button-large-height: 75px;
    --van-button-default-font-size: 24px;

    margin: 0 auto;
    margin-top: 30px;
    width: 80%;
    -webkit-box-shadow: 7px 11px 10px 1px rgba(0,0,0,0.225); 
    box-shadow: 7px 11px 10px 1px rgba(0,0,0,0.225);
  }
}

</style>