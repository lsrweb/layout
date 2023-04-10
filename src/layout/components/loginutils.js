import { computed, ref } from "vue";
import store from "@/main"
export const useLogin = () => {
  const token = store.state.token

  const isLogin = () => {
   return store.state.token
  }
  const refReshToken = (val = "") => {
    store.commit("SET_TOKEN", val)
  }


  store.commit('SET_TOKEN',localStorage.getItem("token"))

  return {
    token,
    isLogin,
    refReshToken
  }
}

