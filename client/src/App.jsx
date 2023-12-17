import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { selectAuthState } from './redux/AuthSlice';
import NavbarComponent from './components/Navbar';
import NotesList from './pages/NotesList';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectAuthState);
  const isTokenValid = checkTokenValidity();
  return isAuthenticated && isTokenValid ? (
    children
  ) : (
    <Navigate to='/login' replace state={{ from: window.location.pathname }} />
  );
};

const checkTokenValidity = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  return decodedToken.exp * 1000 > Date.now();
};

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route
          path='/dashboard'
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/list'
          element={
            <ProtectedRoute>
              <NotesList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
