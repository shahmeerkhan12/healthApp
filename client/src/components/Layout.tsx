import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Layout.css';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="nav-brand">Health Monitor</div>
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/health">Health Records</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/diet">Diet Plans</Link>
        </div>
        <div className="nav-user">
          <span>Welcome, {user?.name}</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
