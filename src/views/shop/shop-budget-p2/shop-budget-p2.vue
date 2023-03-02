<template>
  <div class="shopBudgetP2">
    
    <!-- 头部文字 -->

    <!-- 展示3个套餐 -->

    <!-- 按钮 -->
  </div>
</template>

<script setup>
// 导入预算store
import userBudgetStore from "@/store/models/user-budget/user-budget"

// 获取当前预算金额
const budgetStore = userBudgetStore()
const budget = budgetStore.budget
console.log(budget)

// 根据金额大小，查询数据库是否存在更小的套餐
// 查询现有套餐的所有金额，并归类一个数组里

// 对比预算金额

// 把所有套餐信息获取下来

// 选出前三位

// 展示到前端用户

// 让用户选择一个套餐,然后再跳转到下一个页面
</script>

<style lang="less" scoped>

</style>