import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './fragments/Login';
import VerPeticion from './fragments/VerPeticion';
import Principal from './fragments/Principal';
import Api from './fragments/Api';
import PrincipalUsuario from './fragments/PrincipalUsuario';
import UsuariosRegistrados from './fragments/UsuariosRegistrados';
import Perfil from './fragments/Perfil';
import Contactos from './fragments/Contactos';
import SobreApi from './fragments/SobreApi';
import Registro from './fragments/Registro';
import { estaSesion, getRol } from './utiles/SessionUtil';


function App() {

  const MiddewareSesion = ({ children }) => {
    const autenticado = estaSesion();
    if (autenticado) {
      return children
    } else {
      return <Navigate to='/principal' />;
    }
  }

  const MiddewareRol = ({ children}) => {
    const rol = getRol();
    if (rol === "ADMINISTRADOR") {
      return children
    }else{
      return <Navigate to= "/login"/>
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/verpeticiones' element={<MiddewareRol><MiddewareSesion><VerPeticion /></MiddewareSesion></MiddewareRol>} />
        <Route path='/principalusuario' element={<MiddewareSesion><PrincipalUsuario /></MiddewareSesion>} />

        {/* Ruta para cualquier URL no definida */}
        <Route path='*' element={<MiddewareSesion><Navigate to='/principalusuario' /></MiddewareSesion>} />

        {/* Ruta para cualquier URL no definida cuando el usuario no está autenticado */}
        <Route path='*' element={<Navigate to='/' />} />


        <Route path='/principal' element={<Principal />} />
        <Route path='/api' element={<MiddewareSesion><Api /></MiddewareSesion>} />
        <Route path='/usuariosregistrados' element={<MiddewareRol><MiddewareSesion><UsuariosRegistrados /></MiddewareSesion></MiddewareRol>} />
        <Route path='/perfil' element={<MiddewareSesion><Perfil /></MiddewareSesion>} />
        <Route path='/contactos' element={<Contactos />} />
        <Route path='/sobreapi' element={<SobreApi />} />
        <Route path='/registro' element={<Registro />} />
      </Routes>
    </div>
  );
}

export default App;
