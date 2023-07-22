import clienteAxios from "@/api/clienteAxios"


const proyecto = async (req, res) => {
  const token = req.cookies.token
  const idProyecto = req.query.idProyecto

if (req.method==='GET') {
  try {
    const {data} = await clienteAxios(`/proyecto/${idProyecto}`, {headers: {'x-token': token}})
    //console.log(data)
    res.status(200).json(data)
  } catch (error) {
    console.log(error.response.data)
    res.status(401).json(error.response.data)
  }
  
}


  if (req.method === 'DELETE') {
    //console.log('eliminado proyecto')
    //console.log(token)
    //console.log(idProyecto)
    try {
      
      const {data} = await clienteAxios.delete(`/proyecto/${idProyecto}`, {headers: {'x-token':token}})
      //console.log(data)
      res.status(200).json(data)
    } catch (error) {
      res.status(401).json(error.response.data)
    }
  }

  if (req.method === 'PUT') {
    try {
      const {data} = await clienteAxios.put(`/proyecto/${idProyecto}`, req.body, {headers: {'x-token':token}})
      console.log(data)
      res.status(200).json(data)
    } catch (error) {
      res.status(401).json(error.response.data)
    }
  }


}

export default proyecto