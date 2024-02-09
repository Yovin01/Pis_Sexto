import React, { useEffect, useState } from 'react';
import React, { useEffect, useState } from 'react';
import '../css/joanstyle.css';
import '../css/apiStyle.css';
import '../css/apiStyle.css';
import Prism from 'prismjs';
import BarraMenu from './BarraMenu';
import Footer from './Footer';

import BarraMenu from './BarraMenu';
import Footer from './Footer';


const Api = () => {

  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [resultado, setResultado] = useState({});
  const [mensaje, setMensaje] = useState('');
  const [consolaActiva, setConsolaActiva] = useState('');

  // Función para manejar las peticiones POST y GET
  const ejecutarPeticion = (tipo, endpoint) => {
    const url = `https://computacion.unl.edu.ec/uv/api/${endpoint}`;
    let opciones = {};

    if (tipo === 'POST') {
      opciones = {
        method: tipo,
        headers: {
          'Content-Type': 'application/json',
          'x-api-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJCQUNLRU5EIiwiaWF0IjoxNzA3MzU0OTc5fQ.1t8MKkzaD9_ldyWdfsBFwcdM3mP05VtvU2-CurNX1Jk',
        },
        body: JSON.stringify({
          fechaInicio,
          fechaFin,
        }),
      };
    } else {
      opciones = {
        method: tipo,
      };
    }

    fetch(url, opciones)
      .then((response) => response.json())
      .then((data) => {
        setResultado({ ...resultado, [endpoint]: data });
        setMensaje("Petición ejecutada con éxito");
      })
      .catch((error) => {
        console.error('Error en la petición:', error);
        setMensaje("Error al ejecutar la petición");
      });

    setConsolaActiva(endpoint);
  };

  // Función para renderizar los resultados
  const renderizarResultados = () => {
    return Object.entries(resultado).map(([key, value]) => (
      <div key={key} className={`containerConsola ${consolaActiva === key ? 'active' : ''}`}>
        <pre className="language-javascript">
          <code className="language-javascript">
            {JSON.stringify(value, null, 2)}
          </code>
        </pre>
      </div>
    ));
  };


  return (
    <div>
      <BarraMenu />
      <div className='containerTitulos'>
        <h2 className="text-2xl mb-one">API de Radiación Ultravioleta</h2>
        <p>Ejecuta las peticiones, en consola o desde cualquier sitio:</p>
      </div>

      {/* Formulario para las fechas de las peticiones POST */}
      <div className='containerPeticionesPost'>
        <h2>
          PETICIONES POST
        </h2>
        <label className='fecha'>Fecha de inicio</label>
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          placeholder="Fecha de inicio"
          className="input"
        />


        <label className='fecha'>Fecha de fin</label>
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          placeholder="Fecha de fin"
          className="input"
        />

        <div className='medFecha'>
          <label className='titleFech'>
            Medición por fechas
          </label>
          <button onClick={() => ejecutarPeticion('POST', 'medicionFechas')} className="btn"><i class='bx bx-right-arrow'></i></button>
        </div>

        <div>
          <label htmlFor="">
            Medición por semana
            <button onClick={() => ejecutarPeticion('POST', 'medicionSemana')} className="btn"><i class='bx bx-right-arrow'></i></button>
          </label>
        </div>

        <div>
          <label htmlFor="">
            Medición por día
            <button onClick={() => ejecutarPeticion('POST', 'medicionDia')} className="btn"><i class='bx bx-right-arrow'></i></button>
          </label>
        </div>


      </div>



      {/* Botones para las peticiones GET */}
      <div className='containerPeticionesGet'>
        <h2>
          PETICIONES GET
        </h2>
        <div className='medProm'>
          <label>
            Medición promedio
          </label>
          <button onClick={() => ejecutarPeticion('GET', 'medicionPromedio')} className="btn"> <i class='bx bx-right-arrow'></i></button>
        </div>

        <div>
          <label>
            Medición por dispositivos
          </label>
          <button onClick={() => ejecutarPeticion('GET', 'medicionDispositivos')} className="btn"><i class='bx bx-right-arrow'></i></button>
        </div>

        <div>
          <label>
            Activos
          </label>
          <button onClick={() => ejecutarPeticion('GET', 'activos')} className="btn"><i class='bx bx-right-arrow'></i></button>
        </div>

        <div>
          <label>
            Listar dispositivos
          </label>
          <button onClick={() => ejecutarPeticion('GET', 'listar')} className="btn"><i class='bx bx-right-arrow'></i></button>
        </div>

      </div>

      {/* Contenedor para mensajes */}
      <div className='containerPeticiones'>
        {mensaje && <p id="run-message" className="message">{mensaje}</p>}
      </div>

      {/* Contenedores para mostrar los resultados de las peticiones */}
      {renderizarResultados()}

    </div>
  );
};


export default Api;