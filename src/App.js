import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from './fragments/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>

    </div>
  );
}

export default App;
