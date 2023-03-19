<template>
  <div class="shopCustomP1">
    <!-- 头部 -->
    <div class="title">
      <!-- 背景 -->
      <div class="back">
      </div>
      <div class="text">
        <div class="content">
          <span class="title-name">自定义选配</span>
          <van-icon name="like" />
          <span class="user-name">用户名称</span>
        </div>  
      </div>
    </div>

    <!-- 文字提示 -->
    <div class="attention">
      <div class="text1">
        <span>更好的定制</span>
      </div>
      <div class="text2">
        <span>不了解如何适配接口没关系，只需跟着我们的步骤您就能选出您心爱的电脑。</span>
      </div>
    </div>

    <!-- CPU选择 -->
    <div class="cpu-select">
      <div class="content">
        <div class="left-box">
          <!-- 标题 -->
          <div class="title">
            <span>CPU选择</span>
          </div>
        </div>
        <div class="right-box">
          <div class="list">
            <van-radio-group v-model="cpuSelector">
              <van-cell-group inset>
                <div class="item">
                  <van-cell title="单选框 ddddddddd1" clickable @click="checked = '1'">
                    <template #right-icon>
                      <van-radio name="1" />
                    </template>
                    <template #title>
                      <span class="title-text">
                        sdifnckxinkdoncdsdfsddcvdddddddd
                      </span>
                    </template>
                  </van-cell>
                </div>
                <div class="item">
                  <van-cell title="单选框 2" clickable @click="checked = '2'">
                    <template #right-icon>
                      <van-radio name="2" />
                    </template>
                  </van-cell>
                </div>  
              </van-cell-group>
            </van-radio-group>
          </div>
        </div>
      </div>
    </div>

    <!-- 下一步按钮 -->
    <div class="btn-nextpage">
      <div class="btn">
        <van-button 
          type="primary" 
          size="large"
          color="linear-gradient(270deg, #84fab0 0%, #8fd3f4 100%)"
          @click="nextPageClick"
          >下一步</van-button>
      </div>
    </div>

  </div>
</template>

<script setup>
// 导入插件
import { ref } from 'vue';

const cpuSelector = ref('1')

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

  .cpu-select {
    margin: 30px 30px 0 30px;
    .content {
      border-radius: 15px;
      height: 250px;
      padding: 20px;
      display: flex;
      background-color: #fff;
      .left-box {
        border-right: 1px solid #dadada;
        padding-right: 10px;
        .title {
          font-size: 48px;
          font-weight: 600; 
          span {
            writing-mode: vertical-rl;
          }
        }
      }
      .right-box {
        padding-left: 20px;
        flex: 1;
        flex-shrink: 0;


        .list {
          .item {
            .title-text {
              width: 180px;
              display: inline-block;
              white-space: normal;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
      
      
    }
  }

  .btn {
    font-size: 48px;

    --van-button-large-height: 100px;
    --van-button-default-font-size: 24px;

    margin: 0 auto;
    margin-top: 30px;
    width: 80%;
    -webkit-box-shadow: 7px 11px 10px 1px rgba(0,0,0,0.225); 
    box-shadow: 7px 11px 10px 1px rgba(0,0,0,0.225);
  }
</style>