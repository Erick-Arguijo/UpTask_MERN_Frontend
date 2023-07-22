import LayoutAuth from "@/components/layoutAuth";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import Alerta from "@/components/alerta";

const ConfirmarCuenta = () => {
  const router = useRouter();
  const [alerta, setalerta] = useState({});
  const [cuentaConfirmada, setcuentaConfirmada] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = router.query.token;
    try {
      const { data } = await axios(`/api/auth/confirmarCuenta/${token}`);
      setalerta(data);
      setcuentaConfirmada(true);
    } catch (error) {
      //console.log(error.response.data)
      setalerta(error.response.data);
    }
  };

  return (
    <LayoutAuth
      page="Confirmar Cuenta"
      title="Confirma tu Cuenta Para Administrar tus"
    >
      {Object.entries(alerta).length !== 0 && <Alerta alerta={alerta} />}
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="submit"
            value="Confirmar Cuenta"
            className="bg-sky-800 w-full py-2 text-white font-bold text-lg rounded-md hover:bg-sky-900 
                    cursor-pointer mt-5 mb-5 ring ring-sky-800 hover:ring-offset-2 duration-300"
          />
        </form>
        {cuentaConfirmada && (
          <nav className="flex flex-col text-center">
            <Link href="/" className="text-sky-600 font-semibold">
              <span className="text-gray-600 font-bold">Iniciar sesión </span>
            </Link>
          </nav>
        )}
      </div>
    </LayoutAuth>
  );
};

export default ConfirmarCuenta;
