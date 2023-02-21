<template>
  <div class="login"> 
    <div class="title">
      <span class="text">登录</span>
    </div>

    <div class="loginList">
      <van-cell-group inset>
        <template #default>
          <van-field v-model="userName" label="用户名" placeholder="请输入用户名" />
          <van-field v-model="userPw" label="密码" type="password" placeholder="请输入密码" />
        </template>       
      </van-cell-group>
    </div>

    <div class="btnList">
      <div class="loginBtn item">
        <van-button type="primary" size="large" @click="loginClick">登录</van-button>
      </div>
      <div class="signUpBtn item">
        <van-button type="default" size="large">前往注册</van-button>
      </div>
    </div>

    <!-- 浮窗插件 -->
    <van-toast v-model:show="show" style="padding: 0">
      <template #message>
        <van-image :src="image" width="200" height="140" style="display: block" />
      </template>
    </van-toast>
    
  </div>
</template>

<script setup>
// 导入
import { ref } from 'vue';
import { showToast } from 'vant';

// 导入数据表
import requestingDB from "@/database/index"

// 获取到查询数据
const result = await requestingDB.getUserMesDB("denny-admin")

// console.log(result[0].user_pw)


// 获取用户填入信息
const userName = ref('')
const userPw = ref('')

// 模拟db信息
const userMesDb = {
  "user_name": "denny",
  "user_pw": "1234",
  "openid": "1234455"
}

// fn: 验证用户信息
const confirmLogMes = (userN, userP) => {
  // 获取到用户数据表信息
  // var userNameDb = userMesDb.user_name
  // var userPwDb = userMesDb.user_pw
  // var useridDb = userMesDb.openid

  // 进行匹配，如果信息不匹配，数据库会传过来空值


  // 若用户存在，返回正确
  

  // 若用户不存在，则返回不存在

  // 若用户信息错误，则返回重新输入
}

// 当用户所有信息输入完整时，点击登录返回Shop
// 发生点击登录
const loginClick = () => {
  if (userName.value === "" || userPw.value === ""){
  // 没填写完整
  // 弹出浮窗
    showToast('请输入完整的信息')
  } else {
    // 验证用户信息是否匹配
    confirmLogMes(userName.value, userPw.value)
    showToast('登录成功')
  }
}



// 当用户点击注册时，跳转注册页面

// 先获取到store中的userId



// 

</script>

<style lang="less" scoped>

.login {
  .title {
    height: auto;
    display: flex;
    justify-content: center;
    
    border-bottom: 1px solid #e7e7e7;
    .text {
      font-size: 20px;
      font-weight: 800;
      margin: 20px 0;
    }
  }

  .loginList {
    width: 80%;
    margin: 0 auto;
    margin-top: 80px;
    padding: 30px 0;
    border: 2px solid #f5f5f5;
    border-radius: 30px;
    -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0); 
box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
  }
}

.btnList {
  margin-top: 50px;

  .item {
    width: 80%;
    margin: 5px auto;
  }
}

</style>