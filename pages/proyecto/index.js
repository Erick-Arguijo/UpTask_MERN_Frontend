import LayoutPrivate from "@/components/layoutPrivate";
import SpinnerTailwind from "@/components/spinnerTailwind";
import useProject from "@/hooks/useProject";
import Link from "next/link";
import { useEffect, useState } from "react";

const Index = () => {
  const { IsLoading, proyectos } = useProject();
  const [spinnet, setspinnet] = useState(true);


  useEffect(() => {
    if (!IsLoading) {
      //console.log(IsLoading)
      //console.log(proyectos)
      setspinnet(false)
    }

  }, [proyectos]);

  //console.log(process.env.API_URL)
  //console.log(process.env.NEXT_PUBLIC_API_URL)
  //console.log(proyectos);
  return (
    <LayoutPrivate page={'Proyectos'}>
      {spinnet ? (
        <SpinnerTailwind/>
      ) : (
        <>
          <h1 className="mt-5 font-bold text-2xl">Proyectos</h1>
          <div className="bg-white mt-8 mb-8 shadow-xl rounded-lg py-4 w-full">
            {proyectos.length === 0 ? (
              <p className="font-bold text-lg text-center">
                No hay proyectos aun
              </p>
            ) : (
              <div className="">
                {proyectos?.map((proyecto) => (
                  <div
                    key={proyecto._id}
                    className="flex max-md:flex-col justify-between px-8 mt-4 mb-4 pb-4 border-b-2 md:items-center"
                  >
                    <div className="flex">
                      <div className="flex max-md:flex-col max-md:w-full gap-4 ">
                        <p className="font-semibold">{proyecto.nombre}</p>
                        <p className="flex items-center text-sm text-gray-500  uppercase font-semibold ">
                          {proyecto.cliente}
                        </p>
                        {proyecto.rol ==="Colaborador" && 
                          <p className="bg-green-500 max-md:w-full py-1 px-3 rounded-md font-semibold 
                          text-white uppercase max-md:text-center">
                            Colaborador
                          </p>
                        }
                      </div>
                    </div>
                    <Link
                      href={`/proyecto/${proyecto._id}`}
                      className="font-bold text-gray-600 hover:text-gray-800 uppercase text-sm max-md:text-lg max-md:mt-4 max-md:text-center"
                    >
                      Ver Proyecto
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </LayoutPrivate>
  );
};

export default Index;
