<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registro from './fragments/Registro';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registro/>} />
      </Routes>
    </Router>
=======
import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import VerPeticion from './fragments/VerPeticion';
import Principal from './fragments/Principal';
import Api from './fragments/Api';


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/verpeticiones' element={<VerPeticion />} />

      <Route path='/principal' element={<Principal />} />
      <Route path='/api' element={<Api/>}/>
      </Routes>

    </div>
>>>>>>> c770f9704b20efacee9dfd09a5a447fca8f01c63
  );
}

export default App;
