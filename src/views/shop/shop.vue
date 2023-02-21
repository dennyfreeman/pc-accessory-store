<template>
  <div class="shop">
    
    <!-- 头部 -->
    <div class="title">
      <!-- 背景 -->
      <div class="back">

      </div>
      <div class="text">
        <div class="content">
          <span class="title-name">丹尼电脑配件商城</span>
          <van-icon name="like" />
          <span class="user-name">用户名称</span>
        </div>  
      </div>
    </div>


    <!-- 文字提示 -->
    <div class="attention">
      <div class="user-name">
        <span>用户，</span>
      </div>
      <div class="WC">
        <span>欢迎您的到来！</span>
      </div>
    </div>

    <!-- 选项 -->
    <div class="selectBtn">
      <div class="btn">
        <van-button 
          type="primary" 
          size="large"
          color="linear-gradient(270deg, #84fab0 0%, #8fd3f4 100%)"
          @click="shopBudgetClick"
          >预算选配</van-button>
      </div>
      <div class="btn">
        <van-button type="primary" 
          size="large"
          color="linear-gradient(90deg, #84fab0 0%, #8fd3f4 100%)"
        >自定义选配</van-button>
      </div>
    </div>
  </div>
</template>



<script setup>
// 导入插件

// 导入用户登录全局store
import userLogMessage from "@/store/models/user-mes"
import { useRouter } from "vue-router";

const router = useRouter()
// 获取当前登录信息
// 从store获取当前用户的id
const logedUserId = userLogMessage().userId
console.log(logedUserId)

// 预算按钮发生点击
const shopBudgetClick = () => {
  console.log("budget")
  router.push({
    path: "/shop-budget-p1"
  })
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
        .title-name {
        
        }

        .user-name {

        } 
      }
      
    }
  }

  .attention {
    font-size: 36px;
    padding-top: 69px;
    padding-left: 10px;
    font-weight: 500;
    color: #3e3e3e;
    .user-name {
      flex-shrink: 0;
      font-size: 80px;
    }
    .WC {

    }
  }

  .selectBtn {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 30px;

    .btn {
      --van-button-large-height: 100px;
      --van-button-default-font-size: 24px;

      margin-bottom: 50px;
      width: 80%;
      -webkit-box-shadow: 7px 11px 10px 1px rgba(0,0,0,0.225); 
      box-shadow: 7px 11px 10px 1px rgba(0,0,0,0.225);
    }
  }

</style>