import React, { useState } from 'react';
import '../css/yovinstyle.css'; // Archivo de estilos CSS
import Footer from './Footer';
import Header from './Header';

const VerPeticion = () => {
    const [peticiones, setPeticiones] = useState([
        { id: 1, nombre: 'Usuario 1', empresa: 'Empresa A', peticion: 'Petición 1' },
        { id: 2, nombre: 'Usuario 2', empresa: 'Empresa B', peticion: 'Petición 2' },
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
            <div
                className={`peticion-card ${abierto ? 'abierto' : ''}`}
                onClick={() => setAbierto(!abierto)}
            >
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
        );
    };

    return (
        <div>
        
            <div className="contenedor1">
                <div>
                    <h1>Listado de Peticiones</h1>
                </div>
                {peticiones.map((peticion) => (
                    <PeticionCard key={peticion.id} {...peticion} />
                ))}
            </div>
            <Footer />
        </div>
    );
    
};

export default VerPeticion;
