<template>
  <div class="shopBudgetP1">
    
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
        <span>您的预算是？</span>
      </div>
      <div class="text2">
        <span>提供您的预想金额，我们为您计算更好的方案。</span>
      </div>
    </div>


    <!-- 预算金额滑块 -->
    <div class="budget-slider">
      <van-slider 
        v-model="budgetValue" 
        @change="onChange" 
        bar-height="10px"
        :step="100"
        :min="1000"
        :max="15000"
      >
      </van-slider>
    </div>

    <!-- 展示金额 -->
    <div class="show-budget">
      <span class="text">￥</span>
      <span class="counter">{{ budgetValue }}</span>
    </div>

    <!-- 下一步按钮 -->
    <div class="btn-nextpage">
      <div class="btn">
        <van-button 
          type="primary" 
          size="large"
          color="linear-gradient(270deg, #84fab0 0%, #8fd3f4 100%)"
          @click="nextPageClick"
          >下一步</van-button>
      </div>
    </div>

  </div>
</template>

<script setup>
// 导入
import { ref } from 'vue';
import { showToast } from 'vant';
import { useRouter } from 'vue-router';

// 导入用户和预算store
import userLogMessage from "@/store/models/user-mes"
import userBudgetStore from "@/store/models/user-budget/user-budget"
import { routerViewLocationKey } from 'vue-router';

const router = useRouter()

// 获取登录用户信息
const logedUser = userLogMessage()
const userId = logedUser.userId
// 把当前用户记录到预算store中
const budgetStore = userBudgetStore()
budgetStore.userId = userId

// 获取当前动态预算
const budgetValue = ref(50)


// 点击按钮后，将预算的金额首先提交到store中
const nextPageClick = () => {
  // 将预算金额提交到store中
  budgetStore.budget = budgetValue.value
  console.log(budgetStore.budget)
  // 并跳转到下一个页面中
  router.push("/shop-budget-p2")
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
    padding-top: 69px;
    padding-left: 10px;
    font-weight: 500;
    color: #3e3e3e;
    .text1 {
      flex-shrink: 0;
      font-size: 60px;
    }
    .text2 {
      margin-top: 10px;
      font-size: 24px;
    }
  }

  .budget-slider {
    width: 89%;
    margin: 0 auto;
    padding-top: 60px;
    
  }

  .show-budget {
    width: 80%;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 60px;
    text-align: center;
    border-radius: 10px;
    -webkit-box-shadow: inset 0px 10px 27px -8px #696969, -9px -8px 18px 0px rgba(0,0,0,0); 
box-shadow: inset 0px 10px 27px -8px #696969, -9px -8px 18px 0px rgba(0,0,0,0);

    .text {
      font-size: 30px;
    }

    .counter{
      font-size: 90px;
    }

    
  }

  .btn {
    font-size: 48px;

    --van-button-large-height: 100px;
    --van-button-default-font-size: 24px;

    margin: 0 auto;
    margin-top: 50px;
    width: 80%;
    -webkit-box-shadow: 7px 11px 10px 1px rgba(0,0,0,0.225); 
    box-shadow: 7px 11px 10px 1px rgba(0,0,0,0.225);
  }
  
</style>