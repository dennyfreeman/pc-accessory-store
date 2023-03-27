<template>
  <div class="app">
    <!-- 登录提示弹窗 -->
    <van-dialog v-model:show="show" title="标题" show-cancel-button></van-dialog>
    
    <router-view></router-view>
    <tab-bar v-if="!route.meta.hideTabBar"></tab-bar>
    
  </div>

</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import TabBar from "@/components/tab-bar/tab-bar.vue"

// 导入用户登录全局store
import userLogMessage from "@/store/models/user-mes"
// 弹窗模块
import { showDialog } from 'vant'

const router = useRouter()
const route = useRoute()

// 1. 判断用户是否已登录
const userLog = userLogMessage()
// 把现在store中已经有的用户id返回查询，确认是否登录

/**
 * 模拟登录数据，之后记得删除
 */
// userLog.userId = "loged"

const useridLoged = userLog.userId

// 若未登录则弹出弹窗前往登录页面
if (!useridLoged) {
  // 跳转到登录页
  // 2.弹窗，让未登录的用户跳转到登录页面
  showDialog({
    title: '请先登录',
    message: '本网站的完整功能需要记录您的每次选择，请您在我们这里小计一下_(:з」∠)_',
    theme: 'round-button',
  }).then(() => {
    // on close
    console.log("跳转到登录页")
    userLog.userId = "getlog"
    // 前往登录页面
    router.push({
      path: "/login"
    })
  });
}
else {
  // 已登录的话，获取用户的_openid，并放到store中
  console.log(useridLoged)
}


</script>


<style scoped>



</style>
