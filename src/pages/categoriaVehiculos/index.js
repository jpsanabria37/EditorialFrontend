import Link from "next/link";
import Dashboard from "../../../layouts/dashboard";
import { HiPencilAlt } from "react-icons/hi";

import { getCategoriaVehiculos } from "@/utils/api/api";

export default function CategoriaVehiculosList({ cVehiculos }) {
  return (
    <Dashboard>
      <Link href={"/categoriaVehiculos/crear"}>
        <button className="mb-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
          Nuevo categoría vehículos
        </button>
      </Link>
      <div className=" hidden overflow-auto rounded-xl shadow md:block">
        <table className="w-full hover:cursor-auto">
          <thead className="border-b-2 border-gray-200 bg-gray-50">
            <tr>
              <th className="w-20 p-3 text-left text-sm font-semibold tracking-wide">
                Nombre
              </th>
              <th className="p-3 text-left text-sm font-semibold tracking-wide">
                Descripción
              </th>

              <th className="w-20 p-3 text-left text-sm font-semibold tracking-wide">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cVehiculos?.map((cVehiculo) => (
              <tr key={cVehiculo.Id}>
                <td className=" whitespace-nowrap p-3 text-sm text-gray-700">
                  {cVehiculo.Nombre}
                </td>

                <td className=" whitespace-nowrap p-3 text-sm text-gray-700">
                  {cVehiculo.Descripcion}
                </td>

                <td className=" whitespace-nowrap p-3 text-sm text-gray-700">
                  <Link href={`/categoriaVehiculos/${cVehiculo.Id}`}>
                    <HiPencilAlt />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden ">
        {cVehiculos?.map((cVehiculo) => (
          <div
            key={cVehiculo.Id}
            className="space-y-3 rounded-lg bg-white p-4 shadow"
          >
            <div className="flex items-center space-x-2 text-sm">
              <div className="whitespace-nowrap text-sm text-gray-600">
                {cVehiculo.Nombre}
              </div>
              <div className="whitespace-nowrap text-sm text-gray-600"></div>
            </div>
            <div className="whitespace-nowrap text-sm text-gray-600">
              {cVehiculo.Descripcion}
            </div>
          </div>
        ))}
      </div>
    </Dashboard>
  );
}

export const getStaticProps = async () => {
  const cVehiculos = await getCategoriaVehiculos();
  return { props: { cVehiculos } };
};
