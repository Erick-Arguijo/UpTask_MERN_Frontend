import Link from 'next/link'
import React from 'react'
import Busqueda from './busqueda'
import useAuth from '@/hooks/useAuth'
import useProject from '@/hooks/useProject'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/router'

const Sidebar = () => {
  const router = useRouter()
  const { handleBusqueda } = useProject()
  const { cerrarSesionAuth } = useAuth() 
  const {cerrarSesionProyecto} = useProject()

  const handleCerrarSesion = () =>{
    cerrarSesionAuth()
    cerrarSesionProyecto()
    localStorage.removeItem('token') 
    deleteCookie('token')
    router.push('/')    
  }


  return (
    <div className="flex max-md:flex-col py-3 px-4 justify-between">
        <Link href="/proyecto" className='text-4xl font-bold text-blue-500 md:ml-4 py-2 max-md:text-center'>
          UpTask
        </Link>

        <nav className="flex max-md:flex-col md:gap-4 md:mr-4 py-2">
          <button className=' py-2 text-black font-bold max-md:text-center'
            onClick={handleBusqueda}
          >
            Buscar Proyecto
          </button>
            <Link className=' py-2 text-black font-bold max-md:text-center' href="/proyecto">
              Proyectos
            </Link>
            <button className="bg-blue-400 hover:bg-blue-500 px-4 py-2 text-white font-bold  rounded-md" 
            onClick={handleCerrarSesion}>
              Cerrar Sesión
            </button>
        </nav>

        <Busqueda />
    </div>
  )
}

export default Sidebar