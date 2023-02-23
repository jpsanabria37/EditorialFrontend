
import { use, useState } from "react";
import { useRouter } from "next/router";

const creeateForm = () => {
    const router = useRouter();
    const [Tipo, setTipo] = useState("");
    const [Descripcion, setDescripcion] = useState("");
    

    const [submitting, setSubmitting] = useState(false);

    const [errors, setErrors] = useState([]);

    async function handleSubmit(e) {

        e.preventDefault();
        setSubmitting(true);
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1TipoDocumento`,
            {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    Tipo: Tipo,
                    Descripcion: Descripcion,
                   
                }),
            }
        );

        if (res.ok) {
            setErrors([]);
            setTipo("");
            setDescripcion("");
        
            return router.push("/tipodocumentos");
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
                <h1 className=" text-3xl font-semibold"> Crear tipo documento</h1>

                <input
                    className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                    id="grid-tipo"
                    type="text"
                    onChange={(e) => setTipo(e.target.value)}
                    value={Tipo}
                    disabled={submitting}
                    placeholder="Tipo"
                />

                <input
                    className="block w-full rounded border border-gray-400 py-2 px-4 focus:border-teal-500 focus:outline-none"
                    id="grid-apellido"
                    type="text"
                    onChange={(e) => setDescripcion(e.target.value)}
                    value={Descripcion}
                    disabled={submitting}
                    placeholder="Descripcion"
                />

                <button
                    type="submit"
                    disabled={submitting}
                    className="mb-4 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
                >
                    {submitting ? "Enviando ..." : "Enviar"}
                </button>
                {errors}
            </form>

        </>
    );
};

export default creeateForm;