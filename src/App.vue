<template>
  <div class="app">
    <router-view></router-view>
    <tab-bar></tab-bar>
  </div>

</template>

<script setup>
import { useRoute } from 'vue-router'
import TabBar from "@/components/tab-bar/tab-bar.vue"

import userLogMessage from "@/store/models/user-mes"

const userLog = userLogMessage()

// 判断用户是否已登录
const useridLoged = "usernow"

// 若未登录则弹出弹窗前往登录页面

if (!useridLoged) {
  // 跳转到登录页
}
else {
  // 已登录的话，获取用户的_openid，并放到store中
  userLog.userId = useridLoged
}



const router = useRoute()
</script>


<style scoped>



</style>
