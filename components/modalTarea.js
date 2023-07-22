
import { validarFormTarea } from "@/helpers/validarFormTarea";
import useForm from "@/hooks/useForm";
import useProject from "@/hooks/useProject";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Alerta from "./alerta";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
   
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#__next");

const ModalTarea = () => {
  const { modalIsOpen, closeModal, nuevaTarea,editarTarea, tareaEditar,settareaEditar, alerta, setalerta} = useProject();
  const router = useRouter()
  const [alertaModal, setalertaModal] = useState({})
  const {values, handleInputChange, reset} = useForm({nombre:"",descripcion:"", fechaEntrega:"", prioridad:""})
 

  useEffect(() => {
    if (Object.entries(tareaEditar).length !== 0) {
      reset({nombre:tareaEditar.nombre, descripcion:tareaEditar.descripcion, 
        fechaEntrega:tareaEditar.fechaEntrega.split("T")[0], prioridad:tareaEditar.prioridad})
    }
  }, [tareaEditar])  


  const handleSubmit = async (e) =>{
    e.preventDefault();
    const tarea = {...values,  proyecto: router.query.id} 
    const validacion = validarFormTarea(values)
    
    if (Object.entries(validacion).length !==0) {
       return setalertaModal(validacion)
    }
      
    if(Object.entries(tareaEditar).length ===0 ){
        //Nueva Tarea

        const data = await nuevaTarea(tarea)

        if (data?.ok) {
          closeModal()
          reset({nombre:"",descripcion:"", fechaEntrega:"", prioridad:""})
          setTimeout(() => {
           setalertaModal({}) 
          }, 2500);
        }else{
          setalertaModal(data)
        }



    }else{
      //EDITAR TAREA
        const data = await editarTarea(tareaEditar._id, tarea)
   
        if (data.ok) {
           reset({nombre:"",descripcion:"", fechaEntrega:"", prioridad:""})
           closeModal()
           settareaEditar({})
           setTimeout(() => {
            setalerta({})
           }, 3000);  
          }
    }

    setalertaModal({})
    
  }



  const multiplesLlamados = () =>{
    reset({nombre:"",descripcion:"", fechaEntrega:"", prioridad:""})
    closeModal()
    setalertaModal({})
    settareaEditar({})
  }
  

  return (
    <div className="">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={multiplesLlamados}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {Object.entries(alertaModal)?.length !== 0 && <Alerta alerta={alertaModal} />}
        <div className="flex justify-between mt-5">
          <h2 className="font-bold">
          {`${Object.entries(tareaEditar).length ===0 ?'Crear Tarea':'Editar Tarea'}`}
          </h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            onClick={()=> multiplesLlamados() }
            className="w-7 h-7 cursor-pointer text-gray-600"

          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

        </div>
        
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="mt-5">
            <label
                htmlFor="nombre"
                className={`${alertaModal?.campo === 'nombre' ?'text-red-400' :''} text-md font-bold text-gray-600
                    text-xl`}
              >
                Nombre Tarea
              </label>
              <input
                type='text'
                id="nombre"
                name="nombre"
                placeholder="Nombre Tarea"
                value={values.nombre}
                onChange={handleInputChange}
                className={` ${alertaModal?.campo === 'nombre' ?'border-red-400 border-2' :''} border rounded-lg 
                    shadow-inner mt-1 mb-5 py-2 px-2 font-semibold w-full bg-gray-50 outline-none`}
              />
          </div>

          <div className="">
            <label
                htmlFor="descripcion"
                className={`${alertaModal?.campo === 'descripcion' ?'text-red-400' :''} text-md font-bold text-gray-600
                    text-xl`}
              >
                Descripcion
              </label>
              <textarea
                type='text'
                id="descripcion"
                name="descripcion"
                placeholder="Descripcion"
                value={values.descripcion}
                onChange={handleInputChange}
                className={` ${alertaModal?.campo === 'descripcion' ?'border-red-400 border-2' :''} border rounded-lg 
                    shadow-inner mt-1 mb-5 py-2 px-2 font-semibold w-full bg-gray-50 outline-none`}
              />
          </div>


          <div className="">
            <label
                htmlFor="fechaEntrega"
                className={`${alertaModal?.campo === 'fechaEntrega' ?'text-red-400' :''} text-md font-bold text-gray-600
                    text-xl`}
              >
                Fecha Entrega
              </label>
              <input
                type='date'
                id="fechaEntrega"
                name="fechaEntrega"
                placeholder="Fecha de Entrega"
                value={values.fechaEntrega}
                onChange={handleInputChange}
                className={` ${alertaModal?.campo === 'fechaEntrega' ?'border-red-400 border-2' :''} border rounded-lg 
                    shadow-inner mt-1 mb-5 py-2 px-2 font-semibold w-full bg-gray-50 outline-none`}
              />
          </div>

          <div className="">
            <label
                htmlFor="prioridad"
                className={`${alertaModal?.campo === 'prioridad' ?'text-red-400' :''} text-md font-bold text-gray-600
                    text-xl`}
              >
                Prioridad
              </label>
              <select
                name="prioridad"
                value={values.prioridad}
                onChange={handleInputChange}
                className={` ${alertaModal?.campo === 'prioridad' ?'border-red-400 border-2' :''} border rounded-lg 
                shadow-inner mt-1 mb-5 py-2 px-2 font-semibold w-full bg-gray-50 outline-none`}
              >
                <option value="" defaultValue="">--- Seleccione ---</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
              </select>
          </div>

          <input
          type="submit"
          value={`${Object.entries(tareaEditar).length ===0 ?'Crear Tarea':'Editar Tarea'}`}
          className="bg-sky-800 w-full py-2 text-white font-bold text-lg rounded-md hover:bg-sky-900 
                    cursor-pointer mt-2 mb-5 ring ring-sky-800 hover:ring-offset-2 duration-300"
        />
          
        </form>
      </Modal>
    </div>
  );
};

export default ModalTarea;
