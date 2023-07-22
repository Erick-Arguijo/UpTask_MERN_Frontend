import { validarFormProyecto } from '@/helpers/validarFormProyecto'
import axios from 'axios'
import validator from 'validator';
import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'
import useAuth from '@/hooks/useAuth';
import { io } from "socket.io-client";


const ProjectContext = createContext()
let socket

const ProjectProvider = ({children}) =>{
    const router = useRouter()
    const {usuario} = useAuth()

    const [Rol, setRol] = useState('')
    const [IsLoading, setIsLoading] = useState(true)
    const [IsLoadingProyecto, setIsLoadingProyecto] = useState(true)
    const [proyectos, setproyectos] = useState([])
    const [tareas, settareas] = useState([])
    const [colaboradores, setcolaboradores] = useState([])
    const [proyecto, setproyecto] = useState({})
    //const [proyectoEditar, setproyectoEditar] = useState({})
    const [colaborador, setcolaborador] = useState({})
    const [tareaEditar, settareaEditar] = useState({})
    const [alerta, setalerta] = useState({})
    const [resetFormulario, setresetFormulario] = useState(false)
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpenC, setIsOpenC] = useState(false)
    const [modalBusqueda, setmodalBusqueda] = useState(false)
  

   useEffect(() => {

    const obtenerProyectos = async () =>{
        //console.log(usuario.usuario?._id)
        if (!usuario.usuario) {
            return 
        }
        try {
            const {data} = await axios(`/api/project/proyectos`)
            const proyectosActualizado = await data.proyectos.map(proyectoState => proyectoState.creador === usuario.usuario._id ? 
                {...proyectoState, rol:"Creador"} : {...proyectoState, rol:"Colaborador"} )
                setIsLoading(false)
                setproyectos(proyectosActualizado)
                
        } catch (error) {
            console.log(error)
        }
    }
    obtenerProyectos()
    //obtenerTareas('64a637df02b5ff566a9af603')
}, [usuario])
   

useEffect(() => {
  socket = io(process.env.NEXT_PUBLIC_API_URL)
}, [])





    const nuevoProyecto = async(proyecto)=>{
        const token = localStorage.getItem('token')
        setresetFormulario(false)
        const validacion = validarFormProyecto(proyecto)
        if (Object.entries(validacion).length >0) {
            return setalerta(validacion)
         }


        try {
            const nuevoProyecto = {...proyecto, token}
            const { data } = await axios.post('/api/project/nuevoProyecto', nuevoProyecto) 
            setproyectos([...proyectos, data.proyecto])
            setalerta(data)
            setresetFormulario(true)
            setTimeout(() => {    
                router.push('/proyecto')
                setTimeout(() => {
                    setresetFormulario(false)
                    setalerta({})
                }, 3000);
            }, 2000);


        } catch (error) {
            console.log(error)
            setalerta({ok:false , msj:error.response.data})
        }
        
    
    }



    const obtenerProyecto = async(idProyecto) =>{
       setIsLoadingProyecto(true)
        setalerta({})
        try {
            const {data} = await axios(`/api/project/proyecto/${idProyecto}`)
            //console.log(data)
            //const {data:dataT} = await axios(`/api/task/tareas/${idProyecto}`) 
                setproyecto(data.proyecto)
                settareas(data.proyecto.tareas)
                setcolaboradores(data.proyecto.colaboradores)
                setIsLoadingProyecto(false)
                setTimeout(() => {
                    setIsLoadingProyecto(true) 
                }, 1000);
        } catch (error) {
            setalerta(error.response.data)
            setproyecto({})
            console.log(error.response.data)
            setIsLoadingProyecto(false)
            setTimeout(() => {
                setIsLoadingProyecto(true) 
            }, 1000);
        }
    }

 
    const editarProyecto = async(idProyecto, proyecto) =>{

        const validacion = validarFormProyecto(proyecto)
        if (Object.entries(validacion).length >0) {
            return setalerta(validacion)
         }

        try {
            const {data} = await axios.put(`/api/project/proyecto/${idProyecto}`, proyecto)
            
            const actulizarProyectos = proyectos.map(proyecto => proyecto._id === idProyecto ? 
                data.proyectoActualizado : proyecto )
            
            setproyectos(actulizarProyectos)
            setalerta(data)
            setresetFormulario(true)
            setTimeout(() => {    
                router.back()
                setresetFormulario(false)
                setalerta({})
            }, 2000);
                
       
        } catch (error) {
            console.log(error)
        }

    }

    const eliminarProyecto = async(idProyecto) =>{
        //console.log(idProyecto)
        try {
            const {data} =  await axios.delete(`/api/project/proyecto/${idProyecto}`)     
            if (data.ok) {
               const proyectosActualizado = proyectos.filter(proyecto => proyecto._id !== idProyecto) 
                setproyectos(proyectosActualizado)
                return data
            }  
        } catch (error) {
            console.log(error)
        }
    }


    const buscarColaborador = async(colaborador)=>{
        if (!validator.isEmail(colaborador.correo)) {
            return setalerta({ok:false ,msj:'Email no valido'})
        }
       try {
        setalerta({})
        //console.log(colaborador)
        const {data} = await axios.post('/api/project/buscarColaborador', colaborador)
        setcolaborador(data.usuario)
    } catch (error) {
        setalerta(error.response.data)
        //console.log(error.response.data)
       }
    }

    const nuevoColaborador = async(idProyecto, correo) =>{
        try {
            const {data} = await axios.post(`/api/project/colaborador/${idProyecto}`, {correo} )
            setalerta(data)
            setTimeout(() => {
                setalerta({})
                setcolaborador({})
            }, 2500);
              
        } catch (error) {
            setalerta(error.response.data)
            setTimeout(() => {
                setalerta({})
                setcolaborador({})
            }, 2500);
        }

    }

    const eliminarColaborador = async(idProyecto, correo) =>{
        //console.log(idProyecto)
        //console.log(correo)
        try {
            const {data} = await axios.put(`/api/project/colaborador/${idProyecto}`, {correo})
            const nuevosColaboradores = colaboradores.filter(colaborador => colaborador.correo !== correo)
            setcolaboradores(nuevosColaboradores)
            closeModalC()
        } catch (error) {
            console.log(error.response.data)
        }

    }

    const nuevaTarea = async(tarea) =>{
        //console.log('nueva Tarea')
        //console.log(socket)
        try {
            
            const {data} = await axios.post(`/api/task/nuevaTarea`, tarea)
            //settareas([...tareas, data.nuevaTarea])
            setalerta(data)
            socket.emit('Nueva Tarea', data)
            return data
            //setresetFormulario(true)
           
        } catch (error) {
            console.log(error)
            return {ok:false, msj:error.response.data}
        }
    }

    
    const obtenerTareas = async(idProyecto) =>{
        
        try {
           const {data} = await axios(`/api/task/tareas/${idProyecto}`) 
           settareas(data.tareas)
        } catch (error) {
            console.log(error)
        }
    }


    const editarTarea = async(idTarea, tarea)=>{
        //console.log('editando Tarea')
      
        try {
           const {data} = await axios.put(`/api/task/${idTarea}`, tarea)
           socket.emit('Editar Tarea', data.tareaActualizada )
          return data

        } catch (error) {
            return {ok:false, msj:error.response.data}
        }



    }

    const eliminarTarea = async(idTarea) =>{
        const tarea = tareas.filter(tarea => tarea._id === idTarea)
        
        try {
           const {data} = await axios.delete(`/api/task/${idTarea}`) 
           socket.emit('Eliminar Tarea', tarea[0])
            return data
        } catch (error) {
            console.log(error)
        }


    }


    
    function openModal() {
        setIsOpen(true);
      }

      function closeModal() {
        setIsOpen(false);
        setalerta({})
      }

      function openModalC(colaborador) {
        setIsOpenC(true);
        setcolaborador(colaborador)
      }

      function closeModalC() {
        setIsOpenC(false);
        setcolaborador({})
      }

      const handleBusqueda = () =>{
        setmodalBusqueda(!modalBusqueda)
      }

      //SOCKET IO

      const handleSubmitTarea = (tarea) =>{
        //console.log(tareas)
        //console.log(tarea)
        //console.log([...tareas, tarea])
        settareas([...tareas, tarea])
      }

      const handleDeleteTarea = (tarea) => {
        const nuevasTareas = tareas.filter(tareaState => tareaState._id !== tarea._id);
        //console.log('tarea eliminada')
        //console.log(nuevasTareas)
        settareas(nuevasTareas);
      }

      const handleEditTarea = (tarea) =>{
        const nuevasTareas = tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState )
        settareas(nuevasTareas)
      }

      const cerrarSesionProyecto = () =>{
        setIsLoading(true)
        setIsLoadingProyecto(true)
        setproyectos([])
        settareas()
        setcolaboradores([])
        setproyecto({})
        settareaEditar({})
        setalerta({})
      }

    return (
        <ProjectContext.Provider value={{
            Rol,
            IsLoading,
            IsLoadingProyecto,
            nuevoProyecto,
            obtenerProyecto,
            editarProyecto,
            //proyectoEditar,
            //setproyectoEditar,
            eliminarProyecto,
            alerta,
            setalerta,
            setresetFormulario,
            proyecto,
            setproyecto,
            
            proyectos,
            tareas,

            //COLABORADORES
            colaborador,
            colaboradores,
            buscarColaborador,
            nuevoColaborador,
            eliminarColaborador,

            //MODAL
            resetFormulario,
            modalIsOpen,
            openModal,
            closeModal,
            modalIsOpenC,
            openModalC,
            closeModalC,
            modalBusqueda,
            handleBusqueda,

            //TAREAS
            obtenerTareas,
            tareaEditar,
            settareaEditar,
            nuevaTarea,        
            editarTarea,
            eliminarTarea,

            //socket io
            handleSubmitTarea,
            handleDeleteTarea,
            handleEditTarea,

            cerrarSesionProyecto
        }}>
            {children}
        </ProjectContext.Provider>
    )
}


export {ProjectProvider}
export default ProjectContext 
