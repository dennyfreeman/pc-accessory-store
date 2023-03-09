<template>
  <div class="orderEditDetail">
    <!-- 头部 -->
    <div class="title">
      <!-- 背景 -->
      <div class="back">
      </div>
      <div class="text">
        <div class="content">
          <span class="title-name">修改联系</span>
          <van-icon name="like" />
          <span class="user-name">用户名称</span>
        </div>  
      </div>
    </div>

    <!-- 弹窗插件 -->
    <!-- <van-dialog v-model:show="show" title="标题" show-cancel-button>
      <img src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" />
    </van-dialog> -->

    <!-- 文字提示 -->
    <div class="attention">
      <div class="text1">
        <span>您的联系方式</span>
      </div>
      <div class="text2">
        <span>请确保您填写的联系方式是否正确，以防止不必要的错误。</span>
      </div>
    </div>

    <!-- 编辑联系人 -->
    <div class="editDetail">
      <van-contact-edit
        is-edit
        :contact-info="editingContact"
        @save="clickAddDetail"
        @delete="onDelete"
      />
    </div>

  </div>
</template>

<script setup>
// 导入插件
import { ref } from 'vue';
import { showConfirmDialog } from 'vant';

import { useRouter } from 'vue-router';

// 导入store
import userOrderStore from "@/store/models/user-order/user-order"

const router = useRouter()

const orderUnPayList = userOrderStore()
const orderMes = orderUnPayList.orderMes

// 展示已有的数据到前端中
const editingContact = ref({
  tel: orderMes.detail.number,
  name: orderMes.detail.contact
})

// fn: 点击保存按钮时，导入数据到store中
const clickAddDetail = (contactInfo) => {
  var detail_contact = contactInfo.name
  var detail_number = contactInfo.tel

  // 修改store中的联系信息
  orderMes.detail.contact = detail_contact
  orderMes.detail.number = detail_number
  // console.log(orderMes)

  // 提示返回上一个页面
  showConfirmDialog({
    message:
      '信息已修改，可确认返回上一个页面。',
    }).then(() => {
      // on confirm
      router.back()
    }).catch(() => {
      // on cancel
    });
  }

// fn: 点击删除按钮的时候，将数据清除
const onDelete = (contactInfo) => {
  contactInfo.tel = ''
  contactInfo.name = ''

  // 清空store中的联系细腻
  orderMes.detail.contact = ''
  orderMes.detail.number = ''
  console.log(contactInfo)
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
  padding-top: 10px;
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
</style>