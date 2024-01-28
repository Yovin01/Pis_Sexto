import React from 'react';
import '../css/hilarystyle.css';
import '../css/headerStyle.css';
import 'boxicons';
import logoIcon from '../LOGO_TRANSPARENTE.png';
import Header from './Header';
import { InicioSesion, obtener } from '../hooks/Conexion'
import { getRol, getToken, getUser, saveRol, saveToken, saveUser } from '../utiles/SessionUtil';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import mensajes from '../utiles/Mensajes';

const Login = () => {

    const navegation = useNavigate();
    const { register, formState: { errors }, handleSubmit} = useForm();

    const onSubmit = (data) => {
        var datos = {
            "correo": data.correo,
            "clave": data.clave
        };    

        InicioSesion(datos).then((info) => {
            
            var infoAux = info.info;
            if (info.code !== 200) {
                mensajes(info.msg, "error", "error")
            } else {
                saveToken(infoAux.token);
                saveRol(infoAux.rol);
                saveUser(infoAux.user);
                navegation("/PrincipalUsuario");
                mensajes(info.msg);
            }
        })
    };

    return (
        <div>
        
        <Header/>
            <div className='background'>

            </div>

            <div className='container1'>
                <div className='content'>
                    <h2 className='text'>API RADIACIÓN ULTRAVIOLETA</h2>
                    <div className='text-sci'>
                        <h2>Bienvenido! <br /> <span>A un enfoque más consciente de la exposición solar en Loja</span></h2>
                        <p> Nuestra plataforma ha sido diseñada pensando en personas que buscan acceder
                            a información valiosa sobre los niveles de radiación UV en fechas pasadas. Con nuestra API, ahora es
                            posible explorar y utilizar datos detallados de radiación UV históricos, esta proporcionará acceso a una fuente confiable y completa de información. </p>

                    </div>
                </div>

                <div className='logreg-box'>
                    <div className='form-box login'>
                        <div className='iconunl'>
                            <img src={logoIcon} alt="Logo UNL" />
                        </div>
                        <h2>Iniciar Sesión</h2>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='input-box'>
                                <span className='icon'><i className='bx bxs-envelope'></i></span>
                                <input type="email" required {...register('correo', { required: true, pattern: /^\S+@\S+$/ })} />
                                {errors.correo && errors.correo.type === 'required' && <div className='alert alert-danger'>Ingrese el correo</div>}
                                {errors.correo && errors.correo.type === 'pattern' && <div className='alert alert-danger'>Ingrese un correo valido</div>}
                                <label>Correo electrónico</label>
                            </div>

                            <div className='input-box'>
                                <span className='icon'><i className='bx bxs-lock-alt'></i></span>
                                <input type="password" required {...register('clave', { required: true })}  />
                                {errors.clave && errors.clave.type === 'required' && <div className='alert alert-danger'>Ingrese una clave</div>}
                                <label>Contraseña</label>
                            </div>

                            <button type='submit' className='btn1'>Ingresar</button>
                        </form>

                        <div className='login-register'>
                            <p>¿No tienes cuenta? <a href="#" className='register-link'>Regístrate</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;
