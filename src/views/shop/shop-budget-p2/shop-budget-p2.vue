<template>
  <div class="shopBudgetP2">
    
    <!-- 头部 -->
    <div class="title">
      <!-- 背景 -->
      <div class="back">
      </div>
      <div class="text">
        <div class="content">
          <span class="title-name">预算选配</span>
          <van-icon name="like" />
          <span class="user-name">用户名称</span>
        </div>  
      </div>
    </div>

   
    <div class="btn">
      <button @click="getCombo">获取套餐</button>
      <div>{{ comboNewList }}</div>
    </div>

    <!-- 文字提示 -->
    <div class="attention">
      <div class="text1">
        <span>您的明智选择</span>
      </div>
      <div class="text2">
        <span>以下是我们提供至少三个组合方案，请您选择一个您偏好的。</span>
      </div>
    </div>

    <!-- 展示3个套餐 -->
    <div class="comboBox">
      <div class="content">

        <div class="item" @click="showDetail1 = true" >
          <!-- 遮蔽层显示详细数据 -->
          <van-overlay :show="showDetail1"  @click="showDetail1 = false">
            <div class="wrapper" @click.stop @click="showDetail1 = false">
              <div class="block" >
                <!-- 展示详细信息 -->
                dsfas
              </div>
            </div>
          </van-overlay>

          <div class="name">
            <span>套餐一</span>
          </div>
          <div class="price">
            <span>4888</span>
          </div>
          <div class="desc">
            <span class="text">sadfsjjksdjksdfjkdfsjksdjkfsdklafnskdnflasndklf</span>
          </div>
          <div class="selector">
            选择器
          </div>
        </div>

        <div class="item" @click="showDetail2 = true" >
          <!-- 遮蔽层显示详细数据 -->
          <van-overlay :show="showDetail2"  @click="showDetail2 = false">
            <div class="wrapper" @click.stop @click="showDetail2 = false">
              <div class="block" >
                <!-- 展示详细信息 -->
                dsfas
              </div>
            </div>
          </van-overlay>
          
          <div class="name">
            <span>套餐一</span>
          </div>
          <div class="price">
            <span>4888</span>
          </div>
          <div class="desc">
            <span class="text">sadfsjjksdjksdfjkdfsjksdjkfsdklafnskdnflasndklf</span>
          </div>
          <div class="selector">
            选择器
          </div>
        </div>

        <div class="item" @click="showDetail3 = true" >
          <!-- 遮蔽层显示详细数据 -->
          <van-overlay :show="showDetail3"  @click="showDetail3 = false">
            <div class="wrapper" @click.stop @click="showDetail3 = false">
              <div class="block" >
                <!-- 展示详细信息 -->
                dsfas
              </div>
            </div>
          </van-overlay>
          
          <div class="name">
            <span>套餐一</span>
          </div>
          <div class="price">
            <span>4888</span>
          </div>
          <div class="desc">
            <span class="text">sadfsjjksdjksdfjkdfsjksdjkfsdklafnskdnflasndklf</span>
          </div>
          <div class="selector">
            选择器
          </div>
        </div>

      </div>
    </div>



    <!-- 按钮 -->
  </div>
</template>

<script setup>
// 导入插件
import { ref } from "vue";

// 导入预算store
import userBudgetStore from "@/store/models/user-budget/user-budget"

// 导入数据表
import requestingDB from "@/database/index"

// 获取当前预算金额
const budgetStore = userBudgetStore()
const budget = budgetStore.budget
const userId = budgetStore.userId
console.log(budget)

// 最终获取套餐的新数组（只限前三位），必须动态
const comboNewList = ref([])

// 根据金额大小，查询数据库是否存在更小的套餐
// 查询现有套餐的所有金额，并归类一个数组里

// fn：从数据库中获取数据
const budgetComboGetList = async () => {
  // 预算
  var budgetPrice = budget
  // 符合预算的套餐数据
  var comboGetList = []

  // 获取数据
  var resultDB = await requestingDB.getComboListDB(budgetPrice)

  // 遍历数据表中所有的价格，把符合条件的导入到新的数组中
  for (var i = 0; i < resultDB.length; i++) {
    // console.log(resultDB[i])
    if (resultDB[i].total_price <= budgetPrice) {
      console.log("套餐存在")
      // 将不超预算的套餐纳入新的数组中
      comboGetList.push(resultDB[i])
    } else {
      console.log("预算超出")
    }
  }

  // 导出新数组中的前三个套餐
  // 将新的数组展示到前端中
  console.log(comboGetList)
  for (var i = 0; i < 3; i++) {
    comboNewList.value.push(comboGetList[i])
  }
}
 
// 1 调用数据库并获取到符合预算的新数据
// 这里价格按钮，防止过度调用数据库
const getCombo = () => {
  budgetComboGetList()
}

// 2 让用户选择一个套餐,然后再跳转到下一个页面
// 用户点击某个套餐，显示出详细遮蔽层
const showDetail1 = ref(false)
const showDetail2 = ref(false)
const showDetail3 = ref(false)
// 判断能否有3个套餐，否则前端不要展示


</script>

<style lang="less" scoped>

.title {
  position: relative;
  .back {
    position: absolute;
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    width: 100%;
    height: 100vh;

    z-index: -99;
  }
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

.attention {
  padding-top: 69px;
  padding-left: 10px;
  font-weight: 500;
  color: #3e3e3e;
  .text1 {
    flex-shrink: 0;
    font-size: 60px;
  }
  .text2 {
    margin-top: 10px;
    font-size: 24px;
  }
}


.comboBox {
  margin: 10px auto;

  .content {
    display: flex;
    overflow-x: auto;

    // 隐藏滚动条
    &::-webkit-scrollbar {display: none;}

    .item {
      font-size: 24px;
      background-color: #fff;
      width: 200px;
      margin: 10px;
      padding: 30px 10px;
      border-radius: 15px;

      -webkit-box-shadow: inset -1px 3px 8px 5px #ffffff, 2px 5px 16px 0px #444c55, -9px -8px 22px 6px rgba(0,0,0,0); 
      box-shadow: inset -1px 3px 8px 5px #ffffff, 2px 5px 16px 0px #444c55, -9px -8px 22px 6px rgba(0,0,0,0);
      

      .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }

      .block {
        width: 120px;
        height: 120px;
        background-color: #fff;
      }
      
      .name {
        text-align: center;
        font-size: 36px;
      }

      .price {
        padding: 15px 0;
        text-align: center;
        color: #f22222;
        font-size: 36px;
        font-weight: 700;
      }

      .desc {
        overflow: hidden;
        font-size: 18px;
        padding-bottom: 30px;
        .text {
          width: 100%;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow-wrap: break-word;
          white-space: normal;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>