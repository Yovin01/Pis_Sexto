import React, { useState } from 'react';
import '../css/yovinstyle.css';
import Footer from './Footer';
import Header from './Header';
import mensajes from '../utiles/mensajes';
import { metodoGet } from '../hooks/Conexion';
const VerPeticion = () => {
    const [peticiones, setPeticiones] = useState([]);
    const [bucle, setBucle] = useState(false);
    if (!bucle) {
        //getMateria
        metodoGet("/listar/peticiones", "null", "null").then((info) => {
            console.log(info);
            if (info.code !== 200 && (info.msg === "No existe token" || info.msg === "Token no valido")) {
                mensajes(info.msg);
            } else {
                /** var datos = {
                     "correo": info.info.cuentum.correo,
                     "peticion": info.info.peticion,
                     "nombre": info.info.cuentum.persona.nombres+" "+ info.info.cuentum.persona.apellidos,
                     "external_id": info.info.external_id,
                     "fecha":info.info.createdAt
                 }; */
                //   console.log(datos);
                setBucle(true);
                setPeticiones(info.info);
            }
        })

    }


    const PeticionCard = ({ id, peticion, external_id, createdAt, cuentum }) => {
        const [abierto, setAbierto] = useState(false);
        const { correo, persona } = cuentum;
        const { nombres, apellidos, institucion } = persona;
        const handleAceptar = () => {
            // Lógica para aceptar la petición
            console.log(`Aceptar petición con ID: ${id}`);
        };

        const handleRechazar = () => {
            // Lógica para rechazar la petición y eliminarla del estado
            setPeticiones((prevPeticiones) =>
                prevPeticiones.filter((p) => p.id !== id)
            );
            console.log(`Rechazar petición con ID: ${id}`);
        };

        return (
            <div className="users-container">
                <div className={`peticion-card ${abierto ? 'abierto' : ''}`}
                    onClick={() => setAbierto(!abierto)} >
                    <h2>{nombres + " " + apellidos}</h2>
                    <p>{correo}</p>
                    <p>{institucion}</p>
                    {abierto && (
                        <div>
                            <p>Petición: {peticion}</p>
                            <div className="boton-container">
                                <div className="aceptar-boton">
                                    <button onClick={handleAceptar}>Aceptar</button>
                                </div>
                                <div className="rechazar-boton">
                                    <button onClick={handleRechazar}>Rechazar</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div>
            <Header />
            <div className='background'>
            </div>
            <div className="container1">
                <dir className="content">
                    <dir className="content">
                        <h1 className="titulo-peticiones">Listado de Peticiones</h1>

                        {peticiones.map((peticion) => (
                            <PeticionCard key={peticion.id} {...peticion} />
                        ))}
                    </dir>
                </dir>
            </div>
            <Footer />
        </div>
    );

};

export default VerPeticion;
