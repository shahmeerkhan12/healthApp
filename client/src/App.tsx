import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HealthRecords from './pages/HealthRecords';
import Activities from './pages/Activities';
import DietPlans from './pages/DietPlans';
import Layout from './components/Layout';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="health" element={<HealthRecords />} />
            <Route path="activities" element={<Activities />} />
            <Route path="diet" element={<DietPlans />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
