export async function getTipoDocumentos() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/TipoDocumento`,{
        method: 'GET',
        headers: {
            'accept': 'text/plain'
        },
    });
    const data = await response.json();
    return data.Data || [];
}