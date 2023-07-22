import axios from "axios"


const clienteAxios = axios.create({
    baseURL:`${process.env.API_URL}/api`
})

export default clienteAxios