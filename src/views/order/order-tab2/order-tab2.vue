<template>
  <div class="orderTab2">
    <button @click="getBtn">获取订单</button>
    <van-cell-group inset>
      <div class="list" v-for="(item, index) in showOrderHadPayList" :key="index">
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
                <van-button type="primary" size="mini">确认收货</van-button>
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

const router = useRouter()

// 获取当前用户的信息
const userId = userLogMessage().userId
const userName = userLogMessage().userName

// 获取临时订单信息
const orderStore = userOrderStore()

// 当前页面为待支付状态
const order_status = 1

// 动态展示订单列表
const showOrderHadPayList = ref([])


// 根据用户的id获取相对应的订单表
const orderHadPay = async () => {

// 获取待支付订单
var resultDB = await requestingDB.getOrderListDB(userId, order_status)
console.log(resultDB)

for (var i = 0; i < resultDB.length; i++) {
  var orderHadPayObj = {}

  orderHadPayObj = resultDB[i]
  // 将所有数据保存到前端展示列表中
  showOrderHadPayList.value.push(orderHadPayObj)
}
console.log(showOrderHadPayList.value)

}

// fn: 点击确认收货按钮，修改

// 临时功能，点击获取订单信息
const getBtn = () => {
  orderHadPay()
}
</script>

<style lang="less" scoped>
.show-order {
  .list {
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