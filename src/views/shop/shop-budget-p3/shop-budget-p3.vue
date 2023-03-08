<template>
  <div class="shopBudgetP3 back">
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
        <!-- 实时监控store中套餐统计 -->
        <span class="price">￥{{ showComboPrice }}</span>
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
                      <span>{{ item.model_name }}&nbsp;-&nbsp;</span>
                      <span>￥{{ item.price }}</span>
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
            <!-- gpu选择 -->
            <van-radio-group v-model="gpuSelector"  @click.stop>
              <van-cell-group inset>
                <div v-for="(item, index) in gpuShowList" :key="index">
                  <van-cell clickable @click="gpuGetProductId(index, item.product_id, item)">
                    <template #title>
                      <span>{{ item.firm }}&nbsp;-&nbsp;</span>
                      <span>{{ item.model_name }}&nbsp;-&nbsp;</span>
                      <span>￥{{ item.price }}</span>
                    </template>
                    <template #right-icon>
                      <van-radio :name = index />
                    </template>
                  </van-cell> 
                </div>       
              </van-cell-group>
            </van-radio-group>
          </van-collapse-item>
          <van-collapse-item title="硬盘" name="3" @click="hardDriveGetList">
            <!-- 硬盘选择 -->
            <van-radio-group v-model="hardDriveSelector"  @click.stop>
              <van-cell-group inset>
                <div v-for="(item, index) in hardDriveShowList" :key="index">
                  <van-cell clickable @click="hardDriveProductId(index, item.product_id, item)">
                    <template #title>
                      <span>{{ item.firm }}&nbsp;-&nbsp;</span>
                      <span class="block-text">{{ item.model_name }}&nbsp;-&nbsp;</span>
                      <span>{{ item.memory_size }}&nbsp;-&nbsp;</span>
                      <span>￥{{ item.price }}</span>
                    </template>
                    <template #right-icon>
                      <van-radio :name = index />
                    </template>
                  </van-cell> 
                </div>       
              </van-cell-group>
            </van-radio-group>
          </van-collapse-item>
          <van-collapse-item title="主板" name="4" @click="motherBoardGetList">
             <!-- 主板选择 -->
             <van-radio-group v-model="motherBoardSelector"  @click.stop>
              <van-cell-group inset>
                <div v-for="(item, index) in motherBoardShowList" :key="index">
                  <van-cell clickable @click="motherBoardProductId(index, item.product_id, item)">
                    <template #title>
                      <span>{{ item.firm }}&nbsp;-&nbsp;</span>
                      <span>{{ item.model_name }}&nbsp;-&nbsp;</span>
                      <span>￥{{ item.price }}</span>
                    </template>
                    <template #right-icon>
                      <van-radio :name = index />
                    </template>
                  </van-cell> 
                </div>       
              </van-cell-group>
            </van-radio-group>
          </van-collapse-item>
          <van-collapse-item title="电源" name="5" @click="powerGetList">
            <!-- 电源选择 -->
            <van-radio-group v-model="powerSelector"  @click.stop>
              <van-cell-group inset>
                <div v-for="(item, index) in powerShowList" :key="index">
                  <van-cell clickable @click="powerProductId(index, item.product_id, item)">
                    <template #title>
                      <span>{{ item.firm }}&nbsp;-&nbsp;</span>
                      <span>{{ item.model_name }}&nbsp;-&nbsp;</span>
                      <span>￥{{ item.price }}</span>
                    </template>
                    <template #right-icon>
                      <van-radio :name = index />
                    </template>
                  </van-cell> 
                </div>       
              </van-cell-group>
            </van-radio-group>
          </van-collapse-item>
          <van-collapse-item title="内存条" name="6" @click="ramGetList">
            <!-- 内存条选择 -->
            <van-radio-group v-model="ramSelector"  @click.stop>
              <van-cell-group inset>
                <div v-for="(item, index) in ramShowList" :key="index">
                  <van-cell clickable @click="ramProductId(index, item.product_id, item)">
                    <template #title>
                      <span>{{ item.firm }}&nbsp;-&nbsp;</span>
                      <span class="block-text">{{ item.model_name }}&nbsp;-&nbsp;</span>
                      <span>{{ item.memory_size }}&nbsp;-&nbsp;</span>
                      <span>￥{{ item.price }}</span>
                    </template>
                    <template #right-icon>
                      <van-radio :name = index />
                    </template>
                  </van-cell> 
                </div>       
              </van-cell-group>
            </van-radio-group>
          </van-collapse-item>
        </van-collapse>
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
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router';

// 导入store
import userBudgetStore from "@/store/models/user-budget/user-budget"

// 导入数据表
import requestingDB from "@/database/index"

// 导入dayjs时间格式插件
import { formatDateTime, formatDateTimeID } from "@/utils/format_time"

// 产品标签选择器
const productsSelector = ref('')

const router = useRouter()

// 获取store中当前套餐的信息
const budgetStore = userBudgetStore()
const storeBudget = budgetStore.budget
const userId = budgetStore.userId
const comboMes = budgetStore.comboMes
const productsStore = comboMes.products

// 将所有的信息展示到前端，并且所有的产品信息都是动态获取
// 动态监控每个产品的id
const cpuSelector = ref()
const gpuSelector = ref()
const hardDriveSelector = ref()
const motherBoardSelector = ref()
const powerSelector = ref()
const ramSelector = ref()

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

// fn点击事件：修改套餐的gpu信息
const gpuGetProductId = (index, gpu_product_id, product_mes) => {
  var productMes = product_mes
  gpuSelector.value = index
  // 从前端判断用户选择哪个gpu
  console.log(index, gpu_product_id)
  // 并把该新修改到store中的套餐信息
  productsStore.gpu = productMes
  console.log("修改store中的gpu", productsStore.gpu)

}

// fn点击事件：修改套餐的硬盘信息
const hardDriveProductId = (index, harddrive_product_id, product_mes) => {
  var productMes = product_mes
  hardDriveSelector.value = index
  // 从前端判断用户选择哪个硬盘
  console.log(index, harddrive_product_id)
  // 并把该新修改到store中的套餐信息
  productsStore.harddrive = productMes
  console.log("修改store中的硬盘", productsStore.harddrive)
}

// fn点击事件：修改套餐的主板信息
const motherBoardProductId = (index, motherboard_product_id, product_mes) => {
  var productMes = product_mes
  hardDriveSelector.value = index
  // 从前端判断用户选择哪个主板
  console.log(index, motherboard_product_id)
  // 并把该新修改到store中的套餐信息
  productsStore.motherboard = productMes
  console.log("修改store中的主板", productsStore.motherboard)
}

// fn点击事件: 修改套餐的电源信息
const powerProductId = (index, power_product_id, product_mes) => {
  var productMes = product_mes
  powerSelector.value = index
  // 从前端判断用户选择哪个电源
  console.log(index, power_product_id)
  // 并把新修改的store中的套餐信息
  productsStore.power = productMes
  console.log("修改store中的电源", productsStore.power)
}

// fn点击事件: 修改套餐的内存条信息
const ramProductId = (index, power_product_id, product_mes) => {
  var productMes = product_mes
  ramSelector.value = index
  // 从前端判断用户选择哪个内存条
  console.log(index, power_product_id)
  // 并把新修改的store中的套餐信息
  productsStore.ram = productMes
  console.log("修改store中的内存条", productsStore.ram)
}


// 通过接口来获取不同的产品
// 通过store中cpu的接口，展示所有的cpu产品
// 获取当前cpu的接口
const cpuPlugsId = productsStore.motherboard.cpu_plugs_id
// 获取主板cpu的接口
const cpuMdPlugsId = productsStore.cpu.plugs_id
// 获取当前gpu接口
const gpuPlugsId = productsStore.gpu.plugs_id


// 通过接口id获取数据库中所有信息，并且把信息展示到前端
const cpuShowList = ref([])
// gpu信息
const gpuShowList = ref([])
// 硬盘信息
const hardDriveShowList= ref([])
// 主板信息
const motherBoardShowList= ref([])
// 电源信息
const powerShowList = ref([])
// 内存条信息
const ramShowList = ref([])

// 实时监控store中的整体价格  
const showComboPrice = computed(() => {
  var cpuPrice = productsStore.cpu.price
  var gpuPrice = productsStore.gpu.price
  var hardDrivePrice = productsStore.harddrive.price
  var motherBoardPrice = productsStore.motherboard.price
  var powerPrice = productsStore.power.price
  var ramPrice = productsStore.ram.price

  var totalPrice = cpuPrice + gpuPrice + hardDrivePrice + motherBoardPrice + powerPrice + ramPrice

  console.log(totalPrice)

  // 将统计数据更新到store的budget中
  budgetStore.budget = totalPrice

  // 把总计返回给前端
  return totalPrice
})


// 获取数据库数据
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

    gpuObj.product_id = resultDB[i].product_id
    gpuObj.firm = resultDB[i].firm
    gpuObj.model_name = resultDB[i].model_name
    gpuObj.price = resultDB[i].price
    gpuObj.plugs_id = resultDB[i].plugs_id
    gpuObj.recommended_prower = resultDB[i].recommended_prower
    
    gpuList.push(gpuObj)
  }
  console.log(gpuList)

  // 动态展示到前端中
  gpuShowList.value = gpuList
}

// fn: 从数据库中获取关于硬盘的信息
const hardDriveGetList = async () => {
  var hardDriveList = []

  // 根据接口获取硬盘列表
  var resultDB = await requestingDB.getHardDriveListDB()
  console.log(resultDB)

  // 将获取到的硬盘列表存储到现在新的数据中
  for (var i = 0; i < resultDB.length; i++) {
    var hardDriveObj = {}

    hardDriveObj.product_id = resultDB[i].product_id
    hardDriveObj.firm = resultDB[i].firm
    hardDriveObj.model_name = resultDB[i].model_name
    hardDriveObj.price = resultDB[i].price
    hardDriveObj.memory_size = resultDB[i].memory_size
    hardDriveObj.plugs_type = resultDB[i].plugs_type
    
    hardDriveList.push(hardDriveObj)
  }
  console.log(hardDriveList)

  // 动态展示到前端中
  hardDriveShowList.value = hardDriveList
}

// fn: 从数据库中获取关于主板的信息
const motherBoardGetList = async () => {
  // 获取cpu的主板接口
  var plugs = cpuMdPlugsId
  var motherBoardList = []

  // 根据cpu接口获取主板列表
  var resultDB = await requestingDB.getMotherBoardListDB(plugs)
  console.log(resultDB)

  // 将获取到的主板列表存储到现在新的数据中
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

// fn: 从数据库中获取关于电源的信息
const powerGetList = async () => {
  // 获取gpu的功率
  var gpu_recommended_power = productsStore.gpu.recommended_power
  var powerList = []

  // 根据功率大小获取电源列表
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

// fn: 从数据库中获取关于内存条的信息
const ramGetList = async () => {
  var ramList = []

  var resultDB = await requestingDB.getRamListDB()
  console.log(resultDB)

  // 将获取到的内存条列表存储到现在的新数组中
  for (var i = 0; i < resultDB.length; i++) {
    var ramObj = {}
    ramObj.product_id = resultDB[i].product_id
    ramObj.firm = resultDB[i].firm
    ramObj.model_name = resultDB[i].model_name
    ramObj.price = resultDB[i].price
    ramObj.memory_size = resultDB[i].memory_size
    
    ramList.push(ramObj)
  }
  console.log(ramList)

  // 动态展示到前端中
  ramShowList.value = ramList
}

const nextPageClick = () => {
  // 获取当前的套餐信息，并提交到订单中
  var comboListMes = budgetStore
  var orderListObj = {}
  orderListObj.user_id = comboListMes.userId
  orderListObj.user_name = comboListMes.userName
  orderListObj.total_price = comboListMes.budget
  orderListObj.products_list = productsStore

  // 生成订单状态信息
  orderListObj.order_status = 0

  // 生成订单待填充信息
  orderListObj.pay_time = ""
  // 联系人信息
  orderListObj.detail = {
    "contact": "",
    "address": "",
    "number": ""
  }
  // 运输信息
  orderListObj.progress = {
    "transport_mes": "",
    "transport_status": 0
  }
  orderListObj.finish_time = ""

  // 获取当前系统时间
  var nowTime = new Date()
  // 用dayjs处理格式
  var formatTime = formatDateTime(nowTime)
  console.log(formatTime)
  orderListObj.create_time = formatTime

  // 生成一个专属的订单id
  // 用户id_日期_价格
  var formatTimeID = formatDateTimeID(nowTime)
  var order_id = comboListMes.userId + '_' + formatTimeID + '_' + comboListMes.budget
  orderListObj.order_id = order_id
  
  // 将所有数据提交到订单数据表中
  console.log(orderListObj)

  var addOrderDb = requestingDB.addNewOrder(orderListObj)
  console.log(addOrderDb)

  // 跳转到下一页
  router.push("/shop-budget-p4")
}

</script>

<style lang="less" scoped>

.back {
    position: absolute;
    background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
    width: 100%;
    height: auto ;

    z-index: -99;
  }

.title {
  position: relative;
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
  padding: 10px;
  .content {
    background-color: #fff;
    padding: 5px;
    border-radius: 15px;
  }
}

.block-text {
  display: inline-block;
}

.btn {
    font-size: 48px;
    margin: 0 auto;
    margin-bottom: 30px;

    --van-button-large-height: 75px;
    --van-button-default-font-size: 24px;

    width: 80%;
    -webkit-box-shadow: 7px 11px 10px 1px rgba(0,0,0,0.225); 
    box-shadow: 7px 11px 10px 1px rgba(0,0,0,0.225);
  }

</style>