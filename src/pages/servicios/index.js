import fetch from 'node-fetch';
import Link from "next/link";
import Dashboard from "../../../layouts/dashboard";
import { HiPencilAlt } from "react-icons/hi";


export default function ServiciosList({ servicios }) {
    return (

        <Dashboard>
            <Link href={"/servicios/crear"}>
                <button className="mb-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
                    Nuevo servicio
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
                            Descripcion
                        </th>
                        <th className="w-20 p-3 text-left text-sm font-semibold tracking-wide">
                            Acciones
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                    {servicios?.map((servicio) => (
                        <tr key={servicio.Id}>
                            <td className=" whitespace-nowrap p-3 text-sm text-gray-700">
                                {servicio.Nombre}
                            </td>
                            <td className=" whitespace-nowrap p-3 text-sm text-gray-700">
                                {servicio.Descripcion}
                            </td>
                            <td className=" whitespace-nowrap p-3 text-sm text-gray-700">
                                <Link href={`/servicios/${servicio.Id}`}>
                                    <HiPencilAlt/>
                                </Link>

                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:hidden ">
                {servicios?.map((servicio) => (
                    <div key={servicio.Id} className="space-y-3 rounded-lg bg-white p-4 shadow">
                        <div className="flex items-center space-x-2 text-sm">
                            <div className="whitespace-nowrap text-sm text-gray-600">
                                {servicio.Nombre}
                            </div>
                            <div className="whitespace-nowrap text-sm text-gray-600">
                            {servicio.Descripcion}
                            </div>
                        </div>
                        <div className="whitespace-nowrap text-sm text-black">
                        <Link href={`/servicios/${servicio.Id}`}>
                                    <HiPencilAlt/>
                                </Link>

                        </div>
                    </div>
                ))}
            </div>
        </Dashboard>
    );
}

export const getServerSideProps = async () => {
    const https = require('https');
    const agent = new https.Agent({ rejectUnauthorized: false });
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1Servicio`, { agent });
    const data = await res.json();
    const servicios = data.Data || [];
    return { props: { servicios } };
};