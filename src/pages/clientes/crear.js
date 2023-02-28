import { useState } from "react";
import { useRouter } from "next/router";
import { getTipoDocumentos } from "@/utils/api/api";
import axios from "axios";
import ErrorsList from "../../../components/errorsList";
import ErrorListProperty from "../../../components/errorListProperty";

export const getStaticProps = async () => {
    const tipoDocumentos = await getTipoDocumentos();
    return { props: { tipoDocumentos } };
};


const creeateForm = ({tipoDocumentos}) => {


    const router = useRouter();
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [direccion, setDireccion] = useState("");
    const [numeroDocumento, setNumeroDocumento] = useState("");
    const [selectedOption, setSelectedOption] = useState(1);



    const [submitting, setSubmitting] = useState(false);

    const [errors, setErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);

      /*  try {
            const res = await axios.post('http://localhost:5112/api/v1/Cliente', {
                nombre: nombre,
                apellido: apellido,
                fechaNacimiento: fechaNacimiento,
                telefono: telefono,
                email: email,
                direccion: direccion,
                numeroDocumento : numeroDocumento,
                tipoDocumentoId: 1

            });

            setErrors([]);
            setNombre("");
            setApellido("");
            setFechaNacimiento("");
            setTelefono("");
            setEmail("");
            setDireccion("");

            console.log("melo");



        } catch (error) {
            console.log("esta chimbada no sirve");
            console.error(error);
            setSubmitting(false);


        } */
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/Cliente`,
                {
                    method: "POST",
                    headers: {
                        accept: "application/json",
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre: nombre,
                        apellido: apellido,
                        fechaNacimiento: fechaNacimiento,
                        telefono: telefono,
                        email: email,
                        direccion: direccion,
                        numeroDocumento : numeroDocumento,
                        tipoDocumentoId: parseInt(selectedOption)
                    }),
                }
            );

            if (res.ok) {
                setErrors([]);
                setNombre("");
                setApellido("");
                setFechaNacimiento("");
                setTelefono("");
                setEmail("");
                setDireccion("");
                setNumeroDocumento("");

                return router.push("/clientes");
            }

            const data = await res.json();
            setErrors(data.errors);
            setSubmitting(false);


        }catch (errors){

        }





    }
    return (
        <>
            <form
                className="my-24 mx-auto max-w-3xl space-y-6 px-4"
                onSubmit={handleSubmit}
            >
                <h1 className=" text-3xl font-semibold"> Crear cliente</h1>

                <input
                    className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                    id="grid-nombre"
                    type="text"
                    onChange={(e) => setNombre(e.target.value)}
                    value={nombre}
                    disabled={submitting}
                    placeholder="Nombre"
                />
                {errors.Nombre && <ErrorListProperty errors={errors.Nombre} />}


                <input
                    className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                    id="grid-apellido"
                    type="text"
                    onChange={(e) => setApellido(e.target.value)}
                    value={apellido}
                    disabled={submitting}
                    placeholder="Apellido"
                />

                {errors.Apellido && <ErrorListProperty errors={errors.Apellido} />}


                <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                    {tipoDocumentos.map(option => (
                        <option key={option.Id} value={option.Id}>
                            {option.Tipo} - {option.Descripcion}
                        </option>
                    ))}
                </select>



                <input
                    className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                    id="grid-numeroDocumento"
                    type="text"
                    onChange={(e) => setNumeroDocumento(e.target.value)}
                    value={numeroDocumento}
                    disabled={submitting}
                    placeholder="Número documento"
                    required={true}
                />

                {errors.NumeroDocumento && <ErrorListProperty errors={errors.NumeroDocumento} />}


                <input
                    className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                    id="grid-fechanacimiento"
                    type="date"
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                    value={fechaNacimiento}
                    disabled={submitting}
                    placeholder="FechaNacimiento"
                    required={true}
                />

                <input
                    className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                    id="grid-telefono"
                    type="text"
                    onChange={(e) => setTelefono(e.target.value)}
                    value={telefono}
                    disabled={submitting}
                    placeholder="Teléfono"
                />

                {errors.Telefono && <ErrorListProperty errors={errors.Telefono} />}

                <input
                    className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                    id="grid-email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    disabled={submitting}
                    placeholder="Correo electrónico"
                />

                {errors.Email && <ErrorListProperty errors={errors.Email} />}

                <input
                    className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                    id="grid-direccion"
                    type="text"
                    onChange={(e) => setDireccion(e.target.value)}
                    value={direccion}
                    disabled={submitting}
                    placeholder="Dirección"
                />

                {errors.Direccion && <ErrorListProperty errors={errors.Direccion} />}

                <button
                    type="submit"
                    disabled={submitting}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                >
                    {submitting ? 
                    <>
                       <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                        Procesando ...
                    </> 

                    : "Enviar"}
                   
                </button>

                {Object.keys(errors).length > 0 && <ErrorsList errors={errors}></ErrorsList>}
            </form>

        </>
    );
};

export default creeateForm;