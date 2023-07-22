import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import LayoutPrivate from "@/components/layoutPrivate";
import SpinnerTailwind from "@/components/spinnerTailwind";
import useProject from "@/hooks/useProject";
import useAdmin from "@/hooks/useAdmin";
import Tarea from "@/components/tarea";
import Colaboradores from "@/components/colaboradores";
import Alerta from "@/components/alerta";
import swal from "sweetalert";
import { io } from "socket.io-client";

let socket 
const Proyecto = () => {
  const router = useRouter();
  const admin = useAdmin();
  const [spinner, setspinner] = useState(true);
  const {proyecto, tareas, colaboradores,obtenerProyecto,openModal,eliminarProyecto,alerta,
    IsLoadingProyecto, handleSubmitTarea, handleDeleteTarea, handleEditTarea} = useProject();

  useEffect(() => {
    if (router.isReady) {
      obtenerProyecto(router.query.id);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (!IsLoadingProyecto) {
      setspinner(false);
    }
  }, [proyecto]);

  useEffect(()=>{
    //Comprobar si hay una conexion previa
    if (socket) {
      //console.log('Socket desconectado')
      socket.disconnect(true);
    }
  },[])


  useEffect(() => {
    //console.log(socket)
    socket = io(process.env.NEXT_PUBLIC_API_URL);
    if (router.query.id) {
      //console.log('socket conectado')
      socket.emit('abrir proyecto', router.query.id )
    }

  }, [router.isReady])


  useEffect(() => {  
    socket.on('tareaAgregada', tarea =>{

      //console.log(`sala compatible= ${tarea.proyecto === proyecto._id}`)
        if (tarea.proyecto === router.query.id) {
          //console.log('Suscrito al socket')
          handleSubmitTarea(tarea)  
        }
    })

    socket.on('tarea eliminada', (tarea) =>{
      if (tarea.proyecto === router.query.id) {
        handleDeleteTarea(tarea)
      }
    })

    socket.on('tarea actualizada',  tarea =>{
      if (tarea.proyecto === router.query.id) {
        handleEditTarea(tarea)
      }
    })
})
  
  

  const handleDelete = () => {
    swal({
      title: "Estás seguro?",
      text: "Una vez eliminado, ¡no podrá recuperar este proyecto!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        const data = await eliminarProyecto(proyecto._id);

        //console.log(data)
        if (data.ok) {
          swal("¡Tu proyecto ha sido eliminado!", {
            icon: "success",
          });
          router.push("/proyecto");
        }
      } else {
        swal("¡Tu proyecto está a salvo!!");
      }
    });
  };

  //console.log(proyecto)
  //console.log(tareas)

  return (
    <LayoutPrivate page={`${proyecto.nombre}`}>
      {spinner ? (
        <SpinnerTailwind />
      ) : (
        <>
          {Object.entries(proyecto).length === 0 ? (
            <>
              <div className="bg-white mt-8 shadow-xl rounded-lg py-10 px-10 w-full">
                {alerta?.msj && <Alerta alerta={alerta} />}
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <h1 className="mt-5 font-bold text-2xl">{proyecto.nombre}</h1>
                {admin && (
                  <div className="flex gap-4 text-gray-600">
                    <Link
                      className="flex font-bold mt-5 text-lg hover:text-sky-600"
                      href={`/proyecto/editar/${proyecto._id}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                      Editar
                    </Link>
                    <button
                      className="flex font-bold mt-5 text-lg hover:text-red-500"
                      onClick={handleDelete}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
              {admin && (
                <button
                  className="flex bg-sky-400 hover:bg-sky-600 py-2 px-8 rounded-md text-white font-bold mt-5"
                  onClick={openModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2">
                   Nueva Tarea

                  </span>
                </button>
              )}
              <p className="font-bold mt-5 text-lg">Tareas del Proyecto</p>
              <div className="bg-white mt-8 shadow-xl rounded-lg py-4 px-10 w-full">
                {tareas.length === 0 ? (
                  <p className="font-semibold text-center">
                    El proyecto aún no tiene tareas asignadas
                  </p>
                ) : (
                  <>
                    {Object.entries(alerta).length !== 0 && (
                      <Alerta alerta={alerta} />
                    )}
                    <Tarea tareas={tareas}/>
                  </>
                )}
              </div>

              {admin && (
                <>
                  <div className="flex justify-between">
                    <p className="font-bold mt-5 text-lg">Colaboradores</p>
                    <Link
                      href={`/proyecto/nuevo-colaborador/${proyecto._id}`}
                      className="font-bold mt-5 text-lg hover:text-sky-600"
                    >
                      Añadir
                    </Link>
                  </div>
                  <div className="bg-white mt-8 shadow-xl rounded-lg py-10 px-10 w-full mb-8">
                    {colaboradores.length === 0 ? (
                      <p className="font-semibold text-center">
                        El proyecto aún no tiene colaboradores
                      </p>
                    ) : (
                      <Colaboradores colaboradores={colaboradores} />
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
    </LayoutPrivate>
  );
};

export default Proyecto;
