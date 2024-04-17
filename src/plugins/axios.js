import axios from "axios"
import { useUserStore } from '@/stores/userStore.js'

axios.defaults.baseURL = import.meta.env.VITE_API_URL + '/api'
axios.defaults.headers.post['Content-Type'] = 'application/ld+json'
axios.defaults.headers.patch['Content-Type'] = 'application/merge-patch+json'

axios.interceptors.request.use((config) => {
    if (config.url !== '/users/auth') {
        const useStore = useUserStore()
        config.headers.Authorization = 'bearer ' + useStore.accessToken
    }

    return config
})

export default axios
