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
// 导入插件
import { ref } from 'vue';
import { showToast } from 'vant';
import userLogMessage from "@/store/models/user-mes"
import { useRouter } from 'vue-router';

// 导入数据表
import requestingDB from "@/database/index"

// 导入store用户登录信息
const userLog = userLogMessage()

// 导入路由
const router = useRouter()

// 获取到查询数据
// const result = await requestingDB.getUserMesDB("denny-admin")
// console.log(result[0])
// const userMesDb = result[0]

// 获取用户填入信息
const userName = ref('')
const userPw = ref('')

// 2 step
// fn: 验证用户信息
const confirmLogMes = async (userN, userP) => {
  var confirmUserN = userN
  var confirmUserP = userP
  // 获取到用户数据表信息
  // 把用户输入的用户名传递到数据表查询，是否存在该用户
  var resultDB = await requestingDB.getUserMesDB(confirmUserN)

  // 进行匹配，如果信息不匹配，数据库会传过来空值
  if (!resultDB[0]) {
    showToast('不存在该用户')
  } else {
    // 若用户存在，则判断密码是否正确
    if (resultDB[0].user_pw !== confirmUserP) {
      showToast('用户信息不匹配，请重新输入')
    } else {
      // 若所有信息正确
      showToast('登录成功')
      // 将用户的id录入store中
      userLog.userId = resultDB[0]._id
      userLog.userName = resultDB[0].user_name
      // 然后返回主页shop
      // 3 step
      router.push({
        path: "/shop"
      })
    }
  }
}


// 1 step: 当用户所有信息输入完整时，点击登录返回Shop
// 发生点击登录
const loginClick = () => {
  if (userName.value === "" || userPw.value === ""){
  // 没填写完整
  // 弹出浮窗
    showToast('请输入完整的信息')
  } else {
    // 验证用户信息是否匹配
    confirmLogMes(userName.value, userPw.value)
  }
}

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