import clienteAxios from "@/api/clienteAxios"

const proyectos = async (req, res) => {
    const token = req.cookies.token
  try {
    const {data} = await clienteAxios('/proyecto', {headers:{'x-token':token}})
    res.status(200).json(data)
  } catch (error) {
    res.status(404).json(error.response.data)
  }
}

export default proyectos