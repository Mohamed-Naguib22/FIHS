import axios from 'axios'
axios.defaults.withCredentials = true
const api  = axios.create({
    baseURL:`http://192.168.1.10:7184/api`,
})
export default api

export const userApi = (token: string, rt?: string) => axios.create({
    baseURL:`http://192.168.1.10:7184/api`,
    withCredentials:true,
    headers:{
        Authorization:`Bearer ${token}`,
        "Cookie":rt
    }})
