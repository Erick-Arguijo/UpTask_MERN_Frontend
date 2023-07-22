import Alerta from "@/components/alerta";
import LayoutAuth from "@/components/layoutAuth";
import useForm from "@/hooks/useForm";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import validator from 'validator';

const OlvidePassword = () => {
  const {values, handleInputChange, reset} = useForm({email:""})
  const [alerta, setalerta] = useState({})

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if (!validator.isEmail(values.email)) {
      return setalerta({ok:false, msj:'email no Valido'})
    }
    setalerta({})
    try {
      const respuesta = await axios({
        method:"POST",
        url:'/api/auth/solicitudCambioPassword',
        data:{correo:values.email}
      })
      setalerta(respuesta.data)
    } catch (error) {
      setalerta(error.response.data)
    }
  }

  return (
    <LayoutAuth page='Recuperar Password' title='Recupera tu acceso y no pierdas tu'>
      {
        Object.entries(alerta).length !== 0 && <Alerta alerta={alerta} />
      }
      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <label
            htmlFor="email"
            className="text-md font-bold text-gray-600 text-xl"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleInputChange}
            className="border rounded-lg mt-1 shadow-inner py-2 px-2 font-semibold w-full bg-gray-50 outline-none"
          />
        </div>
        <div className="mt-5">
            <input
            type="submit"
            value="Enviar Instrucciones"
            className="bg-sky-800 w-full py-2 text-white font-bold text-lg rounded-md hover:bg-sky-900 
                        cursor-pointer mb-5 ring ring-sky-800 hover:ring-offset-2 duration-300"
            />

        </div>
      </form>
      <nav className="flex flex-col">
          <Link href="/" className="text-sky-600 font-semibold">
            ¿Ya tienes una cuenta?  {' '}
            <span className="text-gray-600 font-bold">Iniciar sesión </span>
          </Link>
          <Link href="/account" className="text-sky-600 font-semibold">
            ¿No tienes una cuenta? {' '}
            <span className="text-gray-600 font-bold">Registrate</span>
          </Link>
        </nav>
    </LayoutAuth>
  );
};

export default OlvidePassword;
