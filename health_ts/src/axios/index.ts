//导入axios
import axios from 'axios'

const API = axios.create({
	timeout: 2000   //请求超时设置，单位ms
})

export default API
