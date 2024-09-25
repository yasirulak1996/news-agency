import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Localnews from './pages/Localnews';
import Foreginnews from './pages/Foreginnews';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Sports from './pages/Sports';
import Political from './pages/Political';
import Contactus from './pages/Contactus';
import Privacypolicy from './pages/Privacypolicy';
import Termsofservice from './pages/Termsofservice';
import Aboutus from './pages/Aboutus';
import Gossip from './pages/Gossips';
import ItemDetail from './pages/ItemDetail'



import ProtectedRoute from './components/ProtectedRoute';



import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Localnews" element={<Localnews />} />
        <Route path="/Foreginnews" element={<Foreginnews />} />
       <Route path="/Login" element={<Login />} />
       <Route path="/Sports" element={<Sports />} />
       <Route path="/Political" element={<Political />} />
       <Route path="/Gossip" element={<Gossip />} />
       <Route path="/Contactus" element={<Contactus />} />
       <Route path="/Aboutus" element={<Aboutus />} />
       <Route path="/Privacypolicy" element={<Privacypolicy />} />
       <Route path="/Termsofservice" element={<Termsofservice />} />
       <Route path="/items/:id" element={<ItemDetail />} />
       <Route 
          path="/Dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

       
      </Routes>
    </Router>
  );
}

export default App;