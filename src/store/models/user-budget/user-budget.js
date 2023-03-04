import { defineStore } from "pinia";

const userBudgetStore = defineStore("App", {
  state:() => ({
    userId: "",
    userName: "",
    budget: 0,
    comboMes: {}
  }),
  actions: {

  }
})

export default userBudgetStore