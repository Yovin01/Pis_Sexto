import { borrarSesion } from '../utiles/SessionUtil';
import { useNavigate } from 'react-router';
import { getRol, getUser } from '../utiles/SessionUtil'; 
import '../css/barraMenuStyle.css';
import 'boxicons';
import React, { useEffect, useState } from 'react';


const BarraMenu = () => {
    const navegation = useNavigate();
    const rol = getRol();
    const [nombreUsuario, setNombreUsuario] = useState('');


   
    const handleClick = () => {
        borrarSesion();
        navegation('/principal');
    }

    useEffect(() => {
        const usuario = getUser();
        if (usuario && usuario.nombres) {
            setNombreUsuario(usuario.nombres); 
        }
    }, []);

    console.log(getUser.nombres);
    return ( 
        <header className='header1'>
            <a href="#" className="logo">Hola,  {nombreUsuario} 👋</a>

            <input type="checkbox" id='check'/>
            <label htmlFor="check"className='icons1'>
                <i className='bx bx-menu' id='menu-icon'></i>
                <i className='bx bx-x' id='close-icon'></i>
            </label>


            <nav className='navbar1'>
                    {rol === 'ADMINISTRADOR' && (
                        <>
                            <a href="#">Usuarios</a>
                            <a href="#">Peticiones</a>
                        </>
                    )}
                    {rol === 'USUARIO' && <a href="/api">API</a>}
                    <a href="#">Perfil</a>
                    <a href="/principal" onClick={handleClick}>Cerrar Sesión</a>
            </nav>
        </header>
    )
}

export default BarraMenu;