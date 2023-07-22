import Alerta from "@/components/alerta";
import LayoutAuth from "@/components/layoutAuth";
import useForm from "@/hooks/useForm";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import validator from 'validator';

const NuevoPassword = () => {
  const {values, handleInputChange, reset } = useForm({password :""})
  const [passwordModificado, setpasswordModificado] = useState(false)
  const [shown, setshown] = useState(false)
  const [alerta, setalerta] = useState({})

  const router = useRouter()
    const handleSubmit = async (e) =>{
      e.preventDefault();

      if (!validator.isStrongPassword(values.password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})) {
        return setalerta({ok:false, msj:'Contraseña Insegura'})
      }
      setalerta({})
      try {
        //console.log(router.query.token)
        const respuesta = await axios({
          method: 'post',
          url: `/api/auth/nuevoPassword/${router.query.token}`,
          data: {contraseña : values.password }
        })

        setpasswordModificado(true)
        setalerta(respuesta.data)
        return reset()
      } catch (error) {
   
        setpasswordModificado(false)
        setalerta(error.response.data)
        return reset()
      }

    }


  return (
    <>
      <LayoutAuth page="Reestableces Password" title="Reestablece Tu Password Y No Pierdas Acceso A Tus">
        {
          Object.entries(alerta).length !==0 && <Alerta alerta={alerta} />
        }
        <form onSubmit={handleSubmit}>
          <div className="mt-5 relative">
            <label
              htmlFor="password"
              className="text-md font-bold text-gray-600 text-xl"
            >
              Nuevo Password
            </label>
            <input
              type={`${shown?'text':'password'}`}
              id="password"
              name="password"
              value={values.password}
              onChange={handleInputChange}
              placeholder="Escribe tu Nuevo Password"
              className="border rounded-lg mt-1 shadow-inner py-2 mb-5 px-2 font-semibold w-full bg-gray-50 outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 cursor-pointer absolute top-11 right-5 text-gray-600 font-bold hover:text-gray-800"
              onMouseDown={() => setshown(!shown)}
              onMouseUp={() =>setshown(!shown)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>


          <div className="mt-5">
            <input
            type="submit"
            value="Cambiar Contraseña"
            className="bg-sky-800 w-full py-2 text-white font-bold text-lg rounded-md hover:bg-sky-900 
                        cursor-pointer mb-5 ring ring-sky-800 hover:ring-offset-2"
            />

        </div>
        {
          passwordModificado ===true &&
          <nav className="flex flex-col text-center">
              <Link href="/" className="text-sky-600 font-semibold">
                <span className="text-gray-600 font-bold">Iniciar sesión </span>
              </Link>
          </nav>
        }
        </form>
      </LayoutAuth>
    </>
  );
};

export default NuevoPassword;
