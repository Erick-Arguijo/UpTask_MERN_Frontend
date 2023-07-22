import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const NotFound = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col justify-center">
      <Image
        src="/img/notFound.png"
        width={400}
        height={400}
        alt="Picture of the author"
        className="mx-auto"
      />
      <div className="mx-auto">
        <h2 className="font-bold text-center mt-2 text-4xl text-sky-700">Página no encontrada</h2>
        <h3 className="font-bold text-center mt-2 text-lg">La página que buscas no está disponible</h3>
        <button className="flex py-3 px-20 bg-blue-400 rounded-md font-bold text-white
         hover:bg-blue-500 mt-5 mx-auto"
          onClick={() => router.push('/proyecto')}
         >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        
          Regresar
        </button>
      </div>
    </div>
  );
};

export default NotFound;
