import fetch from 'node-fetch';
import Image from 'next/image'
import Dashboard from "../../../../layouts/dashboard";



const https = require('https');
const agent = new https.Agent({ rejectUnauthorized: false });
export async function getStaticPaths() {

    // Aquí puedes obtener la lista de clientes para generar rutas estáticas
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/Servicio`, { agent });
    const data = await res.json();
    const servicios = data.Data;
    // Generamos un array con los IDs de los clientes
    const ids = servicios.map((servicio) => servicio.Id);

    // Generamos las rutas estáticas para cada ID de cliente
    const paths = ids.map((id) => ({ params: { sid: id.toString() } }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const { sid } = params;

    // Hacemos una petición para obtener los datos del cliente según su ID
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/Servicio/${sid}`, { agent });
    const data = await res.json();
    const servicio = data.Data;

    return {
        props: {
            servicio,
        },
    };
}




function ServicioDetail  ({ servicio = {} }) {
    return (
        <>
            <Dashboard>
                <div className="bg-gray-100">
                    <div className="container mx-auto px-4 py-8">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="md:flex">
                                <div className="md:flex-shrink-0">
                                        <Image
                                            className="h-48 w-full object-cover md:w-48"
                                            src="/images/user_default.png"
                                            alt="Servicio"
                                            width={500}
                                            height={500}
                                        />
                                </div>
                                <div className="p-8">
                                    <div
                                        className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Servicio
                                    </div>
                                    <h1 className="block mt-1 text-lg leading-tight font-medium text-black">{servicio.Nombre}
                                      </h1>
                                    <p className="mt-2 text-gray-500">{servicio.Descripcion}</p>
                                    <div className="flex mt-4">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Editar
                                        </button>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="mt-4 w-full">
                                    <thead>
                                    <tr>
                                        <th className="px-4 py-2 bg-gray-200 text-gray-600 border">Fecha</th>
                                        <th className="px-4 py-2 bg-gray-200 text-gray-600 border">Producto</th>
                                        <th className="px-4 py-2 bg-gray-200 text-gray-600 border">Precio</th>
                                    </tr>
                                    </thead>
                                    <tbody className="text-gray-600">
                                    <tr>
                                        <td className="px-4 py-2 border">2022-02-18</td>
                                        <td className="px-4 py-2 border">Producto 1</td>
                                        <td className="px-4 py-2 border">$10.00</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border">2022-02-17</td>
                                        <td className="px-4 py-2 border">Producto 2</td>
                                        <td className="px-4 py-2 border">$20.00</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2 border">2022-02-16</td>
                                        <td className="px-4 py-2 border">Producto 3</td>
                                        <td className="px-4 py-2 border">$30.00</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </Dashboard>
        </>
    );
};

export default ServicioDetail;