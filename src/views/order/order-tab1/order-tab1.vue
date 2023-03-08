<template>
  <div class="orderTab1">
    <button @click="getBtn">获取订单</button>
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
                <van-button type="primary" size="mini">确认支付</van-button>
                <van-button type="primary" size="mini">删除</van-button>
              </div>
            </div>
          </template>
          <template #label>
            <!-- 展示订单的产品 -->
            <div class="product">
              <div class="item" v-for="(goods, indey) in item.products_list" :key="indey">
                <span class="name">{{ item.products_list.indey }}：</span>
                <span>{{ goods.firm }}&nbsp;-&nbsp;</span>
                <span>{{ goods.model_name }}</span>
              </div>
            </div>
            <!-- 价格 -->
            <div class="price">
                <span>￥123</span>
              </div>
          </template>
        </van-cell>
      </div>

      <div class="list">
        <van-cell>
          <template #title>
            <span>创建时间：</span>
            <span>create_time</span>
          </template>
          <template #value>
            <div class="right-content">
              <!-- 订单id -->
              <div class="order-id">
                <span>订单id：</span>
                <span>order_id</span>
              </div>
              <!-- 按钮 -->
              <div class="btn">
                <van-button type="primary" size="mini">确认支付</van-button>
                <van-button type="primary" size="mini">删除</van-button>
              </div>
            </div>
          </template>
          <template #label>
            <!-- 展示订单的产品 -->
            <div class="product">
              <div class="item">
                <span class="name">CPU：</span>
                <span>firm&nbsp;-&nbsp;</span>
                <span>model_name</span>
              </div>
              <div class="item">
                <span>CPU：</span>
                <span>firm&nbsp;-&nbsp;</span>
                <span>model_name</span>
              </div>
              <div class="item">
                <span>CPU：</span>
                <span>firm&nbsp;-&nbsp;</span>
                <span>model_name</span>
              </div>
              <div class="item">
                <span>CPU：</span>
                <span>firm&nbsp;-&nbsp;</span>
                <span>model_name</span>
              </div>
            </div>
            <!-- 价格 -->
            <div class="price">
                <span>￥123</span>
              </div>
          </template>
        </van-cell>
      </div>

      
      
    </van-cell-group>
  </div>
</template>

<script setup>
// 导入数据表
import requestingDB from "@/database/index"

// 导入store
import userLogMessage from "@/store/models/user-mes"
import { ref } from "vue";

// 获取当前用户的信息
const userId = userLogMessage.userId
const userName = userLogMessage.userName
// 当前页面为待支付状态
const order_status = 0

// 动态展示订单列表
const showOrderUnPayList = ref([])

// 根据用户的id获取相对应的订单表
const orderUnPay = async () => {

  var resultDB = await requestingDB.getOrderListDB(userId, order_status)
  console.log(resultDB)

  for (var i = 0; i < resultDB.length; i++) {
    var orderUnPayObj = {}

    orderUnPayObj = resultDB[i]
    // 将所有数据保存到前端展示列表中
    showOrderUnPayList.value.push(orderUnPayObj)
  }
  console.log(showOrderUnPayList.value)

}

const getBtn = () => {
  orderUnPay()
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