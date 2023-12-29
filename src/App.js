import './App.css';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import VerPeticion from './fragments/VerPeticion';
import Principal from './fragments/Principal';


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/verpeticiones' element={<VerPeticion />} />

      <Route path='/principal' element={<Principal />} />
      </Routes>

    </div>
  );
}

export default App;
