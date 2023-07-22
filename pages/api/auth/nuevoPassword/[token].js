import clienteAxios from "@/api/clienteAxios"
import axios from "axios"

const NuevoPassword = async (req, res) => {
    const token = req.query.token
    //console.log(req.body)
    //console.log(req.query.token)
  
    if (req.method === 'POST') {
      try {
        
        const {data} = await clienteAxios.post(`/auth/cambiarPassword/${token}`, req.body )  

        return res.status(200).json(data)

      } catch (error) {

        return res.status(400).json(error.response.data)
      }  
    }


}

export default NuevoPassword