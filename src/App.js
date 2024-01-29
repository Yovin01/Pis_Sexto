import React from 'react';
import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from './fragments/Login';
import VerPeticion from './fragments/VerPeticion';
import Principal from './fragments/Principal';
import Api from './fragments/Api';
import Registro from './fragments/Registro';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/verpeticiones' element={<VerPeticion />} />

        <Route path='/principal' element={<Principal />} />
        <Route path='/api' element={<Api />} />
        <Route path='/registro' element={<Registro />} />

      </Routes>

    </div>
  );
}

export default App;
