<template>
  <div class="shopCustomP2">
    
    <!-- 头部 -->
    <div class="title">
      <!-- 背景 -->
      <div class="back">
      </div>
      <div class="text">
        <div class="content">
          <span class="title-name">自定义选配</span>
          <van-icon name="like" />
          <span class="user-name">用户名称</span>
        </div>  
      </div>
    </div>

    <!-- 文字提示 -->
    <div class="attention">
      <div class="text1">
        <span>下一个是？</span>
      </div>
      <div class="text2">
        <span>为了适配您心爱的CPU，接下来您要选择您的主板。</span>
      </div>
    </div>
    
    <!-- 主板选择 -->
    <div class="motherboard-select">
      <div class="content">
        <div class="left-box">
          <!-- 标题 -->
          <div class="title">
            <span>主板选择</span>
          </div>
        </div>
        <div class="right-box">
          <div class="list">
            <van-radio-group v-model="motherBoardSelector">
              <van-cell-group inset>
                <div class="item" v-for="(item, index) in motherBoardShowList" :key="index">
                  <van-cell clickable @click="motherGetProductId(index, item.product_id, item)">
                    <template #right-icon>
                      <van-radio :name = index />
                    </template>
                    <template #title>
                      <span class="title-text">{{ item.firm }}&nbsp;-&nbsp;</span>
                      <span>{{ item.model_name }}&nbsp;-&nbsp;</span>
                      <span>￥{{ item.price }}</span>
                    </template>
                  </van-cell>
                </div>
              </van-cell-group>
            </van-radio-group>
          </div>
        </div>
      </div>
    </div>

    <!-- 价格总计 -->
    <div class="total-price">
      <span>现价格：</span>
      <span>￥</span>
    </div>

  </div>
</template>

<script setup>
// 导入插件
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { showFailToast } from 'vant';

// 导入用户和套餐store
import userLogMessage from "@/store/models/user-mes"
import userCustomStore from "@/store/models/user-custom/user-custom"

// 导入数据表
import requestingDB from "@/database/index"

// 获取store中当前套餐的信息
const logedUser = userLogMessage()
const customStore = userCustomStore()
// 获取当前套餐的产品信息
console.log(customStore)

// 获取当前套餐中cpu的接口类型
const cpu_plugs_id = customStore.customMes.products?.cpu.plugs_id
console.log(cpu_plugs_id)

// 动态获取当前选择的主板
const motherBoardSelector = ref()
// 动态展示主板列表
const motherBoardShowList = ref([])

// fn: 获取当前点击的主板信息
const motherGetProductId = (index, motherboard_product_id, product_mes) => {
  var productMes = product_mes
  motherBoardSelector.value = index
  // 获取当前主板的价格
  var motherboard_price = productMes.price

  // 把该信息修改到store中的套餐信息中
  customStore.customMes.products.motherboard = productMes
  customStore.total_price = customStore.total_price + motherboard_price
  console.log("修改store中的主板", customStore)
}

// fn: 从数据库中获取关于主板的信息
const motherBoardGetList = async() => {
  var motherBoardList = []
  var plugs = cpu_plugs_id

  // 根据cpu接口类型获取主板
  var resultDB = await requestingDB.getMotherBoardListDB(plugs)
  console.log(resultDB)

  // 将获取到的主板列表存储到现在的数据中
  for (var i = 0; i < resultDB.length; i++) {
    var mdObj = {}
    mdObj.product_id = resultDB[i].product_id
    mdObj.firm = resultDB[i].firm
    mdObj.model_name = resultDB[i].model_name
    mdObj.price = resultDB[i].price
    mdObj.cpu_plugs_id = resultDB[i].cpu_plugs_id
    
    motherBoardList.push(mdObj)
  }
  console.log(motherBoardList)

  // 动态展示到前端中
  motherBoardShowList.value = motherBoardList
}

// 获取主板数据表
motherBoardGetList()

// fn: 点击下一步跳转

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

  .motherboard-select {
    margin: 30px 30px 0 30px;
    .content {
      border-radius: 15px;
      height: 250px;
      padding: 20px;
      display: flex;
      background-color: #fff;
      .left-box {
        border-right: 1px solid #dadada;
        padding-right: 10px;
        .title {
          font-size: 48px;
          font-weight: 600; 
          span {
            writing-mode: vertical-rl;
          }
        }
      }
      .right-box {
        overflow-y: scroll;
        min-width: 270px;
        flex: 1;
        .list {
          .item {
            .title-text {
              width: 180px;
              display: inline-block;
              white-space: normal;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
      
      
    }
  }
  .total-price {
    margin: 10px 30px 0 30px;
    border-radius: 15px;
    padding: 10px 20px;
    background-color: #fff;
    font-size: 28px;
  }
</style>