
import Link from "next/link";
import Dashboard from "../../../layouts/dashboard";
import { HiPencilAlt } from "react-icons/hi";
import {getMarcas} from "@/utils/api/api";


export default function ListadoMarcas({ marcas }) {
    return (

        <Dashboard>
            <Link href={"/marcas/crear"}>
                <button className="bg-transparent  hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-lg mb-6">
                    Nueva Marca
                </button>
            </Link>
            <div className=" hidden overflow-auto rounded-xl shadow md:block">
                <table className="w-full hover:cursor-auto">
                    <thead className="border-b-2 border-gray-200 bg-gray-50">
                    <tr>
                        <th className="w-20 p-3 text-left text-sm font-semibold tracking-wide">
                            Nombre
                        </th>

                        <th className="w-20 p-3 text-left text-sm font-semibold tracking-wide">
                            Categoría Vehículo
                        </th>
                        
                        <th className="w-20 p-3 text-left text-sm font-semibold tracking-wide">
                            Acciones
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {marcas?.map((marca) => (
                        <tr key={marca.Id}>
                            <td className=" whitespace-nowrap p-3 text-sm text-gray-700">
                                {marca.Nombre}
                            </td>
                            <td className=" whitespace-nowrap p-3 text-sm text-gray-700">
                                {marca.CategoriaVehiculo.Nombre}
                            </td>
                            <td className=" whitespace-nowrap p-3 text-sm text-gray-700">
                                <Link href={`/marcas/${marca.Id}`}>
                                    <HiPencilAlt/>
                                </Link>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden ">
                {marcas?.map((marca) => (
                    <div key={marca.Id} className="space-y-3 rounded-lg bg-white p-4 shadow">
                        <div className="flex items-center space-x-2 text-sm">
                            <div className="whitespace-nowrap text-sm text-gray-600">
                                {marca.Nombre}
                            </div>
                            <div className="whitespace-nowrap text-sm text-gray-600">

                            </div>
                        </div>
                        <div className="whitespace-nowrap text-sm text-gray-600">

                        </div>
                        <div className="whitespace-nowrap text-sm text-black">

                        </div>
                    </div>
                ))}
            </div>
        </Dashboard>
    );
}

export const getStaticProps = async () => {
    const marcas = await getMarcas();
    return { props: { marcas } };
};