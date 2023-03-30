import fetch from "node-fetch";
import Link from "next/link";
import Dashboard from "../../../layouts/dashboard";
import { HiPencilAlt } from "react-icons/hi";

export default function ListadoVehiculos({ vehiculos }) {
  return (
    <Dashboard>
      <Link href={"/vehiculos/crear"}>
        <button className="bg-transparent  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg mb-6">
          Nuevo Vehiculo
        </button>
      </Link>
      <div className=" hidden overflow-auto rounded-xl shadow md:block">
        <table className="w-full hover:cursor-auto">
          <thead className="border-b-2 border-gray-200 bg-gray-50">
            <tr>
              <th className="p-3 text-left text-sm font-semibold tracking-wide">
                Placa
              </th>
              <th className="p-3 text-left text-sm font-semibold tracking-wide">
                Color
              </th>
              <th className="p-3 text-left text-sm font-semibold tracking-wide">
                Kilometraje
              </th>
              <th className="w-36 p-3 text-left text-sm font-semibold tracking-wide">
                AñoModelo
              </th>
              <th className="w-20 p-3 text-left text-sm font-semibold tracking-wide">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {vehiculos?.map((vehiculo) => (
              <tr key={vehiculo.Id}>
                <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                  {vehiculo.Placa}
                </td>

                <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                  {vehiculo.Color}
                </td>

                <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                  {vehiculo.Kilometraje}
                </td>

                <td className="whitespace-nowrap p-3 text-sm text-gray-700">
                  {vehiculo.AnioModelo}
                </td>
                <td className=" whitespace-nowrap p-3 text-sm text-gray-700">
                  <Link href={`/vehiculos/${vehiculo.Id}`}>
                    <HiPencilAlt />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden ">
        {vehiculos?.map((vehiculo) => (
          <div
            key={vehiculo.Id}
            className="space-y-3 rounded-lg bg-white p-4 shadow"
          >
            <div className="flex items-center space-x-2 text-sm">
              <div className="whitespace-nowrap text-sm text-gray-600">
                {vehiculo.Placa}
              </div>
              <div className="whitespace-nowrap text-sm text-gray-600"></div>
            </div>
            <div className="whitespace-nowrap text-sm text-gray-600"></div>
            <div className="whitespace-nowrap text-sm text-black"></div>
          </div>
        ))}
      </div>
    </Dashboard>
  );
}

export const getStaticProps = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/Vehiculo`
  );
  const data = await res.json();
  const vehiculos = data.Data || [];
  return { props: { vehiculos } };
};
