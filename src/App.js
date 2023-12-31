<<<<<<< HEAD
import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from './fragments/Login';
=======
import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import VerPeticion from './fragments/VerPeticion';
import Principal from './fragments/Principal';
import Api from './fragments/Api';

>>>>>>> origin/main

function App() {
  return (
    <div className="App">
      <Routes>
<<<<<<< HEAD
        <Route path='/login' element={<Login />} />
=======
      <Route path='/verpeticiones' element={<VerPeticion />} />

      <Route path='/principal' element={<Principal />} />
      <Route path='/api' element={<Api/>}/>
>>>>>>> origin/main
      </Routes>

    </div>
  );
}

export default App;
