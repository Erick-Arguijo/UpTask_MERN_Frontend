import useProject from '@/hooks/useProject'
import React from 'react'

const Colaboradores = ({colaboradores}) => {
    const { openModalC} = useProject()

  return (
    <div>
        {colaboradores.map(colaborador => 
            <div key={colaborador._id} className="flex max-md:flex-col justify-between">
                <div>
                    <p className="font-bold">{colaborador.nombre}</p>
                    <p className="font-semibold text-gray-600">{colaborador.correo}</p>
                </div>
                <button className="bg-red-600 h-max py-1 px-6 text-white font-bold text-lg rounded-md hover:bg-red-600 
                    cursor-pointer mt-2 mb-5 ring ring-red-600 hover:ring-offset-2 duration-300"
                    onClick={()=> openModalC(colaborador)}
                >
                    Eliminar
                </button>
            </div>
        )}
    </div>
  )
}

export default Colaboradores