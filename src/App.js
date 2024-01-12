import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Data from './components/data/Data';
import Login from './components/login/Login';
import Register from './components/register/Register';
import PrivateRoute from './components/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './redux/authSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  if (token) {
    dispatch(login(token));
  }
  const loginToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!loginToken) {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <PrivateRoute>
            <Data />
          </PrivateRoute>
        } />
      </Routes>
    </div>
  );
}

export default App;