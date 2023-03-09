<template>
  <div class="orderPay back">
    <!-- 头部 -->
    <div class="title">
      <div class="text">
        <div class="content">
          <span class="title-name">处理订单</span>
          <van-icon name="like" />
          <span class="user-name">用户名称</span>
        </div>  
      </div>
    </div>

    <!-- 联系方式 -->
    <div class="detail">
      <!-- 联系人 -->
      <div class="contact">
        <!-- 若判断联系人未有信息，则展示 -->
        <div class="addDetail" v-if="!showContact">
          <van-contact-card type="add" @click="addDetail" />
        </div>
        <div class="editDetail" v-else>
          <van-contact-card type="edit" :tel="showNumber" :name="showContact" @click="editDetail" />
        </div>
        
      </div>

      <!-- 地址 -->
      <div class="address" @click="editAddress">
        <van-cell-group inset>
          <van-cell>
            <template #title>
              收货地址
            </template>
            <!-- <template #value>
              我是内容
            </template> -->
            <template #label>
              <span>{{ showAddress }}</span>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

// 导入store
import userOrderStore from "@/store/models/user-order/user-order"

const router = useRouter()

// 从store订单中获取当前订单信息
const orderUnPayList = userOrderStore()
const userId = orderUnPayList.userId
const orderStatus = orderUnPayList.orderStatus
const orderMes = orderUnPayList.orderMes

// 判断联系人是否已经填充
const showContact = ref('')
const showNumber = ref('')
showContact.value = orderMes?.detail.contact
showNumber.value = orderMes?.detail.number

// 检查地址信息是否填充
const showAddress = ref('')
if (orderMes.detail) {
  if (orderMes.detail.address) {
    // 如果地址信息已有，这展示到前端
    showAddress.value = orderMes.detail.address
  } else {
    // 地址不存在，则显示不存在
    showAddress.value = "地址信息缺少"
  }
}



// fn: 点击前往添加联系方式
const addDetail = () => {
  router.push("/order-add-detail")
}

// fn: 点击前往编辑联系方式
const editDetail = () => {
  router.push("/order-edit-detail")
}

// fn: 点击前往编辑地址信息
const editAddress = () => {
  router.push("/order-edit-address")
}


</script>

<style lang="less" scoped>
.back {
    position: absolute;
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    width: 100%;
    height: auto;

    z-index: -99;
  }

.title {
  position: relative;
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

.detail {
  .contact {

  }

  .address {
    margin-top: 10px;
  }
}
</style>