import { Button, Paper, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { Formik } from 'formik';
import { colors } from '../global/styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../global/fb';
import { createAccount } from '../global/data';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Register = () => {
    const initualValues = {
        phone: '',
        name: '',
        email: '',
        password: '',
      };
      const {user} = useContext(AppContext);
      const navigate = useNavigate()
      const signUp = async (values) => {
        const {email, password, phone, name} = values;
        await createUserWithEmailAndPassword(auth, email, password);
        auth.onAuthStateChanged((user) => {
            if(user){
              createAccount(user, {userId: user.uid, email:email, name:name, phone: phone});
            }
          });
      }

      useEffect(() => {
        if(user){
            navigate('/home', {replace: true})
        }
      }, [user,navigate])
      
  return (
    <>
    <Formik
          initialValues={initualValues}
          onSubmit={(values) => signUp(values)}
        >
          {(props) => (
      <Paper
          elevation={2}
          style={{
            height: '60vh',
            marginTop: '25vh',
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
                
              <Typography variant="h5" textAlign={'center'}>
                Regístrese a continuación
              </Typography>
              
              
              <TextField
                variant="standard"
                label="Nombre"
                value={props.values.name}
                onChange={props.handleChange('name')}
                sx={{ alignSelf: 'center', margin: '10px 0px 10px 0px' }}
              />
              <TextField
                variant="standard"
                label="Telefono"
                value={props.values.phone}
                onChange={props.handleChange('phone')}
                sx={{ alignSelf: 'center', margin: '10px 0px 10px 0px' }}
              />
              <TextField
                variant="standard"
                label="Email"
                value={props.values.email}
                onChange={props.handleChange('email')}
                sx={{ alignSelf: 'center', margin: '10px 0px 10px 0px' }}
              />
              <TextField
                variant="standard"
                type="password"
                value={props.values.password}
                onChange={props.handleChange('password')}
                label="Contraseña"
                sx={{ alignSelf: 'center', margin: '10px 0px 10px 0px' }}
              />
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button
                sx={{ maxWidth: '300px', alignSelf: 'center', margin: '0rem 1rem 0rem 1rem' }}
                variant='contained'
                color='warning'
                onClick={() => navigate('/',{replace: true})}
                >
                Volver
              </Button>
              <Button
                sx={{ maxWidth: '300px', alignSelf: 'center', margin: '0rem 1rem 0rem 1rem' }}
                variant='contained'
                onClick={() => props.handleSubmit()}
                >
                Registrarse
              </Button>
                  </div>
       
            </div>
          </div>      
        </Paper> 
        )}
        </Formik>
    </>
  );
};

export default Register;
