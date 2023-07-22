import { formatFecha } from "@/helpers/formatFecha";
import useAdmin from "@/hooks/useAdmin";
import useProject from "@/hooks/useProject";

const Tarea = ({tareas}) => {

    const { openModal, closeModal,editarTarea, settareaEditar,eliminarTarea} = useProject()
    const admin = useAdmin() 


    const handleDeleteTarea = (idTarea) =>{
        swal({
          title: "Estás seguro?",
          text: "Una vez eliminado, ¡no podrá recuperar esta Tarea!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then(async (willDelete) => {
          if (willDelete) {
            const data = await eliminarTarea(idTarea)
            //console.log(data)
            if (data.ok) {
              swal("¡Tu Tarea ha sido eliminada!", {
                icon: "success",
              });
              closeModal
            }
          } else {
            swal("¡Tu Tarea está a salvo!!");
          }
        });
      }

      const handleComplitTask = (idTask, task) =>{
        editarTarea(idTask, task)
      }


      
      const eventoTarea = (tarea) => {
        settareaEditar(tarea);
        setTimeout(() => {
          openModal();
        }, 300);
      };

  return (
    <div>
      {tareas.map((tarea) => (
        <div className="flex max-lg:flex-col  justify-between mt-5 mb-5 border-b p-5" key={tarea._id}>
          <div className="">
            <h4 className=" mb-1text-xl font-semibold">{tarea.nombre}</h4>
            <p className=" mb-1text-sm text-gray-600 uppercase">{tarea.descripcion}</p>
            <p className=" mb-1text-xl font-semibold">{formatFecha(tarea.fechaEntrega)}</p>
            <p className="mb-1 text-gray-600">Prioridad: {tarea.prioridad}</p>
            { tarea.usuario?.nombre &&
               <p className="bg-green-500 py-1 text-white px-3 rounded-md font-semibold md:w-max max-md:text-center">
                Completada por:{" "}{tarea.usuario.nombre}
             </p>
            }
          </div>
          <div className="flex max-md:flex-col max-lg:justify-between max-md:mt-5 gap-4 items-center">
              {admin && 
                <button
                  className="bg-indigo-600 h-max py-1 px-6 text-white font-bold text-lg rounded-md hover:bg-indigo-700 
                        cursor-pointer mt-2 md:mb-5 max-md:w-full ring ring-indigo-600 hover:ring-offset-2 duration-300"
                  onClick={() => eventoTarea(tarea)}
                >
                  Editar
                </button>
              }
            
            
            { tarea.estado ?
                <button
                className="bg-sky-600  h-max py-1 px-6 text-white font-bold text-lg rounded-md hover:bg-sky-700 
                        cursor-pointer mt-2 md:mb-5 max-md:w-full  ring ring-sky-600 hover:ring-offset-2 duration-300"
                onClick={()=> handleComplitTask(tarea._id,{estado:false})}
                >
                Completa
                </button>
            
            :
                <button
                  className="bg-gray-600  h-max py-1 px-6 text-white font-bold text-lg rounded-md hover:bg-gray-700 
                        cursor-pointer mt-2 md:mb-5 ring max-md:w-full  ring-gray-600 hover:ring-offset-2 duration-300"
                  onClick={()=> handleComplitTask(tarea._id,{estado:true})}
                >
                Incompleta
                </button>

            }
            
            {admin &&  
                <button
                  className="bg-red-600 h-max py-1 px-6 text-white font-bold text-lg rounded-md hover:bg-red-600 
                        cursor-pointer mt-2 md:mb-5 max-md:w-full  ring ring-red-600 hover:ring-offset-2 duration-300"
                  onClick={() => handleDeleteTarea(tarea._id)}
                >
                  Eliminar
                </button>
            }
              
            
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tarea;
