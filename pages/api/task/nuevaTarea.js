import clienteAxios from '@/api/clienteAxios'


const nuevaTarea = async (req, res) => {
    try {
        const {data} = await clienteAxios.post('/tarea', req.body, {headers: {'x-token':req.cookies.token}})
        res.status(200).json(data)  
    } catch (error) {
       res.status(404).json(error.response.data)    
    }
}

export default nuevaTarea