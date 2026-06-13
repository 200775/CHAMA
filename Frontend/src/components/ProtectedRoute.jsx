import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  // Replace this with your actual auth checking logic (e.g., checking localStorage for a JWT token)
  const isAuthenticated = localStorage.getItem('chama_token') !== null;

  return isAuthenticated ? <Outlet /> : <Navigate to="/Login" replace />;
}