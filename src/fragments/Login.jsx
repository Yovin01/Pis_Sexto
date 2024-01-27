import React from 'react';
import '../css/hilarystyle.css';
import 'boxicons';
import unlIcon from '../img/logoUNl/UNL.png';
import Header from './Header';

const Login = () => {
    return (
        <div>
        
        <Header/>
            <div className='background'>

            </div>

            <div className='container1'>
                <div className='content'>
                    <h2 className='logo'><i className='bx bxs-sun'></i>API RADIACIÓN ULTRAVIOLETA</h2>
                    <div className='text-sci'>
                        <h2>Bienvenido! <br /> <span>A un enfoque más consciente de la exposición solar en Loja</span></h2>
                        <p> Nuestra plataforma ha sido diseñada pensando en personas que buscan acceder
                            a información valiosa sobre los niveles de radiación UV en fechas pasadas. Con nuestra API, ahora es
                            posible explorar y utilizar datos detallados de radiación UV históricos, esta proporcionará acceso a una fuente confiable y completa de información. </p>

                    </div>
                </div>

                <div className='logreg-box'>
                    <div className='form-box login'>

                        <form action="#">
                            <div className='iconunl'>
                                <img src={unlIcon} alt="Logo UNL" />

                            </div>
                            <h2>
                                Iniciar Sesión
                            </h2>

                            <div className='input-box'>
                                <span className='icon'><i class='bx bxs-envelope' ></i></span>
                                <input type="email" required />
                                <label>Correo electrónico</label>

                            </div>

                            <div className='input-box'>
                                <span className='icon'><i class='bx bxs-lock-alt' ></i></span>
                                <input type="password" required />
                                <label>Contraseña</label>

                            </div>

                            <button type='submit' className='btn1'>
                                Ingresar
                            </button>

                            <div className='login-register'>
                                <p>¿No tienes cuenta?
                                    <a href="#" className='register-link'> Registrate</a>
                                </p>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;
