import React, { useContext, useEffect, useState } from 'react';
import { Button, Paper, TextField, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { colors } from '../global/styles';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../global/fb';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Image from 'mui-image';

const Login = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ready, setReady] = useState(false);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/home', { replace: true });
    }
    setReady(true);
  }, [user, navigate]);

  const doLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, userName, password);
      if (user) {
        //updateCreateAccount(user, {userId: user?.uid});
        /*dispatchSignedIn({
          type: actions.UPDATE_SIGN_IN,
          payload: { userToken: 'signed-in' },
        });*/
      }
    } catch (err) {
      console.log(err);
    }
  };

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  return (
    <>
      {ready && (
        <Paper
          elevation={2}
          style={{
            height: '60vh',
            marginTop: '10vh',
            padding: '5vh 0vh 5vh 0vh',
            backgroundColor: colors.buttons,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '5vh',
                margin: '50px',
                backgroundColor: 'white',
                height: '100%',
                borderRadius: '20px',
              }}
            >
              <div
                style={{
                  backgroundColor: colors.buttons,
                  width: '100%',
                  maxWidth: '250px',
                  alignSelf: 'center',
                  borderRadius: '20px',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={require('../assets/logo.png')}
                  style={{ objectFit: 'contain', height: '10vh' }}
                />
              </div>
              <Typography textAlign={'center'}>
                Ingrese su usuario y contraseña
              </Typography>

              <TextField
                variant="standard"
                label="Usuario"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ alignSelf: 'center' }}
              />
              <TextField
                variant="standard"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Contraseña"
                sx={{ alignSelf: 'center' }}
              />
              <Button
                sx={{
                  width: '100%',
                  maxWidth: '200px',
                  alignSelf: 'center',
                  margin: '1rem 0px 0rem 0px',
                }}
                variant="contained"
                onClick={() => doLogin()}
              >
                Ingresar
              </Button>

              <Button
                variant="contained"
                color="error"
                sx={{
                  width: '100%',
                  maxWidth: '200px',
                  alignSelf: 'center',
                  padding: '0.5rem 1rem 0.5rem 1rem',
                  margin: '1rem 0rem 1rem 0rem',
                }}
                onClick={() => googleSignIn()}
              >
                <GoogleIcon />
                oogle
              </Button>
              <Button
                onClick={() => navigate('/register')}
                sx={{ width: '100%', maxWidth: '200px', alignSelf: 'center' }}
                variant="outlined"
              >
                Regístrese
              </Button>
            </div>
          </div>
        </Paper>
      )}
    </>
  );
};

export default Login;
