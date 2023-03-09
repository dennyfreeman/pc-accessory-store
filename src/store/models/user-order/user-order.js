import { defineStore } from "pinia";

const userOrderStore = defineStore("App", {
  state:() => ({
    userId: "",
    userName: "",
    orderStatus: 0,
    orderMes: {}
  }),
  actions: {

  }
})

export default userOrderStore