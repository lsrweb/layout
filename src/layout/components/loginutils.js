import { ref } from "vue"

export function useLogin() {
  const token = ref(localStorage.getItem("token"))

  const isLogin = () => {
    if (token.value) return true
    else return false
  }
  const refReshToken = () => {
    token.value = localStorage.getItem("token")
  }


  return {
    token,
    isLogin,
    refReshToken
  }
}
