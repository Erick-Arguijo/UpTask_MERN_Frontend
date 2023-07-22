import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Alerta from "@/components/alerta";
import LayoutAuth from "@/components/layoutAuth";
import { validarFormulario } from "@/helpers/validarFormulario";
import useForm from "@/hooks/useForm";
import axios from 'axios'

const Account = () => {
    const router = useRouter()
    const {values, handleInputChange, reset} = useForm({nombre:"", email:"", password:"", repetirPassword:""})
    const [alerta, setalerta] = useState({})
    const [shown, setshown] = useState(false)
    const [shown2, setshown2] = useState(false)
  


    const handleSubmit = async (e) =>{

        e.preventDefault();
        if (!validarFormulario(values).ok) {
          setalerta(validarFormulario(values))
        }

        if (validarFormulario(values).ok) {
          const nuevoUsuario = { 
            nombre: values.nombre,
            correo: values.email,
            contraseña: values.password
          }


            try {
              const {data} = await axios({
                method:'post',
                url:'/api/auth/nuevoUsuario',
                data: nuevoUsuario
              })
              setalerta(data)
              reset({nombre:"", email:"", password:"", repetirPassword:""})
              
            } catch (error) {
              setalerta(error.response.data)
            }

        }
    }


  return (
    <LayoutAuth page={"Registro"} title={"Crea Una Cuenta Y Administra Tus"}>
        { Object.entries(alerta).length !== 0 ?
            <Alerta alerta={alerta}/> 
            :
            ""
        }
        
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mt-5">
          <label
            htmlFor="nombre"
            className={`${alerta?.campo === 'nombre' ?'text-red-400' :''} text-md font-bold text-gray-600 text-xl`}
          >
            Tu Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Nombre"
            value={values.nombre}
            onChange={handleInputChange}
            className={`border rounded-lg mt-1 shadow-inner py-2 px-2 font-semibold w-full
            ${alerta?.campo === 'nombre' ?'border-red-400 border-2' :''}  bg-gray-50 outline-none`}
          />
        </div>

        <div className="mt-5">
          <label
            htmlFor="email"
            className={`${alerta?.campo === 'email' ?'text-red-400' :''} text-md font-bold text-gray-600 text-xl`}
          >
            Email de Registro
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleInputChange}
            className={`border rounded-lg  mt-1 shadow-inner py-2 px-2 font-semibold w-full
             bg-gray-50 outline-none ${alerta?.campo === 'email' ?'border-red-400 border-2' :''} `}
          />
        </div>

        <div className="mt-5 relative">
          <label
            htmlFor="password"
            className={`${alerta?.campo === 'password' ?'text-red-400' :''} text-md font-bold text-gray-600 text-xl`}
          >
            Password de Registro
          </label>
          <input
            type={`${shown  ? 'text' : 'password'}`}
            id="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
            value={values.password}
            onChange={handleInputChange}
            className={`border rounded-lg mt-1 shadow-inner py-2 px-2 font-semibold w-full
            ${alerta?.campo === 'password' ?'border-red-400 border-2' :''}  bg-gray-50 outline-none`}
          />
           <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 cursor-pointer absolute top-11 right-5 text-gray-600 font-bold hover:text-gray-800 duration-200"
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

        <div className="mt-5 relative">
          <label
            htmlFor="repetirPassword"
            className={`${alerta?.campo === 'repetirPassword' ?'text-red-400' :''} text-md font-bold text-gray-600
                 text-xl`}
          >
            Repetir Password
          </label>
          <input
            type={`${shown2 ?"text":"password"}`}
            id="repetirPassword"
            name="repetirPassword"
            placeholder="Repetir Password"
            autoComplete="off"
            value={values.repetirPassword}
            onChange={handleInputChange}
            className={` ${alerta?.campo === 'repetirPassword' ?'border-red-400 border-2' :''} border rounded-lg 
                shadow-inner mt-1 mb-5 py-2 px-2 font-semibold w-full bg-gray-50 outline-none`}
          />
          <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 cursor-pointer absolute top-11 right-5 text-gray-600 font-bold hover:text-gray-800 duration-200"
              onMouseDown={() => setshown2(!shown2)}
              onMouseUp={() =>setshown2(!shown2)}
            
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

        <input
          type="submit"
          value="Crear Cuenta"
          className="bg-sky-800 w-full py-2 text-white font-bold text-lg rounded-md hover:bg-sky-900 
                    cursor-pointer mb-5 ring ring-sky-800 hover:ring-offset-2 duration-300"
        />
      </form>
      <div className="flex flex-col">
          <Link href="/" className="text-sky-600 font-bold">
            ¿Ya tienes una cuenta?  {' '}
            <span className="text-gray-600 font-bold">Iniciar sesión </span>
          </Link>
          <Link href="/olvidePassword"className="text-gray-600 font-bold mt-2">
            Olvide mi Password
          </Link>
        </div>
    </LayoutAuth>
  );
};



export default Account;
