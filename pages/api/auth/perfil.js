import clienteAxios from "@/api/clienteAxios"

const perfil = async (req, res) => {
    //console.log(req.headers.token)
    try {
        const {data} = await clienteAxios('/auth/perfil', { headers: {'x-token' : req.headers.token}} )
        res.status(200).json(data)
    } catch (error) {
        res.status(401).json(error)
    }
}

export default perfil