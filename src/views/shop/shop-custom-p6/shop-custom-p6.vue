<template>
  <div class="shopCustomP6">
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
        <span>澎湃的功率</span>
      </div>
      <div class="text2">
        <span>为您的电脑选择电源，提供稳定的功率保障机器正常的工作。</span>
      </div>
    </div>

    <!-- 电源选择 -->
    <div class="power-select">
      <div class="content">
        <div class="left-box">
          <!-- 标题 -->
          <div class="title">
            <span>电源选择</span>
          </div>
        </div>
        <div class="right-box">
          <div class="list">
            <van-radio-group v-model="powerSelector">
              <van-cell-group inset>
                <div class="item" v-for="(item, index) in powerShowList" :key="index">
                  <van-cell clickable @click="powerProductId(index, item.product_id, item)">
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
      <span>￥{{ totalPriceShow }}</span>
    </div>

    <!-- 下一步按钮 -->
    <div class="btn-nextpage">
      <div class="btn">
        <van-button 
          type="primary" 
          size="large"
          color="linear-gradient(270deg, #84fab0 0%, #8fd3f4 100%)"
          @click="nextPageClick"
          >下一步</van-button>
      </div>
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
import { toNumber } from '@vue/shared';

const router = useRouter()

// 获取store中当前套餐的信息
const logedUser = userLogMessage()
const customStore = userCustomStore()
// 获取当前套餐的产品信息
console.log(customStore)

// 动态展示电源列表
const powerShowList = ref([])
// 动态获取当前选择的电源
const powerSelector = ref()
// 动态展示总价格
const total_price = customStore.total_price
const totalPriceShow = ref(total_price)

// fn: 获取当前点击的电源信息
const powerProductId = (index, power_product_id, product_mes) => {
  var productMes = product_mes
  powerSelector.value = index
  // 获取当前电源的价格
  var power_price = productMes.price

  // 把信息修改到store中的套餐信息中
  customStore.customMes.products.power = productMes

  // 总价格
  totalPriceShow.value= total_price + power_price
  console.log("修改store中的电源", customStore)
}

// fn: 从数据库中获取关于电源的信息
const powerGetList = async () => {
  var powerList = []
  // 获取GPU的功率
  var gpu_recommended_power = toNumber(customStore.customMes.products.gpu.recommended_prower)

  // 根据GPU的功率获取电源的数据表
  var resultDB = await requestingDB.getPowerListDB(gpu_recommended_power)
  console.log(resultDB)

  // 将获取的电源列表存储到现在的新数组中
  for (var i = 0; i < resultDB.length; i++) {
    var powerObj = {}
    powerObj.product_id = resultDB[i].product_id
    powerObj.firm = resultDB[i].firm
    powerObj.model_name = resultDB[i].model_name
    powerObj.price = resultDB[i].price
    powerObj.max_power = resultDB[i].max_power
    
    powerList.push(powerObj)
  }
  console.log(powerList)

  // 动态展示到前端中
  powerShowList.value = powerList
}

// 获取电源数据表
powerGetList()

// fn: 点击下一步跳转
const nextPageClick = () => {
  // 判断当前用户是否已选择
  if (powerSelector.value === undefined) {
    // 未选择则弹出错误窗口
    showFailToast('请选择一个规格');
  } else {
    // 把总价格修改到store中
    customStore.total_price = totalPriceShow.value
    // 已选择好可以跳转到下一个页面
    console.log("跳转")
    router.push("/shop-custom-p7")
  }
}


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

  .power-select {
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
              width: 140px;
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
  .btn {
    font-size: 48px;

    --van-button-large-height: 100px;
    --van-button-default-font-size: 24px;

    margin: 0 auto;
    margin-top: 30px;
    width: 80%;
    -webkit-box-shadow: 7px 11px 10px 1px rgba(0,0,0,0.225); 
    box-shadow: 7px 11px 10px 1px rgba(0,0,0,0.225);
  }
</style>