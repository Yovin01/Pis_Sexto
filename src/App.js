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
  );
}

export default App;
