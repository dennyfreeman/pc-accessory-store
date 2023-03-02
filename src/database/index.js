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


}


export default new requestingDB()