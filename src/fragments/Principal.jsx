import React, { useState } from 'react';
import '../css/garystyle.css';
import '../css/apiStyle.css';
import Header from './Header';
import _ from 'lodash';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Grafica from './Grafica';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import customMarkerImage from '../img/puntoUbi/map-pin3.png';
import ChatBot from './ChatBot';
import { getUVD, getUVP } from '../utiles/ides';
import mensajes from '../utiles/Mensajes';
import { getAPI, postAPI } from '../hooks/Conexion';
import BarraMenu from './BarraMenu';
import { getRol, getToken} from '../utiles/SessionUtil';

const Principal = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const [pdispos, setPdispos] = useState([]);
  const [pDisp, setPDispo] = useState([]);
  const [bucle, setBucle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    // Comprueba si hay un token de autenticación almacenado en el almacenamiento local
    const token = getToken();

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  

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
  // Función para determinar las recomendaciones basadas en la medida (getUVP)
const cards = () => {
  const measure = getUVP(); // Obtener el valor de medida adecuado, puedes ajustarlo según tu lógica

  if (measure >= 0.0 && measure < 3.0) {
    return (
      <div>
        <h5>Necesita protección mínima</h5>
        <p>Riesgo: Bajo</p>
        <h5>Use gafas con filtro UV</h5>
        <p>Riesgo: Bajo</p>
      </div>
    );
  } else if (measure >= 3.0 && measure < 6.0) {
    return (
      <div>
        <h5>Use gorra o sombrero</h5>
        <p>Riesgo: Moderado</p>
        <h5>Use gafas con filtro UV</h5>
        <p>Riesgo: Moderado</p>
        <h5>Utilice crema con filtro solar</h5>
        <p>Riesgo: Moderado</p>
      </div>
    );
  } else if (measure >= 6.0 && measure < 8.0) {
    return (
      <div>
        <h5>Use gorra o sombrero</h5>
        <p>Riesgo: Alto</p>
        <h5>Use gafas con filtro UV</h5>
        <p>Riesgo: Alto</p>
        <h5>Utilice crema con filtro solar</h5>
        <p>Riesgo: Alto</p>
      </div>
    );
  } else if (measure >= 8.0 && measure < 11.0) {
    return (
      <div>
        <h5>Use gorra o sombrero</h5>
        <p>Riesgo: Muy Alto</p>
        <h5>Use gafas con filtro UV</h5>
        <p>Riesgo: Muy Alto</p>
        <h5>Utilice crema con filtro solar</h5>
        <p>Riesgo: Muy Alto</p>
        <h5>Procure no exponerse al sol</h5>
        <p>Riesgo: Muy Alto</p>
      </div>
    );
  } else if (measure >= 11.0 && measure <= 15.0) {
    return (
      <div>
        <h5>Evite la exposición al sol</h5>
        <p>Riesgo: Extremo</p>
        <h5>Utilice crema con filtro solar alto SPF 30+</h5>
        <p>Riesgo: Muy Alto</p>
      </div>
    );
  } else {
    return (
      <div>
        <h5>Lo sentimos presentamos algunos problemas...</h5>
      </div>
    );
  }
};



  return (
    <div>
      {isLoggedIn ? <BarraMenu /> : <Header />}
      <div className='backgroundGary'></div>
      <div className="containerGary">

        <dir className="contentGary">
          <dir className="row"  >

            <div className="row">
              {/* contenedoor del dato de indice UV */}
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">

                <div className="panel panel-default" style={{ height: 350}}>
                  <div className="panel-heading text-center" >Indice UV promedio</div>

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
                  <div className="grid grid-cols-1 gap-6">
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      {pDisp.map((dispositivo) => (
                        <div className="flex gap-2 items-center">
                          <div  style={{ height: 70 }}>
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
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
                <div className="panel panel-default" style={{ height: 350 }}>
                  <div className="panel-heading text-center">Recomendaciones</div>
                  <div className="card">
  <div className="card-body">
    {cards()} {/* Aquí se integran las recomendaciones */}
  </div>
</div>

                </div>

              </div>
            
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
        <Slider {...settings}>
          {pDisp.map((dispositivo) => (
            <div key={dispositivo.dispositivoId}>
              <div className="panel panel-default" style={{ height: 350 }}>
                <div className="panel-heading text-center"> {dispositivo.nombre}</div>
                {/* Pasa el dispositivoId como prop a Grafica */}
                <Grafica dispositivoId={dispositivo.dispositivoId} />
              </div>
            </div>
          ))}
        </Slider>
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