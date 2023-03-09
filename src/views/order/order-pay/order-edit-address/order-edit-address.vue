<template>
  <div class="orderEditAddress">
    <!-- 头部 -->
    <div class="title">
      <!-- 背景 -->
      <div class="back">
      </div>
      <div class="text">
        <div class="content">
          <span class="title-name">修改地址</span>
          <van-icon name="like" />
          <span class="user-name">用户名称</span>
        </div>  
      </div>
    </div>

    <!-- 文字提示 -->
    <div class="attention">
      <div class="text1">
        <span>您的收货地址</span>
      </div>
      <div class="text2">
        <span>请确保您填写的地址是否正确，以防止不必要的错误。</span>
      </div>
    </div>

    <!-- 编辑地址 -->
    <div class="address">
      <van-address-edit
        :area-list="areaList"
        show-delete
        :address-info="editingInfo"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </div>

  </div>
</template>

<script setup>
// 导入插件
import { ref } from 'vue';
import { areaList } from '@vant/area-data';
import { showConfirmDialog } from 'vant';

import { useRouter } from 'vue-router';

// 导入store
import userOrderStore from "@/store/models/user-order/user-order"

const orderUnPayList = userOrderStore()
const orderMes = orderUnPayList.orderMes

const router = useRouter()

// 获取来自store中的地址信息

// 展示已有的数据到前端中
const editingInfo = ref({
  tel: orderMes.detail.number,
  name: orderMes.detail.contact
})

// fn: 点击保存按钮的时候，将数据提交到store中
const onSave = (contactInfo) => {
  console.log(contactInfo)

  // 将所有的数据导入到store中
  orderMes.detail.contact = contactInfo.name
  orderMes.detail.number = contactInfo.tel

  // 格式化地址信息
  var province = contactInfo.province
  var city = contactInfo.city
  var county = contactInfo.county
  var addressDetail = contactInfo.addressDetail

  // var fullAddress = province? + city? + county? + addressDetail
  var fullAddress = `${province}${city}${county}${addressDetail}`
  orderMes.detail.address = fullAddress

  console.log(orderMes)

  // // 提示返回上一个页面
  showConfirmDialog({
    message:
      '信息已修改，可确认返回上一个页面。',
    }).then(() => {
      // on confirm
      router.back()
    }).catch(() => {
      // on cancel
    });

}

// fn: 点击删除按钮的时候，将数据清除
const onDelete = (contactInfo) => {
  contactInfo.name = ''
  contactInfo.tel = ''
  contactInfo.province = ''
  contactInfo.city = ''
  contactInfo.county = ''
  contactInfo.addressDetail = ''
}

const onChangeDetail = (val) => {
  console.log(val)
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
  padding-top: 10px;
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
</style>