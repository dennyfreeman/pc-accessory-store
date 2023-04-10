<template>
  <div class="sign-up">
    <div class="title">
      <span class="text">注册</span>
    </div>

    <div class="signUpList">
      <van-cell-group inset>
        <template #default>
          <van-field v-model="userName" label="用户名" placeholder="请输入用户名" />
          <van-field v-model="userNumber" label="手机号" type="number" placeholder="您的联系方式" />
          <van-field v-model="userPw" label="密码" type="password" placeholder="请输入密码" />
          <van-field v-model="userPwConfirm" label="确认密码" type="password" placeholder="再次输入同样的密码" />
        </template>       
      </van-cell-group>
    </div>

    <div class="btnList">
      <div class="loginBtn item">
        <van-button type="primary" size="large" @click="signUpClick">立即注册</van-button>
      </div>
      <div class="signUpBtn item">
        <van-button type="default" size="large" @click="loginClick">返回登录</van-button>
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入插件
import { ref } from 'vue';
import { showToast } from 'vant';
import userLogMessage from "@/store/models/user-mes"
import { useRouter } from 'vue-router';

// 导入dayjs时间格式插件
import { formatDateTime, formatDateTimeID } from "@/utils/format_time"


// 导入数据表
import requestingDB from "@/database/index"

// 导入store用户登录信息
const userLog = userLogMessage()

// 导入路由
const router = useRouter()

// 获取用户填入信息
const userName = ref('')
const userNumber = ref('')
const userPw = ref('')
const userPwConfirm = ref('')

// fn: 查询用户名是否重复
const checkUserName = async (name) => {
  var user_name = name
  var confirmName = 1

  var resultDB = await requestingDB.getUserMesDB(user_name)

  // 判断是否存在该用户名
  if (!resultDB[0]) {
    confirmName = 1
  } else {
    confirmName = 0
  }

  return confirmName
}

// fn：将用户信息导入数据库
const addUser = async () => {
  // 初始化用户数据信息
  var userObj = {}
  var nowTime = new Date()
  var formatTimeID = formatDateTimeID(nowTime)

  userObj.user_name = userName.value
  userObj.user_pw = userPw.value
  userObj.phone = userNumber.value
  userObj.user_token = "token_" + formatTimeID
  userObj.user_type = "normal"

  // 导入数据库中
  requestingDB.addUserMes(userObj)
}

const signUpClick = async () => {
  var user_name = userName.value
  var confirmUserName = await checkUserName(user_name)
  var numberConfirm = 0
  var user_number = userNumber.value
  var user_pw = userPw.value
  var user_pw_confirm = userPwConfirm.value
  

  // 判断两个密码是否正确

  // 先判断所有信息是否为空
  if (user_name !== '' && user_number !== '' && user_pw !== '' && user_pw_confirm !== '') {
    // 判断用户是否存在
    if (confirmUserName === 0) {
      showToast('用户名已存在')
    } else {
      // 判断手机号是否11位
      if (user_number.length !== 11) {
        showToast('手机号格式输入错误')
      } else {
        // 判断两个密码是否正确
        if (user_pw !== user_pw_confirm) {
          showToast('请确保两次输入密码正确')
        } else {
          // 全部信息正确，导入数据库同时返回主页
          addUser()
          showToast('注册成功')
          router.push("/login")
        }
      }
    }
  } else {
    showToast('请输入完整的信息')
  }
}

// 点击返回登录页面
const loginClick = () => {
  router.push("/login")
}


</script>

<style lang="less" scoped>
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
  .signUpList {
    width: 80%;
    margin: 0 auto;
    margin-top: 80px;
    padding: 30px 0;
    border: 2px solid #f5f5f5;
    border-radius: 30px;
    -webkit-box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0); 
box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0,0,0,0);
  }

  .btnList {
  margin-top: 50px;

  .item {
    width: 80%;
    margin: 5px auto;
  }
}
</style>