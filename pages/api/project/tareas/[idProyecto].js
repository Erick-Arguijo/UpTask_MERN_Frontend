import clienteAxios from '@/api/clienteAxios'
import React from 'react'

const tareas = async (req, res) => {
    const idProyecto = req.query.idProyecto
    const token = req.cookies.token
    try {
        const {data} = await clienteAxios(`/proyecto/tareas/${idProyecto}`, {headers: {'x-token':token}})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(401).json(error.response.data)
    }
 
}

export default tareas