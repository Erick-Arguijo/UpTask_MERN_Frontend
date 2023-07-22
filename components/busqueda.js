import useProject from "@/hooks/useProject";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Busqueda = () => {
  const [busqueda, setbusqueda] = useState("");
  const { modalBusqueda, handleBusqueda, proyectos } = useProject();

  const proyectosFiltrados =
    busqueda === ""
      ? []
      : proyectos.filter((proyectoState) =>
          proyectoState.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );


  return (
    <Transition.Root
      show={modalBusqueda}
      as={Fragment}
      afterLeave={()=> setbusqueda('')}
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto mt-0 p-4 sm:p-20 md:p-20"
        onClose={handleBusqueda}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            onChange={(proyecto)=> window.location = `/proyecto/${proyecto._id}`}
          >
            <div className="relative">
              <Combobox.Input
                className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 
                    focus:ring-0 sm:text-sm outline-none"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => setbusqueda(e.target.value)}
              />
            </div>

            {proyectosFiltrados.length === 0 && busqueda !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              <Combobox.Options
                static
                className="max-h-72 scroll-py-2 overflow-y-auto text-sm text-gray-800"
              >
                {proyectosFiltrados.map(proyectoState =>(
                    <Combobox.Option
                        key={proyectoState._id}
                        value={proyectoState}
                        className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                        active ? "bg-sky-600 text-white" : "text-gray-900"
                    }`
                  }
                >
                  {proyectoState.nombre}
                </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default Busqueda;
