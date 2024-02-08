import React from 'react';
import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from './fragments/Login';
import VerPeticion from './fragments/VerPeticion';
import Principal from './fragments/Principal';
import Api from './fragments/Api';
import PrincipalUsuario from './fragments/PrincipalUsuario';
import UsuariosRegistrados from './fragments/UsuariosRegistrados';
import Perfil from './fragments/Perfil';
import Contactos from './fragments/Contactos';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/verpeticiones' element={<VerPeticion />} />
        <Route path='/principalusuario' element={<PrincipalUsuario />} />

        <Route path='/principal' element={<Principal />} />
        <Route path='/api' element={<Api />} />
        <Route path='/usuariosregistrados' element={<UsuariosRegistrados />} />
        <Route path='/perfil' element={<Perfil />} />
        <Route path='/contactos' element={<Contactos />} />
      </Routes>

    </div>
  );
}

export default App;
