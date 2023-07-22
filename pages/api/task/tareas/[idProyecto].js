import clienteAxios from '@/api/clienteAxios'

const obtenerTareas= async (req, res) => {
  const idProyecto = req.query.idProyecto
    const token = req.cookies.token

  try {
    const {data} = await clienteAxios(`/tarea/tareas/${idProyecto}`, {headers:{'x-token': token}})
    res.status(200).json(data)
} catch (error) {
   res.status(401).json(error.response.data)
  }
  

}

export default obtenerTareas