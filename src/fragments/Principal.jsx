import React from 'react';
import '../css/garystyle.css';

import imagen1 from '../Recursos/Imagenes/listados.jpg';
import imagen2 from '../Recursos/Imagenes/vacio.png';
import imagen3 from '../Recursos/Imagenes/4_1.png';
import imagen4 from '../Recursos/Imagenes/4_3.png';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; 

const Principal = () => {

  useEffect(() => {
    // Coordenadas del mapa
    var map = L.map('map').setView([-4.0079, -79.2115], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  }, []);
  
  return (
    <div className="container-fluid">
      {/* cabecera de la pagina */}
     
    

      {/* Barra de informacion de la estacion seleccionada */}
      <div className="row">

      <div className="est_etiquetasNormalesBlancas18">
      [ UNIVERSIDAD NACIONAL DE LOJA ] --- [ ECUADOR - LOJA  ]
    </div>
     
      </div>

      <br />

      <div className="row">
        <div className="col-xs-12 col-sm-7 col-md-8 col-lg-9">
          <div className="row">
            {/* contenedoor del dato de indice UV */}
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-4">
              
              <div className="panel panel-default" style={{ height: 350 }}>
                <div className="panel-heading text-center">Precauciones a tener</div>

                <div className="panel-body">
                 <p>RECOMENDACIÓN:</p>
                 <img src={imagen1} alt="test" height={40} />
                 
                 <p>Mantengase a la sombra durante las horas centrales del dia Pongase camiseta, crema de proteccion solar y sombrero</p>
              </div>

                
              </div>

              <div className="panel panel-default" style={{ height: 130 }}>
                <div className="panel-heading text-center">Login históricos</div>
                <div className="panel-body">
                  <div className="row">
                    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                      <div className="row form-group">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <input style={{ height: 20, width: "100%" }} className="est_etqPequenias2" type="text" id="txt_usuario" placeholder="Usuario:" />
                        </div>
                      </div>
                      <div className="row form-group">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <input style={{ height: 20, width: "100%" }} className="est_etqPequenias2" type="password" id="txt_password" placeholder="Password:" />
                        </div>
                      </div>
                      
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>


            {/* contenedoor del mapa */}
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-8">
              <div className="panel panel-default" style={{ height: 500 }}>
                <div className="panel-heading text-center">Ubicación Geográfica</div>
                <div id="map" className="est_divContenedorGoogleMpas" style={{ height: 400 }}/>
              </div>
            </div>
          </div>
          {/* Histograma de indice UV */}
          <div className="row">
            <div className="col-xs-12">
              <div className="panel panel-default" style={{ height: 350 }}>
                <div className="panel-heading text-center">Grafico Histograma</div>
                 
              </div>
            </div>
          </div>
          {/* Datos historicos del indice UV */}
          <div className="row">
            <div className="col-xs-12">
              <div className="panel panel-default" style={{ height: 250 }}>
                <div className="panel-heading text-center">Datos Históricos</div>
                 
              </div>
            </div>
          </div>
        </div>
        {/* contenedoor de la barra lateral derecha */}
        <div className="col-xs-12 col-sm-5 col-md-4 col-lg-3">
          <div className="panel panel-default">
            <div className="panel-heading est_etqTitulo text-center">Simbología general</div>
            <br />
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover table-condensed" style={{ width: "95%" }} align="center">
                <tbody>
                  <tr className="active">
                    <th className="text-center" colSpan={3}>Categorías de exposición</th>
                  </tr>
                  
                  <tr className="active">
                    <th className="text-center">Categoria</th>
                    <th className="text-center">Valores</th>
                    
                  </tr>
                  <tr className="text-center">
                    <td>Baja</td>
                    <td>&lt; 2</td>
                   
                  </tr>
                  <tr className="text-center">
                    <td>Moderada</td>
                    <td>3 - 5</td>
                   
                  </tr>
                  <tr className="text-center">
                    <td>Alta</td>
                    <td>6 - 7</td>
                   
                  </tr>
                  <tr className="text-center">
                    <td>Muy alta</td>
                    <td>8 - 10</td>
                    
                  </tr>
                  <tr className="text-center">
                    <td>Extremadamente alta</td>
                    <td>11 +</td>
                   
                  </tr>
                </tbody>
              </table>
            </div>
            <br />
            <div className="table-responsive">
              <table className="table table-striped table-bordered table-hover table-condensed" style={{ width: "95%" }} align="center">
                <tbody>
                  <tr className="active">
                    <th className="text-center" colSpan={2}>Tabla de recomendaciones</th>
                  </tr>
                  
                  <tr className="active">
                    <th className="text-center" colSpan={2}>Indice [ 1 - 2 ]</th>
                  </tr>
                  <tr className="text-center">
                    <td>
                    <img src={imagen2} alt="test" height={40} />
                    </td>
                    <td>Puede permanecer en el exterior sin riesgos.</td>
                  </tr>
                  {/*<tr ><td colspan="2" >&nbsp;</td></tr>*/}
                  <tr className="active">
                    <th colSpan={2} className="text-center">Indice [ 3 - 7 ]</th>
                  </tr>
                  <tr className="text-center">
                    <td>
                    <img src={imagen3} alt="test" height={40} />
                    </td>
                    <td>Pongase camisa, crema de proteccion solar, sombrero y gafas de sol</td>
                  </tr>
                  {/*<tr ><td colspan="2" >&nbsp;</td></tr>*/}
                  <tr className="active">
                    <th colSpan={2} className="text-center">Indice [ 8+ ]</th>
                  </tr>
                  <tr className="text-center">
                    <td>
                    <img src={imagen3} alt="test" height={40} />
                    </td>
                    <td rowSpan={2}>Son imprescindibles camisa, crema de proteccion solar, sombrero y gafas de sol</td>
                  </tr>
                  <tr className="text-center">
                    <td>
                    <img src={imagen4} alt="test" height={40} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    </div>
  );
};

export default Principal;

