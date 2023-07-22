import clienteAxios from '@/api/clienteAxios'

const solicitudCambioPassword = async (req, res) => {

    if (req.method === 'POST') {
       
        try {
           const {data} =  await clienteAxios.post('/auth/solicitudCambioPassword', req.body)
        
        res.status(200).json(data)
        
        } catch (error) {
            res.status(400).json(error.response.data)
        }
    }
}

export default solicitudCambioPassword