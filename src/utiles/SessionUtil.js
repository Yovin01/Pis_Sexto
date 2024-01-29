export const borrarSesion=()=>{
    localStorage.clear();
}
export const getToken = () => {
    return localStorage.getItem('token');
}