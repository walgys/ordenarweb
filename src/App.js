import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import { useEffect, useState } from 'react';
import { auth } from './global/fb';
import { CartContextProvider } from './context/EcommerceContext';
import { AppContext } from './context/AppContext';
import TopBar from './components/TopBar';
import BottomBar from './components/BottomBar';
import { Container } from '@mui/system';
import { Alert, Paper, Snackbar } from '@mui/material';
import { colors } from './global/styles';
import Register from './pages/Register';
import { updateCreateAccount } from './global/data';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackText, setSnackText] = useState('')
  const [snackType, setSnackType] = useState('error')
  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setReady(true);
      } else {
        setUser(null);
        setReady(true);
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <AppContext.Provider value={{ user, setSnackText, handleClick, setSnackType }}>
        <CartContextProvider>
          <div
            style={{
              width: '100vw',
              height: '100vh',
              justifyContent: 'center',
              display: 'flex',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'space-between',
                height: '100%',
                width: '100%',
                maxWidth: '1200px',
                borderLeft: '1px solid gainsboro',
                borderRight: '1px solid gainsboro',
                backgroundColor: 'white'
              }}
            >
              {user && <TopBar />}
              {ready && (
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute user={user}>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/home"
                    element={
                      <ProtectedRoute user={user}>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/orders"
                    element={
                      <ProtectedRoute user={user}>
                        <Orders />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/account"
                    element={
                      <ProtectedRoute user={user}>
                        <Account />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute user={user}>
                        <Checkout />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                        <Register />
                    }
                  />
                </Routes>
              )}
              {user && <BottomBar />}
            </div>
          </div>
          <Snackbar open={open} autoHideDuration={6000} onClose={()=>setOpen(false)}>
        <Alert onClose={()=>setOpen(false)} severity={snackType} sx={{ width: '100%' }}>
          {snackText}
        </Alert>
      </Snackbar>
        </CartContextProvider>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
