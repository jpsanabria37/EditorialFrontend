import fetch from 'node-fetch';
import Image from 'next/image'
import Dashboard from "../../../../layouts/dashboard";

const https = require('https');
const agent = new https.Agent({ rejectUnauthorized: false });
export async function getStaticPaths() {

    // Aquí puedes obtener la lista de clientes para generar rutas estáticas
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/TipoDocumento`);
    const data = await res.json();
    const tipodocumentos = data.Data;
    // Generamos un array con los IDs de los clientes
    const ids = tipodocumentos.map((tipodocumento) => tipodocumento.Id);

    // Generamos las rutas estáticas para cada ID de cliente
    const paths = ids.map((id) => ({ params: { tid: id.toString() } }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const { tid } = params;

    // Hacemos una petición para obtener los datos del cliente según su ID
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/TipoDocumento/${tid}`);
    const data = await res.json();
    const tipodocumento = data.Data;

    return {
        props: {
            tipodocumento,
        },
    };
}


async function deleteData({ tid }) {
    try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/TipoDocumento/${tid}`);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}


const TipoDocumentoDetail = ({ tipodocumento = {} }) => {
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
                                            alt="tipo documento"
                                            width={500}
                                            height={500}
                                        />
                                </div>
                                <div className="p-8">
                                    <div
                                        className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Tipo Documento
                                    </div>
                                    <h1 className="block mt-1 text-lg leading-tight font-medium text-black">{tipodocumento.Tipo}
                                      </h1>
                                    <p className="mt-2 text-gray-500">Descripcion: {tipodocumento.Descripcion}</p>
                                    <div className="flex mt-4">
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Editar
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                            onClick={deleteData(tipodocumento.Id)}
                                        >Borrar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Dashboard>
        </>
    );
};

export default TipoDocumentoDetail;