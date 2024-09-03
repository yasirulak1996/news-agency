import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Localnews from './pages/Localnews';
import Foreginnews from './pages/Foreginnews';
import Login from './pages/Login';

import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Localnews" element={<Localnews />} />
        <Route path="/Foreginnews" element={<Foreginnews />} />
        <Route path="/Login" element={<Login />} />

       
      </Routes>
    </Router>
  );
}

export default App;
