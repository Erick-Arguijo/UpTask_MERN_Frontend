import clienteAxios from '@/api/clienteAxios'


const edicionTarea = async (req, res) => {
    const idTarea = req.query.idTarea
    const token = req.cookies.token

    if (req.method ==='GET') {
        try {
            const {data} = await clienteAxios(`/tarea/${idTarea}`, {headers:{'x-token':token}})
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    if (req.method === 'PUT') {
    try {
        const {data} = await clienteAxios.put(`/tarea/${idTarea}`, req.body, {headers: {'x-token': token}})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(401).json(error)
    }
  }

  if (req.method === "DELETE") {
    try {
        const {data} = await clienteAxios.delete(`/tarea/${idTarea}`, {headers: {'x-token': token}})
        res.status(200).json(data)
    } catch (error) {
        res.status(401).json(error)
        console.log(error)
    }
  }
}

export default edicionTarea