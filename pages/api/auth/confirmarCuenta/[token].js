import clienteAxios from "@/api/clienteAxios"


const confirmarCuenta = async (req, res) => {

  const token = req.query.token
 
  try {
      const {data} = await clienteAxios(`/auth/confirmar/${token}`)
      //console.log(data)
      if (data.ok) {
        res.status(200).json(data)
      }
  } catch (error) {
      res.status(400).json(error.response.data)
      //console.log(error.response.data)
  }

}

export default confirmarCuenta