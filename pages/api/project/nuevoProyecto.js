
import clienteAxios from '@/api/clienteAxios'
import axios from 'axios'


const nuevoProyecto = async (req, res) => {
  //console.log(req.body.token)

  try {
    const {data} = await clienteAxios.post('/proyecto',req.body ,{headers: {'x-token':req.body.token }}) 
    res.status(200).json(data)
  } catch (error) {
      res.status(401).json(error.response.data)
  }
}

export default nuevoProyecto