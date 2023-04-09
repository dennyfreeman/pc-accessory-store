<template>
  <div class="otherMesChange">
     
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
        <span>其他信息修改</span>
      </div>
      <div class="text2">
        <span>个人信息太过单调，换换味道也可以。</span>
      </div>
    </div>

    <!-- 修改密码表单 -->
    <div class="pw-content">
      <div class="confirm-pw">
        <van-cell-group inset>
        <!-- 验证密码 -->
        <van-field v-model="confirmPW" type="password" label="验证密码" :error-message="pwErrMes"/>
      </van-cell-group>
      </div>
      <!-- 新密码 -->
      <div class="new-mes">
        <van-cell-group inset>
          <!-- 新名称 -->
          <van-field v-model="newName" label="新名称" :error-message="nameErrMes"/>
          <!-- 新联系方式 -->
          <van-field v-model="newNumber" type="number" label="新联系方式" :error-message="numberErrMes"/>
        </van-cell-group>
      </div>
    </div>

    <!-- 确认提交 -->
    <!-- 按钮 -->
    <div class="btn-list">
      <div class="confirm btn">
        <!-- 确认支付 -->
        <van-button type="primary" @click="commit">确认修改</van-button>
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
const confirmPW = ref('')
const newName = ref('')
const newNumber = ref('')

// 错误信息提示文字
const pwErrMes = ref('')
const nameErrMes = ref('')
const numberErrMes = ref('')

// fn: 获取来自当前用户的密码
const pwGet = async () => {
  // 根据当前用户id获取
  var user_id = userId

  // 从数据库中过去旧密码信息
  var resultDB = await requestingDB.getUserMesDBById(user_id)
  console.log(resultDB)

  // 获取旧密码
  var user_pw = resultDB[0].user_pw
 
  // 对比表单判断是否正确
  var pwConfirm = 0
  if (confirmPW.value === user_pw) {
    console.log("密码对比正确")
    pwConfirm = 1
  } else {
    console.log("密码对比错误")
    pwConfirm = 0
  }

  return pwConfirm
}

// fn：获取来自用户的信息
const userMesGet = async () => {
  // 根据当前用户id获取
  var user_id = userId

  // 从数据库中过去旧密码信息
  var resultDB = await requestingDB.getUserMesDBById(user_id)

  // 获取信息
  var user_number = resultDB[0].phone
  var user_name = resultDB[0].user_name

  newName.value = user_name
  newNumber.value = user_number
}

// fn: 查询用户名是否重复
const checkUserName = async () => {
  var user_name = newName.value
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

// fn：更新用户信息
const updateUserMes = async () => {
  // 获取所有更新的信息
  var user_name = newName.value
  var user_number = newNumber.value

  // 更新数据库中的信息
  requestingDB.updateUserMes(userId, user_name, user_number)
}

// fn：点击确认修改按钮
const commit = async () => {
  // 判断密码是否正确
  var pwConfirm = await pwGet()
  var userName = newName.value
  var userNumber = newNumber.value

  // 若不正确提示用户重新输入
  if (pwConfirm === 0) {
    pwErrMes.value = '密码验证错误'
  } else {
    pwErrMes.value = ''
  }

  var numberConfirm = 0
  // 判断用户输入的手机号是否是11位数
  if (userNumber.length == 11) {
    numberConfirm = 1
    numberErrMes.value = ''
  } else {
    numberErrMes.value = '手机号格式输入错误'
  }

  // 判断用户的名称是否已存在
  var confirmName = await checkUserName()
  if (confirmName === 1) {
    nameErrMes.value = '用户名已存在'
  } else {
    nameErrMes.value = ''
  }


  // 判断所有信息是否正确
  if (pwConfirm === 1 && numberConfirm === 1 && confirmName === 1) {
    // 当所有信息正确，则立刻更新该用户的信息
    updateUserMes()
    // 返回上一页
    router.back()
  }

}

// 先获取当前用户信息
userMesGet()

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

  .confirm-pw {
    --van-cell-font-size: 20px;
    --van-cell-line-height: 40px;
  }
  .new-mes {
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
    flex-direction: column;
    justify-content: space-between;
    --van-button-normal-font-size: 20px;
    --van-button-default-height: 50px;
  }
}
</style>