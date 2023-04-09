<template>
  <div class="orderTab2">
    <!-- 插件 -->
    <!-- 浮窗 -->
    <van-dialog v-model:show="show" title="标题" show-cancel-button>
      <img src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" />
    </van-dialog>

    <div class="list-content">
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
                  <van-button type="primary" size="mini" @click="confirmReceive(item.order_id)">确认收货</van-button>
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
              <!-- 运输状态 -->
              <div class="transport">
                <div class="text">货物状态：</div>
                <span>{{ item.progress.transport_mes }}</span>
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
    
  </div>
</template>

<script setup>
// 导入插件
import { useRouter } from 'vue-router';
import { showConfirmDialog  } from 'vant';

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

  // 获取待收货订单
  var resultDB = await requestingDB.getOrderListDB(userId, order_status)
  console.log(resultDB)

  showOrderHadPayList.value = []
  for (var i = 0; i < resultDB.length; i++) {
    var orderHadPayObj = {}

    orderHadPayObj = resultDB[i]
    // 将所有数据保存到前端展示列表中
    showOrderHadPayList.value.push(orderHadPayObj)
  }
  console.log(showOrderHadPayList.value)
}

// 修改对应订单的状态
const orderHadReceive = async (orderId) => {
  // 获取当前订单的id
  var order_id = orderId

  // 通过订单id修改对应的订单状态
  requestingDB.updateOrderStatus(order_id)
}

// fn: 点击确认收货按钮，修改订单的状态
const confirmReceive = (orderId) => {
  // 获取当前订单的id
  console.log(orderId)

  var order_id = orderId

  // orderHadReceive(order_id)

  // 弹出浮窗确认画面
  showConfirmDialog({
    title: '确认收货',
    message:
      '请确认无误您的货物已收下，如已收到请点击签收。',
  })
    .then(() => {
      // on confirm
      // 当用户确认收货，则修改数据表信息
      orderHadReceive(order_id)
      // 将页面重新刷新一遍
      orderHadPay()
    })
    .catch(() => {
      // on cancel
    });
}


// 获取订单信息
orderHadPay()
</script>

<style lang="less" scoped>

.orderTab2 {
  margin-top: 10px;
  padding-bottom: 60px;
}

.show-order {
  .list-content {
    padding-bottom: 60px;
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
      .transport {
        border-top: 1px solid #dcdcdc;
        margin-top: 10px;
        .text {
          font-size: 14px;
          color: #000;
        }
      }
      .price {
        padding-top: 10px;
        font-size: 18px;
        color: #c90101;
      }
        
    }
  }
  
}
</style>