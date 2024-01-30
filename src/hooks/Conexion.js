const URL = "http://localhost:5006/api"

export const metodoGet = async (link, key) => {
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
