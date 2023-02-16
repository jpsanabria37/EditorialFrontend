import fetch from 'node-fetch';

export default function Home({ cliente }) {
    return (
        <div>
            <div className="shadow-md rounded my-6">
                <table className="w-full table-fixed">
                    <thead>
                    <tr className="bg-gray-100 border-b">
                        <th className="px-4 py-2 w-1/3 text-left">Producto</th>
                        <th className="px-4 py-2 w-1/3 text-left">Precio</th>
                        <th className="px-4 py-2 w-1/3 text-left">Categoria</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cliente && cliente.map(c => (
                        <tr key={c.Id}>
                            <td className="px-4 py-2 w-1/3 text-left">{c.Descripcion}</td>
                            <td className="px-4 py-2 w-1/3 text-left">{c.Precio}</td>
                            <td className="px-4 py-2 w-1/3 text-left">{c.Categoria.Descripcion}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export const getServerSideProps = async () => {
    const https = require('https');
    const agent = new https.Agent({ rejectUnauthorized: false });
    const res = await fetch('https://localhost:7143/api/v1Producto', { agent });
    const data = await res.json();
    const cliente = data.Data || [];
    return { props: { cliente } };
};