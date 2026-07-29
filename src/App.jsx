import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store';
import Dashboard from './Dashboard';
import Login from './Login';
import NewOrder from './NewOrder';
import Orders from './Orders';
import Inventory from './Inventory';
import Income from './Income';

function ProtectedRoute({ children }) {
  const user = useStore(state => state.user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <div className="background-overlay"></div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/new-order" element={<ProtectedRoute><NewOrder /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
          <Route path="/income" element={<ProtectedRoute><Income /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
