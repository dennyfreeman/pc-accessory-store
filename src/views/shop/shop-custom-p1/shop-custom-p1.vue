<template>
  <div class="shopCustomP1">
    <!-- 插件 -->
    <!-- 浮窗 -->
    <van-toast v-model:show="show" style="padding: 0">
      <template #message>
        <van-image :src="image" width="200" height="140" style="display: block" />
      </template>
    </van-toast>

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
        <span>更好的定制</span>
      </div>
      <div class="text2">
        <span>不了解如何适配接口没关系，只需跟着我们的步骤您就能选出您心爱的电脑。</span>
      </div>
    </div>

    <!-- CPU选择 -->
    <div class="cpu-select">
      <div class="content">
        <div class="left-box">
          <!-- 标题 -->
          <div class="title">
            <span>CPU选择</span>
          </div>
        </div>
        <div class="right-box">
          <div class="list">
            <van-radio-group v-model="cpuSelector">
              <van-cell-group inset>
                <div class="item" v-for="(item, index) in cpuShowList" :key="index">
                  <van-cell clickable @click="cpuGetProductId(index, item.product_id, item)">
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

const router = useRouter()

// 获取store中当前套餐的信息
const logedUser = userLogMessage()
const customStore = userCustomStore()
const userId = logedUser.userId
// 把当前用户的id记录到套餐store中
customStore.userId = userId
// 获取当前套餐的cpu产品信息
console.log(customStore)


// 动态获取当前选择的cpu
const cpuSelector = ref()
// 动态展示cpu列表
const cpuShowList = ref([])

// fn: 获取当前点击的cpu信息
const cpuGetProductId = (index, cpu_product_id, product_mes) => {
  var productMes = product_mes
  cpuSelector.value = index
  // 获取当前cpu的价格
  var cpu_price = productMes.price
  
  // console.log(index, cpu_product_id, productMes)
  //并把该信息修改到store中的套餐信息
  var cpuObj = {
    products: {
      cpu: productMes
    }
  }
  customStore.customMes = cpuObj
  customStore.total_price = cpu_price
  console.log("修改store中的cpu", customStore)
}


// fn: 从数据库中获取关于cpu的信息
const cpuGetList = async () => {
  var cpuList = []

  // 直接获取cpu列表
  var resultDB = await requestingDB.getCPUListDB()
  // console.log(resultDB)

  // 将获取的cpu列表存储到现在的新的数组中
  for (var i = 0; i < resultDB.length; i++) {
    var cpuObj = {}
    cpuObj.product_id = resultDB[i].product_id
    cpuObj.firm = resultDB[i].firm
    cpuObj.model_name = resultDB[i].model_name
    cpuObj.price = resultDB[i].price
    cpuObj.plugs_id = resultDB[i].cpu_plugs_id
    
    cpuList.push(cpuObj)
  }
  console.log(cpuList)

  // 动态展示到前端中
  cpuShowList.value = cpuList
}

// 获取数据表中的数据
cpuGetList()

// fn: 点击下一步跳转
const nextPageClick = () => {
  // 判断当前用户是否已选择
  if (cpuSelector.value === undefined) {
    // 未选择则弹出错误窗口
    showFailToast('请选择一个规格');
  } else {
    // 已选择好可以跳转到下一个页面
    console.log("跳转")
    router.push("/shop-custom-p2")
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

  .cpu-select {
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