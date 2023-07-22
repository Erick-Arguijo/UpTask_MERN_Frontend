import FormularioProyecto from '@/components/formularioProyecto'
import LayoutPrivate from '@/components/layoutPrivate'
import SpinnerTailwind from '@/components/spinnerTailwind'
import useProject from '@/hooks/useProject'
import { useEffect, useState } from 'react'



const NuevoProyecto = () => {
  const [spinner, setspinner] = useState(true)
  const {setproyecto} = useProject()

  useEffect(() => {
    setproyecto({})
    setTimeout(() => {
      setspinner(false)
    }, 500);
  }, [])
  

  return (
      <LayoutPrivate page={'Nuevo Proyecto'}>
        {spinner ? 
            <SpinnerTailwind />
        :
          <>
            <h1 className='mt-5 font-bold text-2xl'>Nuevo Proyecto</h1>
            <div className="bg-white mt-8 shadow-xl rounded-lg py-10 px-10 w-full">
              <FormularioProyecto />
            </div>
          </>
        }
    </LayoutPrivate>
  )
}

export default NuevoProyecto