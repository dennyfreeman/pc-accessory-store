<template>
  <div class="orderTab2">
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
// 导入数据表



</script>

<style lang="less" scoped>

</style>