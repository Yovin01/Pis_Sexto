import React from 'react';
import '../css/garystyle.css';
import Header from './Header';
import Footer from './Footer';
import imagen1 from '../Recursos/Imagenes/listados.jpg';
import ApexCharts from 'apexcharts'
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Grafica from './Grafica';
import customMarkerImage from '../img/puntoUbi/map-pin3.png';
import ChatBot from './ChatBot';
const Principal = () => {

  useEffect(() => {
    // Coordenadas del mapa
    var map = L.map('map', { attributionControl: false }).setView([-4.0079, -79.2115], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    // Icono personalizado con imagen local
    var customIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div class="marker-container"><img src="${customMarkerImage}" alt="Marcador"></div>`

    });

    // Marcador 1
    var marker1 = L.marker([-4.0079, -79.2115], {
      icon: customIcon,
    }).addTo(map);
    marker1.bindPopup('Nombre del Punto 1').openPopup();

    // Marcador 2
    var marker2 = L.marker([-4.0100, -79.2130], {
      icon: customIcon,
    }).addTo(map);
    marker2.bindPopup('Nombre del Punto 2').openPopup();
  }, []);

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
                  <div className="panel-heading text-center">Precauciones a tener</div>

                  <div className='row'>
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6">

                      <div className="panel panel-default" style={{ height: 350 }}>
                        <div className="panel-heading text-center">Precauciones a tener</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* contenedoor del mapa */}
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
                <div className="panel panel-default" style={{ height: 500 }}>
                  <div className="panel-heading text-center">Ubicación Geográfica</div>
                  <div id="map" className="est_divContenedorGoogleMpas" style={{ height: 400 }} />
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

