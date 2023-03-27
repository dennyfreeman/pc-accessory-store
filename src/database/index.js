// 腾讯云数据库数据表获取
import cloudbase from "@cloudbase/js-sdk"

const app = cloudbase.init({
  env: "dennyfm-database-2f6chf3199fa734",
  region: "ap-guangzhou"
})
const auth = app.auth()

async function login() {
  await auth.anonymousAuthProvider().signIn();
  // 匿名登录成功检测登录状态isAnonymous字段为true
  const loginState = await auth.getLoginState();
  console.log(loginState.isAnonymousAuth); // true
}

// 开始登录云数据库
login()

var db = app.database()

// 获取来源数据表
// 用户表
const collectionPcStoreUserList = "user-pcstore"
// 套餐表
const collectionPcStoreComboList = "combo-pcstore"
// CPU表
const collectionPcStoreCPUList = "cpu-pcstore"
// GPU表
const collectionPcStoreGPUList = "gpu-pcstore"
// 硬盘表
const collectionPcStoreHardDriveList = "harddrive-pcstore"
// 主板表
const collectionPcStoreMotherBoardList = "motherboard-pcstore"
// 电源表
const collectionPcStorePowerList = "power-pcstore"
// 内存条表
const collectionPcStoreRamList = "ram-pcstore"
// 订单表
const collectionPcStoreOrderList = "order-pcstore"


// 腾讯数据库查询指令
const _ = db.command

// 定义不同的数据表操作方式
class requestingDB {

  // 查询用户表
  getUserMesDB(userName) {
    return new Promise((resolve, reject) => {
      db.collection(collectionPcStoreUserList)
      .where({
        "user_name": userName
      })
      .get()
      .then(res => {
        // 返回数据给前台
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 根据id获取用户表信息
  getUserMesDBById(userId) {
    return new Promise((resolve, reject) => {
      db.collection(collectionPcStoreUserList)
      .where({
        "_id": userId
      })
      .get()
      .then(res => {
        // 返回数据给前台
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 更新用户密码
  updateUserPw(userId, userPw) {
    return new Promise((resolve, reject) => {
      db.collection(collectionPcStoreUserList)
      .where({
        _id: userId
      })
      .update({
        user_pw: userPw
      })
    })
  }

  // 查询套餐表
  getComboListDB(price) {
    return new Promise((resolve, reject) => {
      db.collection(collectionPcStoreComboList)
      .get()
      .then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 查询cpu表，对标cpu接口
  getCPUListDB(plugs = "") {
    if (plugs) {
      return new Promise((resolve, reject) => {
        db.collection(collectionPcStoreCPUList)
        .where({
          "cpu_plugs_id": plugs
        })
        .get()
        .then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        db.collection(collectionPcStoreCPUList)
        .get()
        .then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }

  // 查询gpu表，对标gpu接口
  getGPUListDB(plugs = "") {
    if (plugs) {
      return new Promise((resolve, reject) => {
        db.collection(collectionPcStoreGPUList)
        .where({
          "plugs_id": plugs
        })
        .get()
        .then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        db.collection(collectionPcStoreGPUList)
        .get()
        .then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }

  // 查询硬盘表
  getHardDriveListDB() {
    return new Promise((resolve, reject) => {
      db.collection(collectionPcStoreHardDriveList)
      .get()
      .then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 查询主板，对标cpu接口
  getMotherBoardListDB(plugs = "") {
    return new Promise((resolve, reject) => {
      db.collection(collectionPcStoreMotherBoardList)
      .where({
        "cpu_plugs_id": plugs
      })
      .get()
      .then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  //查询电源，对标显卡推荐功率
  getPowerListDB(power = 0) {
    return new Promise((resolve, reject) => {
      db.collection(collectionPcStorePowerList)
      .where({
        max_power: _.gte(power)
      })
      .get()
      .then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 查询内存条表
  getRamListDB() {
    return new Promise((resolve, reject) => {
      db.collection(collectionPcStoreRamList)
      .where({
        "DDR": "DDR4"
      })
      .get()
      .then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 添加订单
  addNewOrder(order) {
    return new Promise((resolve, reject) => {
      db.collection(collectionPcStoreOrderList)
      .add(order)
      .then(res => {
        console.log("提交成功", res)
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 查询订单
  getOrderListDB(userId, status) {
    return new Promise((resolve, reject) => {
      db.collection(collectionPcStoreOrderList)
      .where({
        "order_status": status,
        "user_id": userId
      })
      .get()
      .then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 更新订单信息
  updateOrderList(orderId, updateMes) {
    return new Promise((resolve, reject) => {
      db.collection(collectionPcStoreOrderList)
      .where({
        order_id: orderId
      })
      .update({
        detail: _.set({
          address: updateMes.address,
          contact: updateMes.contact,
          number: updateMes.number
        }),
        progress: _.set({
          transport_mes: "货物已送达到目的地，请点击签收。"
        }),
        order_status: 1
      })
    })
  }

  // 更新订单状态
  updateOrderStatus(orderId) {
    return new Promise((resolve, reject) => {
      db.collection(collectionPcStoreOrderList)
      .where({
        order_id: orderId
      })
      .update({
        progress: _.set({
          transport_status: 1
        }),
        order_status: 2
      })
    })
  }

  // 更新订单评价信息
  updateOrderComment(orderId, commentMes) {
    return new Promise((resolve, reject) => {
      db.collection(collectionPcStoreOrderList)
      .where({
        order_id: orderId
      })
      .update({
        comment: _.set({
          score: commentMes.score,
          comment: commentMes.message,
          status: 1
        })
      })
    })
  }

  // 删除对应订单
  deleteOrder(order_id) {
    return new Promise((resolve, reject) => {
      db.collection(collectionPcStoreOrderList)
      .where({
        "order_id": order_id
      })
      .remove()
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    })
  }

}


export default new requestingDB()