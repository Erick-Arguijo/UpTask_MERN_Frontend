import Alerta from '@/components/alerta'

import useForm from '@/hooks/useForm'
import useProject from '@/hooks/useProject'



import { useEffect} from 'react'

const FormularioProyecto = () => {

  const {  proyecto, nuevoProyecto,editarProyecto, alerta, resetFormulario} = useProject();
  const { values, handleInputChange, reset } = useForm({nombre: "",descripcion: "",cliente: "",entrega: ""});


  const handleSubmit = async (e) => {
    const proyectoActualizado = {...values, fechaEntrega: values.entrega}
    e.preventDefault();
    if (Object.entries(proyecto).length === 0) {
      nuevoProyecto(proyectoActualizado);
    }else{
      await editarProyecto(proyecto._id, proyectoActualizado)
    }
  };

  useEffect(() => {
    if (proyecto.nombre) {
     reset({nombre:proyecto.nombre,descripcion: proyecto.descripcion,cliente:proyecto.cliente,entrega: proyecto.fechaEntrega.split('T')[0]}) 
    }
  }, [])

 useEffect(() => {
    //console.log(resetFormulario)
        if (resetFormulario) {
      reset({nombre: "",descripcion: "",cliente: "",entrega: ""})
    } 

 }, [resetFormulario])
 
  

  return (
    <>
      {Object.entries(alerta)?.length !== 0 && <Alerta alerta={alerta} />}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mt-5">
          <label
            htmlFor="nombre"
            className={`${
              alerta?.campo === "nombre" ? "text-red-400" : ""
            } text-md font-bold text-gray-600 text-xl`}
          >
            Nombre Producto
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            value={values.nombre}
            onChange={handleInputChange}
            className={`border rounded-lg mt-1 shadow-inner py-2 px-2 font-semibold w-full
                  ${
                    alerta?.campo === "nombre" ? "border-red-400 border-2" : ""
                  }  bg-gray-50 outline-none`}
          />
        </div>

        <div className="mt-5">
          <label
            htmlFor="descripcion"
            className={`${
              alerta?.campo === "descripcion" ? "text-red-400" : ""
            } text-md font-bold text-gray-600 text-xl`}
          >
            Descripción
          </label>
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            placeholder="Descripción del Proyecto"
            value={values.descripcion}
            onChange={handleInputChange}
            className={`border rounded-lg mt-1 shadow-inner py-2 px-2 font-semibold w-full
                ${
                  alerta?.campo === "descripcion"
                    ? "border-red-400 border-2"
                    : ""
                }  bg-gray-50 outline-none`}
          />
        </div>

        <div className="mt-5">
          <label
            htmlFor="entrega"
            className={`${
              alerta?.campo === "entrega" ? "text-red-400" : ""
            } text-md font-bold text-gray-600 text-xl`}
          >
            Fecha de Entrega
          </label>
          <input
            type="date"
            id="entrega"
            name="entrega"
            placeholder="Descripcion del Proyecto"
            value={values.entrega}
            onChange={handleInputChange}
            className={`border rounded-lg mt-1 shadow-inner py-2 px-2 font-semibold w-full
                ${
                  alerta?.campo === "entrega" ? "border-red-400 border-2" : ""
                }  bg-gray-50 outline-none`}
          />
        </div>

        <div className="mt-5">
          <label
            htmlFor="cliente"
            className={`${
              alerta?.campo === "cliente" ? "text-red-400" : ""
            } text-md font-bold text-gray-600 text-xl`}
          >
            Cliente
          </label>
          <input
            type="text"
            id="cliente"
            name="cliente"
            placeholder="Nombre del Cliente"
            value={values.cliente}
            onChange={handleInputChange}
            className={`border rounded-lg mt-1 shadow-inner py-2 px-2 font-semibold w-full
                ${
                  alerta?.campo === "cliente" ? "border-red-400 border-2" : ""
                }  bg-gray-50 outline-none`}
          />
        </div>

        <input
          type="submit"
          value={`${Object.entries(proyecto).length ===0 ?'Crear Proyecto': 'Editar Proyecto'}`}
          className="bg-sky-800 mt-8 w-full py-2 text-white font-bold text-lg rounded-md hover:bg-sky-900 
                    cursor-pointer mb-5 ring ring-sky-800 hover:ring-offset-2 duration-300"
        />
      </form>
    </>
  );
};

export default FormularioProyecto;
