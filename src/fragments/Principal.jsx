import React, { useState } from 'react';
import '../css/garystyle.css';
import Header from './Header';
import _ from 'lodash';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Grafica from './Grafica';
import customMarkerImage from '../img/puntoUbi/map-pin3.png';
import ChatBot from './ChatBot';
import { getUVD, getUVP } from '../utiles/ides';
import mensajes from '../utiles/Mensajes';
import { getAPI, postAPI } from '../hooks/Conexion';
const Principal = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const [pdispos, setPdispos] = useState([]);
  const [pDisp, setPDispo] = useState([]);
  const [bucle, setBucle] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarMapa = async () => {
      // Coordenadas del mapa
      var map = L.map('map', { attributionControl: false }).setView([-4.0079, -79.2115], 14);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

      // Icono personalizado con imagen local
      var customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-container"><img src="${customMarkerImage}" alt="Marcador"></div>`
      });

      try {
        const info = await getAPI("null", '/listar');

        if (info.code !== 200 && (info.msg === "No existe token" || info.msg === "Token no valido")) {
          mensajes(info.msg);
        } else {
          console.log(info.dispositivos);
          setBucle(true);
          setDispositivos(info.dispositivos);
          // Marcadores
          info.dispositivos.forEach((dispositivo) => {
            var marker = L.marker([dispositivo.latitud, dispositivo.longitud], {
              icon: customIcon,
            }).addTo(map);

            marker.bindPopup(dispositivo.nombre).openPopup();
          });
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    const cargarDatos = async () => {
      try {
        const obtenerFechaHoyEcuador = () => {
          const fechaHoy = new Date();
          fechaHoy.setUTCHours(fechaHoy.getUTCHours() - 5); // Restar 5 horas para ajustar a GMT-5 (Ecuador)
          return fechaHoy.toISOString().split('T')[0];
        };

        const obtenerFechaMananaEcuador = () => {
          const fechaManana = new Date();
          fechaManana.setDate(fechaManana.getDate() + 1); // Sumar 1 día para obtener mañana
          fechaManana.setUTCHours(fechaManana.getUTCHours() - 5); // Restar 5 horas para ajustar a GMT-5 (Ecuador)
          return fechaManana.toISOString().split('T')[0];
        };

        const data = {
          'fechaInicio': obtenerFechaHoyEcuador(),
          'fechaFin': obtenerFechaMananaEcuador()
        };

        const [mediciones, info] = await Promise.all([
          postAPI(data, "medicionFechas", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJCQUNLRU5EIiwiaWF0IjoxNzA3MDc2NzkyfQ.xT3uhWgUbCsCFmPepyiGQOUIsdzetlfgrHvdGqKr-Iw"),
          getAPI("null", '/listar')
        ]);

        if (info.code !== 200 && (info.msg === "No existe token" || info.msg === "Token no valido")) {
          mensajes(info.msg);
        } else {

          const dispositivosConId = info.dispositivos.map((dispositivo, index) => ({
            ...dispositivo,
            id: index + 1, // Asumiendo que los índices comienzan desde 0, puedes ajustarlo según tus necesidades
          }));
          setDispositivos(dispositivosConId);
          const medicionesConNombres = mediciones.mediciones.map(medicion => {
            const dispositivo = dispositivosConId.find(d => d.id === medicion.dispositivoId);
            const nombre = dispositivo ? dispositivo.nombre : 'Sin Nombre'; // Puedes cambiar el valor predeterminado según tu necesidad
            return {
              ...medicion,
              nombre,
            };
          });

          const medicionesPorDispositivo = _.groupBy(medicionesConNombres, 'dispositivoId');
          const promediosPorDispositivo = _.map(medicionesPorDispositivo, (mediciones, dispositivoId) => ({
            dispositivoId,
            promedioUV: _.meanBy(mediciones, 'uv'),
            nombre: mediciones[0].nombre,
          }));
          await setPDispo(promediosPorDispositivo);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    cargarMapa();
    cargarDatos();
  }, []);

  const getColorByUVValue = (uvValue) => {
    if (uvValue >= 0 && uvValue <= 3) {
      return 'bg-success'; // Verde
    } else if (uvValue > 3 && uvValue <= 6) {
      return 'bg-warning'; // Amarillo
    } else if (uvValue > 6 && uvValue <= 8) {
      return 'bg-warning'; // Naranja
    } else if (uvValue > 8 && uvValue <= 11) {
      return 'bg-danger'; // Rojo
    } else {
      return 'bg-danger'; // Morado para valores mayores a 11
    }
  };


  return (
    <div>
      <Header />
      <div className='backgroundGary'></div>
      <div className="containerGary">

        <dir className="contentGary">
          <dir className="row"  >

            <div className="row">
              {/* contenedoor del dato de indice UV */}
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">

                <div className="panel panel-default" style={{ height: 350 }}>
                  <div className="panel-heading text-center">Indice UV promedio</div>

                  <div className="card">
                    <h5 className="card-header">Indice UV promedio del dia</h5>
                    <ul className="list-unstyled card-body mb-0 pb-0">
                      <li className="row mb-3">
                        <div className="progress mb-3">
                          <div className={`progress-bar ${getColorByUVValue(getUVP())}`} role="progressbar" style={{ width: `${getUVP() * 100 / 15}%` }} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"> {Math.round((getUVP()) * 100) / 100}</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="row">
                    <div className='row'>
                      {pDisp.map((dispositivo) => (
                        <div className='col-xs-12 col-sm-12 col-md-12 col-lg-6 mb-2'>
                          <div className="panel panel-default " style={{ height: 70 }}>
                            <div className="card">
                              <ul className="list-unstyled card-body mb-2 pb-2">
                                <li key={dispositivo.dispositivoId} className="row mb-3">
                                  <h5 className="card-header" style={{ maxHeight: '2em', overflow: 'auto' }}>{dispositivo.nombre}</h5>
                                  <div className="col-6">{Math.round((dispositivo.promedioUV) * 100) / 100}</div>
                                  <div className="col-7 align-self-center">
                                    <div className="progress" style={{ height: '5px' }}>
                                      <div
                                        className={`progress-bar ${getColorByUVValue(dispositivo.promedioUV)}`}
                                        role="progressbar"
                                        style={{ width: `${dispositivo.promedioUV * 100 / 15}%` }}
                                        aria-valuenow="15"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                      ></div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* contenedoor del mapa */}
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
                <div className="panel panel-default" style={{ height: 450 }}>
                  <div className="panel-heading text-center">Ubicación Geográfica</div>
                  <div id="map" className="est_divContenedorGoogleMpas" style={{ height: 395 }} />
                </div>
              </div>
            </div>
            {/* Histograma de indice UV */}
            <div className="row">
              <div className="col-xs-12">
                <div className="panel panel-default" style={{ height: 350 }}>
                  <div className="panel-heading text-center">Grafico Histograma</div>
                  <Grafica />
                </div>

              </div>
            </div>
          </dir>
          <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        </dir>

      </div>
      <ChatBot />

    </div>

  );
};

export default Principal;

