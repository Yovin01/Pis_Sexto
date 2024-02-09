import React from 'react';
import '../css/ricardostyle.css';
import 'boxicons';

const Registro = () => {
    return (
        <div>

            <div className='background'>
            </div>

            <div className='container'>

                <div className='logreg-box'>
                    <div className='form-box login'>
                        <form action="#">
                            <h2 >
                                Registrate
                            </h2>

                            <div className='input-box'>
                                <span className='icon'><i class='bx bxs-envelope' ></i></span>
                                <input type="text" required />
                                <label>Nombres</label>

                            </div>
                            
                            <div className='input-box'>
                                <span className='icon'><i class='bx bxs-envelope' ></i></span>
                                <input type="text" required />
                                <label>Apellidos</label>

                            </div>
                            
                            <div className='input-box'>
                                <span className='icon'><i class='bx bxs-envelope' ></i></span>
                                <input type="date" required />
                                <label>Fecha de nacimiento</label>
                            </div>
                            
                            <div className='input-box'>
                                <span className='icon'><i class='bx bxs-envelope' ></i></span>
                                <input type="text" required />
                                <label>Cargo</label>

                            </div>
                            

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

                            <button type='submit' className='btn'>
                                Registrarse
                            </button>

                            <div className='login-register'>
                                <p>
                                    Registrate, es fácil y rápido 
                                </p>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Registro;
