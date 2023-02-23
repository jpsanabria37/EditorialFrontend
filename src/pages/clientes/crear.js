
import { use, useState } from "react";
import { useRouter } from "next/router";

const creeateForm = () => {
    const router = useRouter();
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [direccion, setDireccion] = useState("");

    const [submitting, setSubmitting] = useState(false);

    const [errors, setErrors] = useState([]);

    async function handleSubmit(e) {

        e.preventDefault();
        setSubmitting(true);
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1Cliente`,
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
                    direccion: direccion
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

            return router.push("/clientes");
        }

        const data = await res.json();
        setErrors(data.errors);
        setSubmitting(false);
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

                <input
                    className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                    id="grid-apellido"
                    type="text"
                    onChange={(e) => setApellido(e.target.value)}
                    value={apellido}
                    disabled={submitting}
                    placeholder="Apellido"
                />

                <input
                    className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                    id="grid-fechanacimiento"
                    type="date"
                    onChange={(e) => setFechaNacimiento(e.target.value)}
                    value={fechaNacimiento}
                    disabled={submitting}
                    placeholder="FechaNacimiento"
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

                <input
                    className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                    id="grid-email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    disabled={submitting}
                    placeholder="Correo electrónico"
                />

                <input
                    className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                    id="grid-direccion"
                    type="text"
                    onChange={(e) => setDireccion(e.target.value)}
                    value={direccion}
                    disabled={submitting}
                    placeholder="Dirección"
                />
                <button
                    type="submit"
                    disabled={submitting}
                    className="mb-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                >
                    {submitting ? <div> <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                        <!-- ... -->
                    </svg>
                        Processing...</div> : "Enviar"}
                </button>


                {errors}
            </form>

        </>
    );
};

export default creeateForm;