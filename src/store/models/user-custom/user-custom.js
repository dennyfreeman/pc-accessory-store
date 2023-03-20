import { defineStore } from "pinia";

const userCustomStore = defineStore("App", {
  state:() => ({
    userId: "",
    userName: "",
    total_price: 0,
    customMes: {}
  }),
  actions: {

  }
})

export default userCustomStore