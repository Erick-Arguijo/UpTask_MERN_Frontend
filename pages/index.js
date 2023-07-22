import Alerta from "@/components/alerta";
import LayoutAuth from "@/components/layoutAuth";
import useForm from "@/hooks/useForm";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useAuth from "@/hooks/useAuth";



const Login = () => {
  const router = useRouter()
  const {usuario, login, alerta} = useAuth()

  const [shown, setshown] = useState(false)
  const { values, handleInputChange, reset } = useForm({email: "",password: ""});


  const handleSubmit = async (e) => {
    e.preventDefault();
      await login({correo:values.email, contraseña:values.password})  
  
  };


  return (
    <>
      <LayoutAuth page={"Login"} title={"Inicia Sesión Y Administra Tus "}>
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

          <div className="mt-5 relative">
            <label
              htmlFor="password"
              className="text-md font-bold text-gray-600 text-xl"
            >
              Password
            </label>
            <input
              type={`${shown ? 'text':'password'}`}
              id="password"
              name="password"
              placeholder="password"
              value={values.password}
              onChange={handleInputChange}
              className="border rounded-lg mt-1 shadow-inner mb-5 py-2 px-2 font-semibold w-full bg-gray-50 outline-none"
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

          <div>
            <input
              type="submit"
              value="Iniciar Sesión"
              className="bg-sky-800 w-full py-2 text-white font-bold text-lg rounded-md hover:bg-sky-900 
                          cursor-pointer mb-5 ring ring-sky-800 hover:ring-offset-2 duration-300"
            />
          </div>
        </form>
        <div className="flex flex-col">
          <Link href="/account" className="text-sky-600 font-bold">
            ¿No tienes una cuenta?{" "}
            <span className=" font-bold text-gray-600">Registrate</span>
          </Link>
          <Link href="/olvidePassword" className="font-bold mt-2 text-gray-600">
            Olvide Password
          </Link>
        </div>
      </LayoutAuth>
    </>
  );
};

export default Login;
