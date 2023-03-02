import Link from "next/link";
import Dashboard from "../../../layouts/dashboard";
import { HiPencilAlt } from "react-icons/hi";
import { getTipoDocumentos } from "@/utils/api/api";

const ListadoTipoDocumentos = ({ tipoDocumentos }) => {
  return (
    <>
      <Dashboard>
        <Link href={"/tipodocumentos/crear"}>
          <button className="mb-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
            Nuevo Tipo Documento
          </button>
        </Link>
        <div className=" hidden overflow-auto rounded-xl shadow md:block">
          <table className="w-full hover:cursor-auto">
            <thead className="border-b-2 border-gray-200 bg-gray-50">
              <tr>
                <th className="w-20 p-3 text-left text-sm font-semibold tracking-wide">
                  Tipo
                </th>
                <th className="w-20 p-3 text-left text-sm font-semibold tracking-wide">
                  Descripción
                </th>

                <th className="w-20 p-3 text-left text-sm font-semibold tracking-wide">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tipoDocumentos?.map((tipoDocumento) => (
                <tr key={tipoDocumento.Id}>
                  <td className=" whitespace-nowrap p-3 text-sm text-gray-700">
                    {tipoDocumento.Tipo}
                  </td>
                  <td className=" whitespace-nowrap p-3 text-sm text-gray-700">
                    {tipoDocumento.Descripcion}
                  </td>

                  <td className=" whitespace-nowrap p-3 text-sm text-gray-700">
                    <Link href={`/tipodocumentos/${tipoDocumento.Id}`}>
                      <HiPencilAlt />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dashboard>
    </>
  );
};

export const getStaticProps = async () => {
  const tipoDocumentos = await getTipoDocumentos();
  return { props: { tipoDocumentos } };
};

export default ListadoTipoDocumentos;
