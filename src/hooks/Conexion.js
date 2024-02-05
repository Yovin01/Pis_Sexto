const URL = "http://localhost:5006/api"

export const metodoGet = async (link,data, key) => {
    var cabecera = {
        "x-api-token": key,
        "Content-Type": "application/json",
    }
    const datos = await (await fetch(URL+link,{
        method: "GET",
        headers: cabecera
    })).json();
  //  console.log((datos.info));
    return datos;
}  

export const ObtenerGet = async (key, url) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(`${URL}/${url}`, {
        method: "GET",
        headers: headers,
    })).json();
    return datos;
}

export const PostGuardar = async (data, key, urls) => {
    const headers = {
        "Content-Type": "application/json",
        "X-API-TOKEN": key
    };
    const datos = await (await fetch(`${URL}/${urls}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    })).json();
    return datos;
}


export const GuardarPersona = async (key, data) => {
    const headers = {
        "Content-Type": "application/json",
        "x-api-token": key
    };
    const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    };

    try {
        const response = await fetch(URL +'/guardar/personas', requestOptions);
        const datos = await response.json();
        return datos;
    } catch (error) {
        console.log("Error:", error);
        throw error;
    }
}
