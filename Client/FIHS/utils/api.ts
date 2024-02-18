import axios from 'axios'
const api  = axios.create({
    baseURL:`${process.env.BACKEND_URL}/api`,
})
export default api