import React, { useState } from 'react';
import '../css/yovinstyle.css';
import Footer from './Footer';
import Header from './Header';

const VerPeticion = () => {
    const [peticiones, setPeticiones] = useState([
        { id: 1, nombre: 'Usuario 1', empresa: 'Empresa A', peticion: 'Petición 1' },
        { id: 2, nombre: 'Usuario 2', empresa: 'Empresa B', peticion: 'Petición 2' },
        { id: 3, nombre: 'Usuario 3', empresa: 'Empresa A', peticion: 'Petición 1' },
        { id: 4, nombre: 'Usuario 4', empresa: 'Empresa B', peticion: 'Petición 2' },
        { id: 5, nombre: 'Usuario 5', empresa: 'Empresa A', peticion: 'Petición 1' },
        { id: 6, nombre: 'Usuario 6', empresa: 'Empresa B', peticion: 'Petición 2' },
        { id: 7, nombre: 'Usuario 7', empresa: 'Empresa A', peticion: 'Petición 1' },
        { id: 8, nombre: 'Usuario 8', empresa: 'Empresa B', peticion: 'Petición 2' },
        // Agrega más datos según sea necesario
    ]);

    const PeticionCard = ({ id, nombre, empresa, peticion }) => {
        const [abierto, setAbierto] = useState(false);

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
                    <h2>{nombre}</h2>
                    <p>{empresa}</p>
                    {abierto && (
                        <div>
                            <p>ID: {id}</p>
                            <p>Petición: {peticion}</p>
                            <div>
                                <button onClick={handleAceptar}>Aceptar</button>
                                <button onClick={handleRechazar}>Rechazar</button>
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
