import useAuth from "@/hooks/useAuth";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Sidebar from "./sidebar";
import Link from "next/link";
import ModalTarea from "./modalTarea";
import ModalColaborador from "./modalColaborador";
import SpinnerTailwind from "./spinnerTailwind";
import Head from "next/head";

const LayoutPrivate = ({ children, page }) => {
  const router = useRouter();
  const { isLoading, usuario } = useAuth();

  useEffect(() => {
    //console.log('layoutPrivate')
    //console.log(usuario)
    //console.log(isLoading)
    if (!usuario.autenticado && !isLoading) {
      //console.log('No exite un usuario')
      router.push('/')
    }
  }, [usuario])
  

  return (
    <>
        <Head>
            <title>{`UpTask - ${page}`}</title>
            <meta name="description" content="Autenticacion"/>
        </Head>
      {
        isLoading ? <SpinnerTailwind /> :
        <>
            {usuario.autenticado && (
        <div>
          <Sidebar />
          <main className="md:flex bg-gray-100 min-h-screen px-4">
            <div className="flex flex-col font-bold mt-5 md:w-1/4">
              <h1 className="max-md:mt-5 max-md:text-center font-bold text">
                Hola: {usuario.usuario.nombre}
              </h1>
              <Link
                href="/proyecto/nuevoProyecto"
                className="bg-blue-400 hover:bg-blue-500 px-4 py-2 
                                text-white font-bold  rounded-md mt-5 w-full text-center"
              >
                Nuevo Proyecto
              </Link>
            </div>
            <div className="w-full md:px-14 mb-5">{children}</div>
          </main>
        </div>
      )}
        </>
      }
      <ModalTarea />
      <ModalColaborador />
    </>
  );
};

export default LayoutPrivate;
