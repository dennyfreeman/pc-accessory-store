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

  </div>
</template>

<script setup>
// 导入
import { ref } from 'vue';
import { showToast } from 'vant';

const budgetValue = ref(50)

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
    .slider-button{
    }
  }

  .show-budget {
    width: 80%;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 60px;
    text-align: center;
    border-radius: 10px;

    .text {
      font-size: 30px;
    }

    .counter{
      font-size: 90px;
    }
  }
</style>