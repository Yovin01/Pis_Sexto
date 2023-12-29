import React, { useState } from 'react';
import '../css/yovinstyle.css'; // Archivo de estilos CSS

const VerPeticion = () => {
    const [peticiones, setPeticiones] = useState([
        { id: 1, nombre: 'Usuario 1', empresa: 'Empresa A', peticion: 'Petición 1' },
        { id: 2, nombre: 'Usuario 2', empresa: 'Empresa B', peticion: 'Petición 2' },
        // Agrega más datos según sea necesario
    ]);

    const PeticionCard = ({ id, nombre, empresa, peticion }) => {
        const [abierto, setAbierto] = useState(false);

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
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="contenedor">
            <h1>Listado de Peticiones</h1>
            {peticiones.map((peticion) => (
                <PeticionCard key={peticion.id} {...peticion} />
            ))}
        </div>
    );
};

export default VerPeticion;
