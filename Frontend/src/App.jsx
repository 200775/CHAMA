import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Contributions from "./pages/Contributions";
import Loans from "./pages/Loans";
import AddMember from "./pages/AddMember";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('chama_token') ? true : false;
  });

  const handleLogout = () => {
    localStorage.removeItem('chama_token');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? <Navigate to="/dashboard/contributions" /> : <Login onLogin={() => setIsAuthenticated(true)} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />
          }
        >
          <Route index element={<Navigate to="contributions" replace />} />
          <Route path="contributions" element={<Contributions />} />
          <Route path="add-member" element={<AddMember />} />
          <Route path="members" element={<Members />} />
          <Route path="loans" element={<Loans />} />
        </Route>
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard/contributions" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}