import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import EmployeeDashboard from './pages/Employee/EmployeeDashboard';
import ClientDashboard from './pages/Client/ClientDashboard';
import Messaging from './pages/Messaging/Messaging';
import Profile from './pages/Profile/Profile';
import { useAuth } from './context/AuthContext';

const DashboardRedirect = () => {
  const { user } = useAuth();
  const role = user?.role?.toUpperCase();
  if (role === 'ADMIN') return <Navigate to="/admin" />;
  if (role === 'EMPLOYEE') return <Navigate to="/employee" />;
  if (role === 'CLIENT') return <Navigate to="/client" />;
  return <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-primary)' }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />

            <Route path="/admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/messages" element={<ProtectedRoute allowedRoles={['ADMIN']}><Messaging /></ProtectedRoute>} />
            <Route path="/admin/profile" element={<ProtectedRoute allowedRoles={['ADMIN']}><Profile /></ProtectedRoute>} />

            <Route path="/employee" element={<ProtectedRoute allowedRoles={['EMPLOYEE']}><EmployeeDashboard /></ProtectedRoute>} />
            <Route path="/employee/messages" element={<ProtectedRoute allowedRoles={['EMPLOYEE']}><Messaging /></ProtectedRoute>} />
            <Route path="/employee/profile" element={<ProtectedRoute allowedRoles={['EMPLOYEE']}><Profile /></ProtectedRoute>} />

            <Route path="/client" element={<ProtectedRoute allowedRoles={['CLIENT']}><ClientDashboard /></ProtectedRoute>} />
            <Route path="/client/messages" element={<ProtectedRoute allowedRoles={['CLIENT']}><Messaging /></ProtectedRoute>} />
            <Route path="/client/profile" element={<ProtectedRoute allowedRoles={['CLIENT']}><Profile /></ProtectedRoute>} />

            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
