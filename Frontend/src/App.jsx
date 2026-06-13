import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Contributions from "./pages/Contributions";
import Loans from "./pages/Loans";
import AddMember from "./pages/AddMember";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={<Login onLogin={() => setIsAuthenticated(true)} />} 
        />

        {/* Protected Dashboard Routes */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? <Dashboard onLogout={() => setIsAuthenticated(false)} /> : <Navigate to="/login" />
          }
        >
          {/* These nested routes render inside the Dashboard */}
        <Route index element={<Navigate to="contributions" />} />
          <Route path="contributions" element={<Contributions />} />
          <Route path="add-member" element={<AddMember />} />
          <Route path="members" element={<Members />} />
          <Route path="loans" element={<Loans />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
