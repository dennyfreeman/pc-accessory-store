<template>
  <div class="shopBudgetP3">
    <!-- 此页面等同于自定义页面 -->
    
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

    {{ cpuShowList }}
    <div v-for="item in cpuShowList">
      {{ item.firm }}
    </div>
    <!-- 显示套餐信息 -->
    <div class="combo">
      <!-- 文字提示 -->
      <div class="attention">
        <div class="text1">
        <span>您的套餐信息</span>
      </div>
      <div class="text2">
        <span>如果您对当前的套餐不满意，可以根据需求修改您想要的配件。
        </span>
      </div>
      <!-- 显示套餐现有价格 -->
      <div class="combo-price">
        <span class="text">统计：</span>
        <span class="price">￥2343</span>
      </div>
      </div>
    </div>

    <!-- 显示修改套餐 -->
    <div class="custom">
      <div class="content">
        <van-collapse v-model="productsSelector" accordion>
          <van-collapse-item title="CPU" name="1" @click="cpuGetList">
            <!-- cpu选择 -->
            <van-radio-group v-model="cpuSelector"  @click.stop>
              <van-cell-group inset>
                <div v-for="(item, index) in cpuShowList" :key="index">
                  <van-cell clickable @click="cpuGetProductId(index, item.product_id, item)">
                    <template #title>
                      <span>{{ item.firm }}&nbsp;-&nbsp;</span>
                      <span>{{ item.model_name }}</span>
                    </template>
                    <template #right-icon>
                      <van-radio :name = index />
                    </template>
                  </van-cell> 
                </div>       
              </van-cell-group>
            </van-radio-group>
          </van-collapse-item>
          <van-collapse-item title="显卡" name="2" @click="gpuGetList">
            <!-- cpu选择 -->
            <van-radio-group v-model="cpuSelector"  @click.stop>
              <van-cell-group inset>
                <div v-for="(item, index) in cpuShowList" :key="index">
                  <van-cell clickable @click="cpuGetProductId(index, item.product_id, item)">
                    <template #title>
                      <span>{{ item.firm }}&nbsp;-&nbsp;</span>
                      <span>{{ item.model_name }}</span>
                    </template>
                    <template #right-icon>
                      <van-radio :name = index />
                    </template>
                  </van-cell> 
                </div>       
              </van-cell-group>
            </van-radio-group>
          </van-collapse-item>
          <van-collapse-item title="硬盘" name="3">
            在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
          </van-collapse-item>
          <van-collapse-item title="主板" name="4">
            在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
          </van-collapse-item>
          <van-collapse-item title="电源" name="5">
            在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
          </van-collapse-item>
          <van-collapse-item title="内存条" name="6">
            在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
          </van-collapse-item>
        </van-collapse>
      </div>
    </div>

  </div>
</template>

<script setup>
// 导入插件
import { ref } from 'vue';

// 导入store
import userBudgetStore from "@/store/models/user-budget/user-budget"

// 导入数据表
import requestingDB from "@/database/index"

// 产品标签选择器
const productsSelector = ref('1')

// 获取store中当前套餐的信息
const budgetStore = userBudgetStore()
const budget = budgetStore.budget
const userId = budgetStore.userId
const comboMes = budgetStore.comboMes
const productsStore = comboMes.products

// 将所有的信息展示到前端，并且所有的产品信息都是动态获取


// 动态监控每个产品的id
const cpuSelector = ref()

// fn点击事件：修改套餐的cpu信息
const cpuGetProductId = (index, cpu_product_id, product_mes) => {
  var productMes = product_mes
  cpuSelector.value = index
  // 从前端判断用户选择了哪个cpu
  console.log(index, cpu_product_id)
  // 并把该信息修改store中的套餐信息
  productsStore.cpu = productMes
  console.log("修改store中的cpu", productsStore.cpu)
}

// 通过接口来获取不同的产品
// 通过store中cpu的接口，展示所有的cpu产品
// 获取当前cpu的接口
const cpuPlugsId = productsStore.motherboard.cpu_plugs_id
// 获取当前gpu接口
const gpuPlugsId = productsStore.gpu.plugs_id

// 通过接口id获取数据库中所有的cpu信息
const cpuShowList = ref([])


// fn: 从数据库中获取关于cpu的信息
const cpuGetList = async () => {
  // cpu接口
  var plugs = cpuPlugsId
  var cpuList = []

  // 根据接口获取cpu列表
  var resultDB = await requestingDB.getCPUListDB(plugs)
  console.log(resultDB)

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

// fn: 从数据库中获取关于gpu的信息
const gpuGetList = async () => {
  // gpu接口
  var plugs = gpuPlugsId
  var gpuList = []

  // 根据接口获取gpu列表
  var resultDB = await requestingDB.getGPUListDB(plugs)
  console.log(resultDB)

  // 将获取的gpu列表存储到现在新的数据中
  for (var i = 0; i < resultDB.length; i++) {
    var gpuObj = {}
    // cpuObj.product_id = resultDB[i].product_id
    // cpuObj.firm = resultDB[i].firm
    // cpuObj.model_name = resultDB[i].model_name
    // cpuObj.price = resultDB[i].price
    // cpuObj.plugs_id = resultDB[i].cpu_plugs_id

    gpuObj.product_id = resultDB[i].product_id
    
    // cpuList.push(cpuObj)
  } 
} 


// 提交产品信息到订单数据表

</script>

<style lang="less" scoped>

.title {
  position: relative;
  .back {
    position: absolute;
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    width: 100%;
    height: 100%;

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

.combo {
  .attention {
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 20px;
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

  .combo-price {
    display: flex;
    align-items:last baseline;
    justify-content: center;
    padding-top: 20px;

    .text {
      font-size: 24px;
    }

    .price {
      font-size: 60px;
      font-weight: 600;
    }
  }
}


}

.custom {
  background-color: #84fab0;
  padding: 10px;
  .content {
    background-color: #fff;
    padding: 5px;
    border-radius: 15px;
  }
}


</style>