<template>
  <div class="orderTab1">
    <!-- 插件 -->
    <!-- 浮窗 -->
    <van-toast v-model:show="show" style="padding: 0">
      <template #message>
        <van-image :src="image" width="200" height="140" style="display: block" />
      </template>
    </van-toast>

    <van-cell-group inset>
      <div class="list" v-for="(item, index) in showOrderUnPayList" :key="index">
        <van-cell>
          <template #title>
            <span>创建时间：</span>
            <span>{{ item.create_time }}</span>
          </template>
          <template #value>
            <div class="right-content">
              <!-- 订单id -->
              <div class="order-id">
                <span>订单id：</span>
                <span>{{ item.order_id }}</span>
              </div>
              <!-- 按钮 -->
              <div class="btn">
                <van-button type="primary" size="mini" @click="confirmPay(item)">确认支付</van-button>
                <van-button type="primary" size="mini" @click="deleteOrder(item)">删除</van-button>
              </div>
            </div>
          </template>
          <template #label>
            <!-- 展示订单的产品 -->
            <div class="product">
              <div class="item" v-for="(goods, indey) in item.products_list" :key="indey">
                <span class="name">{{ indey }}：</span>
                <span>{{ goods.firm }}&nbsp;-&nbsp;</span>
                <span>{{ goods.model_name }}</span>
              </div>
            </div>
            <!-- 价格 -->
            <div class="price">
                <span>￥{{ item.total_price }}</span>
              </div>
          </template>
        </van-cell>
      </div>
      
    </van-cell-group>
  </div>
</template>

<script setup>
// 导入插件
import { useRouter } from 'vue-router';

// 导入数据表
import requestingDB from "@/database/index"

// 导入store
import userLogMessage from "@/store/models/user-mes"
import userOrderStore from "@/store/models/user-order/user-order"
import { ref } from "vue";
import { showSuccessToast } from 'vant';

const router = useRouter()

// 获取当前用户的信息
const userId = userLogMessage().userId
const userName = userLogMessage().userName
// 获取临时订单信息
const orderStore = userOrderStore()

// 当前页面为待支付状态
const order_status = 0

// 动态展示订单列表
const showOrderUnPayList = ref([])

// 根据用户的id获取相对应的订单表
const orderUnPay = async () => {

  // 获取待支付订单
  var resultDB = await requestingDB.getOrderListDB(userId, order_status)
  console.log(resultDB)
  showOrderUnPayList.value = []

  for (var i = 0; i < resultDB.length; i++) {
    var orderUnPayObj = {}

    orderUnPayObj = resultDB[i]
    // 将所有数据保存到前端展示列表中
    showOrderUnPayList.value.push(orderUnPayObj)
  }
  console.log(showOrderUnPayList.value)

}

// 当用户点击确认支付
const confirmPay = (orderToPay) => {
  // 获取当前套餐信息
  console.log(orderToPay)

  // 将套餐信息存储到订单临时store中
  orderStore.orderMes = orderToPay
  orderStore.orderStatus = 0
  orderStore.userId = userId

  console.log(orderStore)

  // 前往支付页面
  router.push("/order-pay")
}


// 当用户点击删除
const deleteOrder = (orderToDel) => {
  console.log(orderToDel)
  // 根据订单的id删除相对应的订单
  var order_id = orderToDel.order_id
  requestingDB.deleteOrder(order_id)

  // 弹出删除成功弹窗，并刷新一次
  showSuccessToast('成功删除');
  orderUnPay()
}


// 获取当前未支付订单
orderUnPay()


</script>

<style lang="less" scoped>
.orderTab1 {
  margin-top: 10px;
  padding-bottom: 60px;
}

.show-order {
  .list {
    border-bottom: 1px dashed #b7b7b7;
    .right-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .product {
      .item {
        .name {
          color: #000;
        }
      }
    }
    .price {
      padding-top: 10px;
      font-size: 18px;
      color: #c90101;
    }
      
  }
}
</style>