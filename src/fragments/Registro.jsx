import React from 'react';
import '../css/ricardostyle.css';
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router';
import { GuardarPersona} from '../hooks/Conexion';
import mensajes from '../utiles/Mensajes';
import { getToken } from '../utiles/SessionUtil';


const Registro = () => {
    
    const navegation = useNavigate();
    const {register,
        handleSubmit,
        formState:{errors},
        watch,
        setValue 
        } = useForm();
   // console.log(errors)

    const onSubmit= handleSubmit((data) => {
    //Aqui se agrega la logica para poder enviar los datos al backend     
       //console.log(data)
       // alert('enviado datos....');
        setValue("nombre", "");
        setValue("apellido", "");
        setValue("cargo", "");
        setValue("confirmaContraseña", "");
        setValue("contraseña", "");
        setValue("email", "");
        setValue("institucion", "");
        setValue("nacimiento", "");

        var datos = {
            "nombre": data.nombre,
            "apellido": data.apellido,
            "cargo": data.cargo,
            "contraseña": data.contraseña,
            "email": data.email,
            "institucion": data.institucion,
            "nacimiento": data.nacimiento,
        };
        GuardarPersona(getToken(), datos).then((info) => {
            if (info.code !== 200) {
                console.log(info.code)
                console.log("Entro a !== 200")
                mensajes(info.message, 'error', 'Error');
            } else {
                console.log(info)
                mensajes(info.message);
                navegation('/login');
            }
        })


    })

return (
<body>
    <header>
        <nav>
            <ul>
                <a style={{float: 'left', textDecoration: 'none'}} href="url">Home</a>
                <a style={{float: 'left', textDecoration: 'none'}} href="url">Sobre API</a>
                <a style={{float: 'left', textDecoration: 'none'}} href="url">Contactanos</a>
                <a style={{float: 'left', textDecoration: 'none'}} href="url">Ayuda</a>
            </ul>
        </nav>
    </header>
    <div className="container">
        <form onSubmit = {onSubmit}> 
            <h1 className="tituloRegistro">REGISTRATE</h1>
            <div className="row">

                {/*NOMBRES DEL USUARIO*/}    
                <div className="col">
                    <label htmlFor="fname">Nombres:</label>
                    <input  class="name" name='nombre' type="text" id="nombre" placeholder="Nombre" 
                    {...register("nombre", {
                        required:{
                            value: true,
                            message: "Nombres son requeridos"
                        },
                        minLength:{
                            value: 5,
                            message: "Este campo debe tener un mínimo de 5 caracteres"     
                        },
                        maxLength:{
                            value: 25,
                            message: "Este campo debe tener un máximo de 25 caracteres"
                        },
                     })}  />
                    {
                        errors.nombre && 
                        <span>{errors.nombre.message}</span>
                    }
                </div>
                {/*APELLIDOS DEL USUARIO*/} 
                <div className="col">
                    <label htmlFor="lname">Apellidos:</label>
                    <input class="lastname" name='apellido' type="text" id="apellido" placeholder="Apellido" {...register("apellido" , {
                        required:{
                            value: true,
                            message: "Apellidos son requeridos"
                        },
                        minLength:{
                            value: 5,
                            message: "Este campo debe tener un mínimo de 5 caracteres"     
                        },
                        maxLength:{
                            value: 25,
                            message: "Este campo debe tener un máximo de 25 caracteres"
                        },
                     })} />
                    {
                        errors.apellido && 
                        <span>{errors.apellido.message}</span>
                    }
                </div>
            </div>

            <div className="row">
                {/*EMAIL DEL USUARIO*/}
                <div className="col">
                    <label htmlFor="email">Email:</label>
                    <input  class="correo" type="email" id="email" name='email' placeholder="ejemplo@gmail.com" {...register("email" , {
                        required:{
                            value: true,
                            message: "Correo es requerido"
                        },
                        pattern:{
                            value: /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/,
                            message: "Correo no válido"
                        }   
                     } )} />
                    {
                        errors.email && 
                        <span>{errors.email.message}</span>
                    }
                </div>

                {/*FECHA DE NACIMIENTO DEL USUARIO*/}
                <div className="col">
                    <label htmlFor="date">Fecha de nacimiento:</label>
                    <input class="fechanac"  type="text" name='nacimiento' id='nacimiento' placeholder="dd-mm-aaaa" {...register("nacimiento",{
                        required:{
                            value: true,
                            message: "Fecha de nacimiento requerida"
                        },
                        validate: (value) =>{
                            const fechaNacimiento = new Date(value);
                            const fechaActual = new Date();
                            const edad=
                            fechaActual.getFullYear()- fechaNacimiento.getFullYear();
                            return edad >= 15 || "Debe ser mayor de 15 años" 
                        }
                    } )}/>
                    {
                        errors.nacimiento  && <span>{errors.nacimiento.message}</span>
                    }
                </div>
            </div>
            <div className="row">
                {/*INSTITUCION DE PROCEDENCIA DEL USUARIO*/}
                <div className="col">
                    <label htmlFor="institucion">Institución:</label>
                    <select className="institucion" name='institucion' id="institucion" {...register("institucion")} required>
                        <option value="">Seleccione una opción...</option>
                        <option value="UNL">Universidad Nacional de Loja</option>
                        <option value="UTPL">Universidad Técnica Particular de Loja</option>
                        <option value="UIDE">Universidad Internacional del Ecuador</option>
                        <option value="otro">Otro</option>s
                    </select>
                    {watch("institucion") === "otro" && (
                        <>
                            <input type="text"
                            placeholder='Ingrese institución'
                            {...register("otraInstitucion", {
                            required: {
                                value: true,
                                message: "Institución es requerida",
                            },     
                            })}
                              
                            />
                            {errors.otraInstitucion && <span>{errors.otraInstitucion.message}</span> }
                        </>
                        )
                    }
                    

                
                </div>
                {/*CARGO DEL USUARIO*/}
                <div className="col">
                    <label htmlFor="cargo">Cargo:</label>
                    <select className="cargo" name='cargo' id="cargo" {...register("cargo")} required >

                        <option value="">Selecciona una opción...</option>
                        <option value="TEACHER">Docente</option>
                        <option value="STUDENT">Estudiante</option>
                        <option value="otro">Otro</option>

                    </select>
                    {watch("cargo") === "otro" && (
                        <>
                            <input type="text"
                            placeholder='Ingrese cargo'
                            {...register("otroCargo", {
                            required: {
                                value: true,
                                message: "Ingrese su cargo porfavor!",
                            },     

                            })}
                            
                            />
                            {errors.otroCargo && <span>{errors.otroCargo.message}</span> }
                        
                        </>


                        )
                    }
                </div>
            </div>
             {/*PASSWORD*/}
            <div className="row">
                <div className="col">
                    <label htmlFor="password">Contraseña:</label>
                    <input className="pass" type="password" name='contraseña' id="contraseña" placeholder="xxxxx" {...register("contraseña" , {
                        required:{
                            value: true,
                            message: "Contraseña es requerida"
                        },
                        minLength:{
                            value: 6,
                            message: "La contraseña debe tener al menos 6 caracteres"

                        }
                     })} />
                    {
                        errors.contraseña  && <span>{errors.contraseña.message}</span>
                    }
                </div>
            {/* CONFIRM PASSWORD*/}
                <div className="col">
                    <label htmlFor="confirm-password">Confirmar contraseña:</label>
                    <input className="passcon" type="password" id="confirm-password" placeholder="xxxxx" {...register("confirmaContraseña" , {
                        required:{
                            value: true,
                            message: "Porfavor confirme su contraseña",
                        },
                        validate: value => value === watch ('contraseña') || 'las contraseñas no coinciden'
                     })} />
                    {
                        errors.confirmaContraseña  && <span>{errors.confirmaContraseña.message}</span>
                    }
                </div>
            </div>
            <div style={{textAlign: 'center'}}>
                <button type='submit' className="botonDeRegistro" >Registrarse</button>
            </div>
            <p>
                Registrate, es fácil y rápido!
            </p>
        </form>
    </div>
</body>
        
    );
};
export default Registro;