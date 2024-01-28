const URL = "http://localhost:3006/api"

export const InicioSesion = async (data) => {
    const headers = {
        "Accept": 'application/json',
        "Content-Type": 'application/json'
    };
    const datos = await (await fetch(URL + "/sesion", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
        
    })).json();
    console.log("AQUIII", datos);
    return datos;
}