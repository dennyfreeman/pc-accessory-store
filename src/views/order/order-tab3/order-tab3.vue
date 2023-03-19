<template>
  <div class="orderTab3">
    <!-- 插件 -->
    <!-- 弹出层 -->
    <van-popup
      v-model:show="showComment"
      closeable
      position="bottom"
      :style="{ height: '40%' }"
    >
      <div class="comment-popup">
        <div class="content">
          <div class="title">
            <span>感谢您的支持</span>
          </div>
          <!-- 评分 -->
          <div class="score-star">
            <span class="text">为我们评分:</span>
            <div class="star">
              <van-rate v-model="commentStarValue" allow-half />
            </div>
          </div>
          <!-- 评论 -->
          <div class="message">
            <van-cell-group inset>
              <van-field
                v-model="commentMessage"
                rows="2"
                autosize
                label="留言"
                type="textarea"
                maxlength="50"
                placeholder="请输入留言"
                show-word-limit
              />
            </van-cell-group>
          </div>
          <!-- 提交按钮 -->
          <div class="btn">
            <van-button type="primary" block @click="submitComment">提交</van-button>
          </div>
        </div>
      </div>
    </van-popup>

    <button @click="getBtn">获取订单</button>
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
                <div class="btn" v-if="item.comment?.status !== 1">
                  <!-- 未评价的按钮 -->
                  <van-button type="primary" size="mini" @click="commentClick(item.order_id)">评价一下</van-button>
                </div>
                <div class="btn" v-else>
                  <!-- 已评价的按钮 -->
                  <van-button type="primary" size="mini" disabled>已评价</van-button>
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
    
  </div>
</template>

<script setup>
// 导入插件
import { ref } from "vue";

// 导入数据表
import requestingDB from "@/database/index"

// 导入store
import userLogMessage from "@/store/models/user-mes"
import userOrderStore from "@/store/models/user-order/user-order"

// 获取当前用户的信息
const userId = userLogMessage().userId
const userName = userLogMessage().userName

// 当前页面为已完成状态
const order_status = 2

// 动态展示订单列表
const showOrderHadPayList = ref([])

// 展示评论弹窗监控值
const showComment = ref(false)

// 根据用户的id获取相对应的订单表
const orderHadPay = async () => {
  // 获取待支付订单
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



// 评价功能
// 监听对应套餐的评价星
const commentStarValue = ref(4.5)
// 监听评论信息文本输入
const commentMessage = ref('')
// 监听点击的用户id
const orderIdComment = ref('')

// fn: 用户点击评价按钮，弹出评价弹窗
const commentClick = (orderId) => {
  var order_id = orderId
  orderIdComment.value = order_id
  console.log(order_id)

  // 初始化评论区页面
  commentStarValue.value = 4.5
  commentMessage.value = ''

  // 弹出评论弹窗
  showComment.value = true
}

// fn: 当用户点击提交按钮，更细数据库信息
const submitComment = () => {
  var order_id = orderIdComment.value
  var commentMes = {}
  console.log(order_id)

  // 获取当前用户提交的信息
  console.log(commentStarValue.value, commentMessage.value)
  commentMes.score = commentStarValue.value
  commentMes.message = commentMessage.value

  // 根据用户id将信息推送到数据库中
  requestingDB.updateOrderComment(order_id, commentMes)

  // 提交成功后，退出该弹窗
}



// 临时功能，点击获取订单信息
const getBtn = () => {
  orderHadPay()
}

</script>

<style lang="less" scoped>
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

.comment-popup {
  .title {
    padding-top: 43px;
    font-size: 28px;
    font-weight: 600;
    text-align: center;
  }
  .score-star {
    display: flex;
    flex-direction: row;
    .text {
      padding: 30px 10px 10px 30px;
      font-size: 14px;
    }
    .star {
      padding: 30px 10px 10px 30px;
    }
  }

  .btn {
    margin: 0 20px;
  }
}
</style>