import clienteAxios from "@/api/clienteAxios"


const colaborador = async (req, res) => {
    const token = req.cookies.token
    const idProyecto = req.query.idProyecto

    //console.log(token)
    //console.log(idProyecto)
    //console.log(req.body)

    if (req.method ==="POST") {
        try {
            const {data} = await clienteAxios.post(`/proyecto/colaborador/${idProyecto}`, req.body, {headers:{'x-token':token}})
            res.status(200).json(data)
        } catch (error) {
            //console.log(error.response.data)
            res.status(401).json(error.response.data)    
        }
    }

    if (req.method === "PUT") {
        try {
            const {data} = await clienteAxios.put(`/proyecto/colaborador/${idProyecto}`, req.body, {headers: {'x-token':token}})
            res.status(200).json(data)
        } catch (error) {
            console.log(error.response.data)
            res.status(401).json(error.response.data)
        }
    }



}

export default colaborador