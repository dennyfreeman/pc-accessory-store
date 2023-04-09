<template>
  <div class="pwChange">
    
    <!-- 头部 -->
    <div class="title">
      <!-- 背景 -->
      <div class="back">
      </div>
      <div class="text">
        <div class="content">
          <span class="title-name">修改密码</span>
          <van-icon name="like" />
          <span class="user-name">用户名称</span>
        </div>  
      </div>
    </div>

     <!-- 文字提示 -->
     <div class="attention">
      <div class="text1">
        <span>修改密码</span>
      </div>
      <div class="text2">
        <span>更复杂的密码往往更安全，但是也要记住了哦。</span>
      </div>
    </div>

    <!-- 修改密码表单 -->
    <div class="pw-content">
      <div class="old-pw">
        <van-cell-group inset>
        <!-- 旧密码 -->
        <van-field v-model="oldPW" type="password" label="旧密码" :error-message="oldErrMes"/>
      </van-cell-group>
      </div>
      <!-- 新密码 -->
      <div class="new-pw">
        <van-cell-group inset>
          <!-- 旧密码 -->
          <van-field v-model="newPW" type="password" label="新密码" />
          <!-- 旧密码 -->
          <van-field v-model="confirmPW" type="password" label="确认密码" :error-message="newErrMes"/>
        </van-cell-group>
      </div>
    </div>

    <!-- 确认提交 -->
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

  </div>
</template>

<script setup>
// 导入插件
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// 导入store
import userLogMessage from "@/store/models/user-mes"

// 导入数据表
import requestingDB from "@/database/index"

const router = useRouter()

// 获取store中当前用户的信息
const userMesStore = userLogMessage()

const userName = userMesStore.userName
const userId = userMesStore.userId

// 动态获取前端输入的表单信息
const oldPW = ref('')
const newPW = ref('')
const confirmPW = ref('')

// 错误信息提示文字
const oldErrMes = ref('')
const newErrMes = ref('')

// fn: 获取来自当前用户的旧密码
const oldPwGet = async () => {
  // 根据当前用户id获取
  var user_id = userId

  // 从数据库中过去旧密码信息
  var resultDB = await requestingDB.getUserMesDBById(user_id)
  console.log(resultDB)

  // 获取旧密码
  var user_pw = resultDB[0].user_pw
 
  // 对比表单判断是否正确
  var oldPwConfirm = 0
  if (oldPW.value === user_pw) {
    console.log("旧密码对比正确")
    oldPwConfirm = 1
  } else {
    console.log("旧密码对比错误")
    oldPwConfirm = 0
  }

  return oldPwConfirm
}

// fn: 更新用户密码
const updateNewPw = async () => {
  var user_id = userId
  // 获取当前新密码
  var new_pw = confirmPW.value

  // 更新数据库中用户的密码
  requestingDB.updateUserPw(user_id, new_pw)

}



// fn: 点击确认修改按钮
const commit = async () => {
  var newPwConfirm = 0
  // 判断旧密码是否匹配正确
  var oldPwConfirm = await oldPwGet()
  console.log(oldPwConfirm)

  // 若不正确提示用户重新输入
  if (oldPwConfirm === 0) {
    oldErrMes.value = '旧密码输入错误'
  } else {
    oldErrMes.value = ''
  }

  // 判断两次输入的新密码是否正确
  if (newPW.value === confirmPW.value) {
    // 对比正确
    newPwConfirm = 1
    newErrMes.value = ''
  } else {
    // 对比错误
    newPwConfirm = 0
    newErrMes.value = '请检查输入'
  }

  // 判断所有信息是否正确
  if (oldPwConfirm === 1 && newPwConfirm === 1) {
    // 当所有信息正确，则更新密码信息
    updateNewPw()
    // 返回上一页
    router.back()
  }
}

// fn: 点击返回按钮
const backClick = () => {
  router.back()
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

.pw-content {
  margin-top: 30px;

  .old-pw {
    --van-cell-font-size: 20px;
    --van-cell-line-height: 40px;
  }
  .new-pw {
    margin-top: 15px;
    --van-cell-font-size: 20px;
    --van-cell-line-height: 40px;
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
    --van-button-normal-font-size: 20px;
    --van-button-default-height: 50px;
  }
}
</style>