import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardOverview from "./pages/DashboardOverview";
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
            isAuthenticated ? <Navigate to="/dashboardOverview" /> : <Login onLogin={() => setIsAuthenticated(true)} />
          } 
        />
        <Route 
          path="/dashboardOverview" 
          element={
            isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />
          }
        >
          <Route index element={<DashboardOverview />} />
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="contributions" element={<Contributions />} />
          <Route path="add-member" element={<AddMember />} />
          <Route path="members" element={<Members />} />
          <Route path="loans" element={<Loans />} />
        </Route>
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboardOverview" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}
