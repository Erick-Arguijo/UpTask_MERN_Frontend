import useAuth from '@/hooks/useAuth'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const LayoutAuth = ({children, page, title}) => {
    const {isLoading, usuario} = useAuth()
    const router = useRouter()
    //console.log('layoutAuth')
    //console.log(isLoading)
    //isLoading ? 'cargando...' : usuario.autenticado && router.push('/proyecto')

    useEffect(() => {
        if (usuario.autenticado && !isLoading) {
            //console.log('Existe un usuario')
            //console.log('volver a home ')
            router.push('/proyecto')
        }
      //console.log(usuario)
      //console.log(isLoading)
    }, [usuario])
    
    return (
    <>
        <Head>
            <title>{`UpTask - ${page}`}</title>
            <meta name="description" content="Autenticacion"/>
        </Head>

        {
            !isLoading && !usuario.autenticado && 
            <div className="bg-slate-200 min-h-screen max-md:justify-center flex md:pt-20 pb-20 md:items-center flex-col">
                    <h1 className="md:text-6xl text-sky-600 font-extrabold md:text-center py-4 
                    md:w-5/12  max-md:text-4xl max-md:text-center max-md:mt-10">
                        {title} 
                        <label className='text-black ml-2'>Proyectos</label>
                    </h1>
                <div className="bg-white mt-2 shadow-xl rounded-lg py-10 px-10 w-2/5 max-md:w-4/5
                max-md:mx-auto max-sm:mt-10">
                    {children}
                </div>
            </div>
        }

    </>
  )
}

export default LayoutAuth