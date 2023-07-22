import clienteAxios from "@/api/clienteAxios"


const buscarColaborador = async (req, res) => {
    const token = req.cookies.token
    try {
        const {data} = await clienteAxios.post('/proyecto/buscarColaborador', req.body, {headers:{'x-token':token}})
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json(error.response.data)
    }
}

export default buscarColaborador