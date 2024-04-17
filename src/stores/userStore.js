import { defineStore } from 'pinia'
import postRequest from "@/plugins/requests/postRequest";
import getRequest from "@/plugins/requests/getRequest";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL + '/api'

export const useUserStore = defineStore('userStore', {
  actions: {
    pushPersonalData(data) {
      return postRequest('/users/personal_data', data)
    },
    fetchToken(data) {
      return postRequest('/users/auth', data)
        .then((response) => {
          this.updateToken(response)
        })
    },

    fetchAmoAuthToken(code) {
      return getRequest('/users/auth_amo?code=' + code)
        .then((response) => {
          this.status = response.status
        })
    },
    updateToken(response) {
      localStorage.setItem('accessToken', response.data.accessToken)
      localStorage.setItem('refreshToken', response.data.refreshToken)

      this.accessToken = response.data.accessToken
      this.refreshToken = response.data.refreshToken
    },
  },
  state: () => ({
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    status: null
  }),
  getters: {}
})
