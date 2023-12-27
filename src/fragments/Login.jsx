import React from 'react';
import '../css/hilarystyle.css';
import 'boxicons'



const Login = () => {
     
    return (
            
        <header className='header'>
            <nav className='navbar'>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Servicios</a>
                <a href="#">Contactos</a>
            </nav>

            <form action="#" className="search-bar">
                <input type="text" placeholder='Buscar...'/>
                <button type='submit'><i class='bx bx-search-alt-2'></i></button>
            </form>
        </header>



    );
};

 
export default Login;