<template>
  <div class="otherMes">
    <!-- 头部 -->
    <div class="title">
      <!-- 背景 -->
      <div class="back">
      </div>
      <div class="text">
        <div class="content">
          <span class="title-name">其他信息</span>
          <van-icon name="like" />
          <span class="user-name">用户名称</span>
        </div>
      </div>
    </div>

    <!-- 文字提示 -->
    <div class="attention">
      <div class="text1">
        <span>其他信息</span>
      </div>
      <div class="text2">
        <span>或许，你还要补充点什么。</span>
      </div>
    </div>
  </div>

  <div class="field-content">

    <!-- 用户名修改 -->
    <div class="name-change field">
      <van-cell-group inset>   
        <div class="text-title">
          <span>用户名修改</span>
        </div>
        <van-field v-model="userNameValue" placeholder="请输入用户名" />
      </van-cell-group>
    </div>

    <!-- 手机号修改 -->  
    <div class="phone-change field">
      <van-cell-group inset>   
        <div class="text-title">
          <span>手机号修改</span>
        </div>
        <van-field v-model="phoneValue" type="tel" placeholder="请输入11位手机号" />
      </van-cell-group>
    </div>

    <!-- 旧密码验证 -->
    <div class="pw-confirm field">
      <van-cell-group inset>   
        <div class="text-title">
          <span>密码验证</span>
        </div>
        <van-field v-model="pwValue" type="password" placeholder="请输入密码验证" />
      </van-cell-group>
    </div>
  </div>

  <!-- 按钮 -->
  <div class="btn-list">
      <div class="btn">
        <!-- 确认支付 -->
        <van-button type="primary" @click="commit">确认修改</van-button>
      </div>
      <div class="btn">
        <!-- 确认支付 -->
        <van-button type="primary" @click="backClick">返回</van-button>
      </div> 
    </div>

</template>

<script setup>
// 导入插件
import { ref } from 'vue';

// 动态获取当前表单的信息
const userNameValue = ref('')
const phoneValue = ref('')
const pwValue = ref('')

// 判断当前用户名是否被使用过


// 获取来自数据库的所有用户名



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

.field-content {
  margin-top: 20px;
  .field {
    margin-top: 15px;
    .text-title {
    padding: 13px 15px;
    color: #4a4a4a;
    }
  } 
}

.btn-list {
  margin: 10px 10px;
  margin-top: 30px;
  .btn {
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
    justify-content: space-between;
    --van-button-normal-font-size: 18px;
    --van-button-default-height: 50px;
  }
}
</style>