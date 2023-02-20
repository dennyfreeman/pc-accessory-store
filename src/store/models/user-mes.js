import { defineStore } from "pinia";

const userLogMessage = defineStore("App", {
  state:() => ({
    userId: "",
    userName: ""
  }),
  actions: {

  }
})

export default userLogMessage