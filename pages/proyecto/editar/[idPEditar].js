import FormularioProyecto from '@/components/formularioProyecto'
import LayoutPrivate from '@/components/layoutPrivate'
import SpinnerTailwind from '@/components/spinnerTailwind'
import useProject from '@/hooks/useProject'
import { useRouter } from 'next/router'
import { withRouter } from 'next/router'
import { useEffect, useState } from 'react'


const EditarProyecto = () => {
  const router = useRouter()
  const {obtenerProyecto, proyecto} = useProject()
  const [spinner, setspinner] = useState(true) 



  useEffect(() => {
   if (router.isReady) {
     obtenerProyecto(router.query.idPEditar)  
   }
  },[router.isReady])

  useEffect(() => {
    setTimeout(() => {
      //setresetFormulario(false)
      setspinner(false);
      }, 1000);
  }, [proyecto]);
      
      
    return (
    <LayoutPrivate page={'Editar Proyecto'}>
      {
        spinner ?(
          <SpinnerTailwind />
        )
        :
        <>
          <h1 className='mt-5 font-bold text-2xl'>Editar Proyecto: {proyecto.nombre} </h1>
          <div className="bg-white mt-8 shadow-xl rounded-lg py-10 px-10 w-full">
            <FormularioProyecto />
          </div>
        </>
      }
         
          
            
    </LayoutPrivate>
  )
}

export default EditarProyecto