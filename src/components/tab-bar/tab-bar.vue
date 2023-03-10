<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex"
                class="tab-bar">
      <template v-for="(item, index) in tabbarData">
        <van-tabbar-item :to="item.path" :icon="item.icon">
          <template #default>
            <span>{{ item.text }}</span>
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>
<script setup>
import { ref } from 'vue';

// tabbar静态数据
const tabbarData = [
  {
    text: "选购",
    path: "/shop",
    icon: "shopping-cart-o"
  },
  {
    text: "订单",
    path: "/order",
    icon: "orders-o"
  },
  {
    text: "个人",
    path: "/profile",
    icon: "user-o"
  },
]

const currentIndex = ref(0) //默认确定为0值
</script>

<style lang="less" scoped>

</style>