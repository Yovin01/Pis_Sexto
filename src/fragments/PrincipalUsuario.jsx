import React from 'react';
import '../css/homeStyle.css';
import '../css/barraMenuStyle.css';
import BarraMenu from './BarraMenu';
import logoIcon from '../LOGO_SINFONDO.png';

const PrincipalUsuario = () => {

    return (
        <div>
        
        <BarraMenu/>

        <div className="home-container">
            <div className="home-text">
                <h1>API RADIACIÓN ULTRAVIOLETA</h1>
                {/* Aquí puedes añadir más contenido de texto */}
            </div>
            <div className="home-image">
                {/* Aquí puedes colocar tu imagen */}
                <img src={logoIcon} alt="Imagen Descriptiva" />
            </div>
        </div>
         
        </div>

    );
};

export default PrincipalUsuario;
