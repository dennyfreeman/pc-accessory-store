<template>
  <div class="orderPay back">
    <!-- 插件 -->
    <!-- 浮窗插件 -->
    <van-toast v-model:show="show" style="padding: 0">
      <template #message>
        <van-image :src="image" width="200" height="140" style="display: block" />
      </template>
    </van-toast>

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

      <!-- 展示订单信息 -->
      <div class="order-list">
        <div class="list">
          <van-cell-group inset>
            <van-cell>
              <template #title>
                <div class="user-mes cell-title">
                  <span>用户名：{{ showUserId }}</span>
                </div>
                <div class="order-id cell-title">
                  <span class="title_name">订单id：</span>
                  <span class="message">{{showOrderId}}</span>
                </div>
                <div class="create-time cell-title">
                  <span class="title_name">创建时间：</span>
                  <span class="message">{{showOraderCreateTime}}</span>
                </div>   
              </template>
              <template #label>
                <!-- 展示订单的产品 -->
                <div class="product">
                  <div class="item" v-for="(item, index) in showProductsList" :key="index">
                    <span class="name">{{ index }}：</span>
                    <div class="right-box">
                      <span class="firm">{{ item.firm }}&nbsp;-&nbsp;</span>
                      <span class="model_name">{{ item.model_name }}</span>
                    </div>
                  </div>
                </div>
                <div class="price">
                  <span>总价：￥{{ showPrice }}</span>
                </div>
              </template>            
            </van-cell>
          </van-cell-group>
        </div>
        
      </div>

      <!-- 按钮 -->
      <div class="btn-list">
        <div class="confirm btn">
          <!-- 确认支付 -->
          <van-button type="primary" @click="confrimPay">确认支付</van-button>
          <!-- 返回 -->
          <van-button type="primary" @click="backClick">返回</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 导入插件
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { showDialog } from 'vant';
import { showSuccessToast, showFailToast } from 'vant';

// 导入数据表
import requestingDB from "@/database/index"

// 导入store
import userOrderStore from "@/store/models/user-order/user-order"

const router = useRouter()

// 从store订单中获取当前订单信息
const orderUnPayList = userOrderStore()
const userId = orderUnPayList.userId
const orderStatus = orderUnPayList.orderStatus
const orderMes = orderUnPayList.orderMes
const orderId = orderMes.order_id
const orderProducts = orderMes.products_list
// 动态展示数据
const showUserId = ref(userId)
const showOrderId = ref(orderId)
const showOraderCreateTime = ref(orderMes.create_time)
const showPrice = ref(orderMes.total_price)

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

// 展示订单的产品信息
const showProductsList = ref(orderProducts)


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

// fn: 点击提交修改数据库信息，并返回上一个页面
const confrimPay = () => {
  // 获取store中的信息
  var order_store_detail = orderMes.detail
  console.log(order_store_detail)

  // 判断地址和联系信息是否已填好
  if (!order_store_detail.address || !order_store_detail.contact || !order_store_detail.number) {
    showFailToast('请填写信息');
  } else {
    // 若信息无误，则修改数据库中的订单信息
    showDialog({
      title: '支付成功',
      message: '具体支付功能暂未能完善。',
    }).then(() => {
      // on close
      router.back()
    });
    requestingDB.updateOrderList(orderId, order_store_detail)
  }
}

// fn: 返回上一页
const backClick = () => {
  router.back()
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

.order-list {
  margin-top: 10px;
  .list {
    .cell-title {
      display: flex;
      justify-content: space-between;
      .message {
        color: #989898;
      }
    }

    .product {
      margin-top: 10px;
      font-size: 16px;
      .item {
        display: flex;
        flex-direction: column;
        .name {
          color: #000;
        }
      }
    }

    .price {
      margin-top: 10px;
      color: #ff0000;
      font-size: 24px;
    }
  }
}

.btn-list {
  margin: 10px 10px;
  .btn {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>