<template>
  <div class="profile">
    
    <!-- 头部 -->
    <div class="title">
      <!-- 背景 -->
      <div class="back">
      </div>
      <div class="text">
        <div class="content">
          <span class="title-name">个人信息</span>
          <van-icon name="like" />
          <span class="user-name">用户名称</span>
        </div>  
      </div>
    </div>

    <!-- 用户信息的展示 -->
    <div class="user-head">
      <!-- 头像 -->
      <div class="user-pic">
        <div class="contant">
          <van-image
            fit="cover"
            round
            width="10rem"
            height="10rem"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            style="z-index: 6; border: 3px solid #fff;"
          />
        </div>
        <div class="back"></div>
      </div>
    </div>

    <!-- 用户信息展示 -->
    <div class="user-text">
      <!-- 用户名 -->
      <div class="user-name">
        <span class="title">用户名：</span>
        <span class="text">{{ userNameShow }}</span>
      </div>
      <!-- 用户id -->
      <div class="user-id">
        <span class="title">用户id：</span>
        <span class="text">{{ userIdShow }}</span>
      </div>
    </div>

    <!-- 功能区 -->
    <div class="btn-area">
      <!-- 修改密码 -->
      <div class="password btn">
        <van-cell title="修改密码" is-link icon="description" @click="pwChangePageClick">
        </van-cell>
      </div>
      <!-- 其他信息 -->
      <div class="other-setting btn">
        <van-cell title="其他信息" is-link icon="setting-o" @click="otherMessageClick">
        </van-cell>
      </div>
    </div>

  </div>
</template>

<script setup>
// 导入插件
import { ref } from "vue";
import { useRouter } from "vue-router";

// 导入store
import userLogMessage from "@/store/models/user-mes"

const router = useRouter()

// 获取store中当前用户的信息
const userMesStore = userLogMessage()

const userName = userMesStore.userName
const userId = userMesStore.userId

// 将信息展示到前端中
const userNameShow = ref(userName)
const userIdShow = ref(userId)

// fn: 点击修改密码前往修改密码页面
const pwChangePageClick = () => {
  console.log("点击")
  router.push("/pw-change")
}

// fn: 点击其他信息前往其他信息修改页面
const otherMessageClick = () => {
  router.push("/other-mes")
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

  .user-head {
    height: 250px;
    // background-color: #076d15;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    position: relative;
    .user-pic {
      .content {
      }
      .back {
        position: absolute;
        background-color: #fff;
        width: 100%;
        height: 5em;
        bottom: 0px;
        left: 0;
        right: 0;
        z-index: 1;
        border-top: 3px solid #ffffff;
      }
    }
  }

  .user-text {
    padding: 20px 0;
    display: flex;
    background-color: #fff;
    font-size: 18px;
    color: #686868;
    .user-name {
      width: 50%;
      padding: 10px;
      border-right: 1px solid #b0b0b0;
      .title {
        display: block;
      }
      .text {
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .user-id {
      width: 50%;
      padding: 10px;
      .title {
        display: block;
      }
      .text {
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }

  .btn-area {
    .btn {
      margin-top: 5px;

      --van-cell-vertical-padding: 15px;
      --van-cell-font-size: 18px;

      --van-cell-icon-size: 20px;
    }
  }
</style>