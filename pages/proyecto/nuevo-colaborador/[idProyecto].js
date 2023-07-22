import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Alerta from "@/components/alerta";
import LayoutPrivate from "@/components/layoutPrivate";
//import ModalColaborador from '../../../components/modalColaborador'
import useForm from "@/hooks/useForm";
import useProject from "@/hooks/useProject";
import ModalColaborador from "@/components/modalColaborador";
import SpinnerTailwind from "@/components/spinnerTailwind";

const Colaborador = () => {
  const router = useRouter();
  const [loading, setloading] = useState(true);
  const {
    alerta,
    proyecto,
    obtenerProyecto,
    buscarColaborador,
    colaborador,
    nuevoColaborador,
  } = useProject();
  const { values, handleInputChange, reset } = useForm({ correo: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    buscarColaborador(values);
  };

  useEffect(() => {
    if (router.isReady) {
      obtenerProyecto(router.query.idProyecto);
      setTimeout(() => {
        setloading(false);
      }, 500);
    }
  }, [router.isReady]);

  const handleAregarColaborador = async (idProyecto, correo) => {
    await nuevoColaborador(idProyecto, correo);

    setTimeout(() => {
      reset({ correo: "" });
    }, 2500);
  };

  //if (loading) return "...cargando";

  return (
    <>
      <LayoutPrivate page={'Nuevo Colaborador'}>
        {loading ? (
          <SpinnerTailwind />
        ) : (
          <>
            <h2 className="text-2xl font-bold mt-5">
              Añadir Colaborador (a) al Proyecto: {proyecto.nombre}
            </h2>
            <div className="bg-white mt-8 shadow-xl rounded-lg py-10 px-10 w-full">
              {Object.entries(alerta).length !== 0 && (
                <Alerta alerta={alerta} />
              )}
              <form onSubmit={handleSubmit}>
                <div className="mt-5">
                  <label
                    htmlFor="correo"
                    className={`${
                      alerta?.campo === "correo" ? "text-red-400" : ""
                    } text-md font-bold text-gray-600 text-xl`}
                  >
                    Email Colaborador
                  </label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    placeholder="Email"
                    value={values.correo}
                    onChange={handleInputChange}
                    className={`border rounded-lg mt-1 shadow-inner py-2 px-2 font-semibold w-full
                  ${
                    alerta?.campo === "correo" ? "border-red-400 border-2" : ""
                  }  bg-gray-50 outline-none`}
                  />
                </div>

                <input
                  type="submit"
                  value="Buscar Colaborador"
                  className="bg-sky-800 mt-8 w-full py-2 text-white font-bold text-lg rounded-md hover:bg-sky-900 
                    cursor-pointer mb-5 ring ring-sky-800 hover:ring-offset-2 duration-300"
                />
              </form>
            </div>
            {colaborador.nombre && (
              <div className="bg-white mt-8 shadow-xl rounded-lg py-10 px-10 w-full">
                <h3 className="text-center font-bold text-xl">Resultados:</h3>
                <div className="flex max-md:flex-col justify-between mt-5">
                  <h2 className="font-bold text-lg max-md:text-center">
                    {colaborador.nombre}
                  </h2>
                  <button
                    className="bg-gray-600 w-2/5 py-1 text-white font-bold text-lg rounded-md hover:bg-gray-700 
                    cursor-pointer ring ring-gray-600 hover:ring-offset-2 duration-300 max-md:w-full max-md:mt-5"
                    onClick={() =>
                      handleAregarColaborador(
                        router.query.idProyecto,
                        colaborador.correo
                      )
                    }
                  >
                    Agregar al Proyecto
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </LayoutPrivate>
    </>
  );
};

export default Colaborador;
