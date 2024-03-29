import { useState } from "react";
import { useRouter } from "next/router";
import { getTipoDocumentos } from "@/utils/api/api";
import ErrorsList from "../../../components/errorsList";
import ErrorListProperty from "../../../components/errorListProperty";
import Dashboard from "../../../layouts/dashboard";
import BackButton from "components/backbutton";

const CrearVehiculoFormulario = ({ tipoDocumentos }) => {
  const router = useRouter();
  const [placa, setPlaca] = useState("");
  const [color, setColor] = useState("");
  const [kilometraje, setKilometraje] = useState("");
  const [anioModelo, setAnioModelo] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/Vehiculo`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            placa: placa,
            color: color,
            kilometraje: kilometraje,
            anioModelo: anioModelo,
          }),
        }
      );

      if (res.ok) {
        setErrors([]);
        setPlaca([]);
        setColor([]);
        setKilometraje([]);
        setAnioModelo([]);

        return router.push("/vehiculos");
      }
      const data = await res.json();
      setErrors(data.errors);
      setSubmitting(false);
    } catch (errors) {}
  }
  return (
    <>
      <Dashboard>
        <BackButton></BackButton>
        <form
          className="my-14 mx-auto max-w-3xl space-y-6 px-4"
          onSubmit={handleSubmit}
        >
          {Object.keys(errors).length > 0 && (
            <ErrorsList errors={errors}></ErrorsList>
          )}
          <h1 className=" text-3xl font-semibold"> Crear Vehiculo</h1>

          <div className="grid grid-cols-2 gap-4">
            <div className="...">
              <input
                className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                id="grid-nombre"
                type="text"
                onChange={(e) => setPlaca(e.target.value)}
                value={placa}
                disabled={submitting}
                placeholder="Placa"
              />
              {errors.Placa && <ErrorListProperty errors={errors.Placa} />}
            </div>
            <div className="...">
              <input
                className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                id="grid-apellido"
                type="text"
                onChange={(e) => setColor(e.target.value)}
                value={color}
                disabled={submitting}
                placeholder="Color"
              />
              {errors.Color && <ErrorListProperty errors={errors.Color} />}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="...">
              <input
                className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                id="grid-nombre"
                type="text"
                onChange={(e) => setKilometraje(e.target.value)}
                value={kilometraje}
                disabled={submitting}
                placeholder="Kilometraje"
              />
              {errors.Kilometraje && (
                <ErrorListProperty errors={errors.Kilometraje} />
              )}
            </div>
            <div className="...">
              <input
                className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                id="grid-apellido"
                type="text"
                onChange={(e) => setAnioModelo(e.target.value)}
                value={anioModelo}
                disabled={submitting}
                placeholder="Año modelo"
              />
              {errors.AnioModelo && (
                <ErrorListProperty errors={errors.AnioModelo} />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            {submitting ? (
              <>
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Procesando ...
              </>
            ) : (
              "Enviar"
            )}
          </button>
        </form>
      </Dashboard>
    </>
  );
};

export default CrearVehiculoFormulario;
