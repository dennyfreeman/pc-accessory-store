<template>
  <div class="orderTab1">
    <van-cell-group inset>
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

      <div class="item">
        <van-cell>
          <template #title>
            我是标题
          </template>
          <template #value>
            我是内容
          </template>
          <template #label>
            我是描述
          </template>
        </van-cell>
      </div>
      
    </van-cell-group>
  </div>
</template>

<script setup>

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