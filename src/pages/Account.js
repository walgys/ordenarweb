import { Button, Paper, TextField, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { searchAccount, updateAccount } from '../global/data';
import { AppContext } from '../context/AppContext';
import { colors } from '../global/styles';

const Account = () => {
  const { user, setSnackText, setSnackType, handleClick } =
    useContext(AppContext);
  const [initialValues, setInitialValues] = useState({});
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const getData = async () => {
      const userData = await searchAccount(user);
      setInitialValues(userData);
      console.log(JSON.stringify(userData));
    };
    getData();
    setReady(true);
  }, []);

  const update = async (values) => {
    const result = await updateAccount(user, values);
    if (result.result === 'ok') {
      setSnackText(`Cuenta actualizada`);
      setSnackType('success');
      handleClick();
    } else {  
      setSnackText(`Algo salió mal`);
      setSnackType('error');
      handleClick();
    }
    const userData = await searchAccount(user);
    setInitialValues(userData);
  };

  return (
    <>
      <div style={{ height: '100%' }}>
        {ready && (
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => update(values)}
            enableReinitialize
          >
            {(props) => (
              <Paper
                elevation={2}
                style={{
                  height: '50vh',
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
                      Actualice sus datos de cuenta
                    </Typography>

                    <TextField
                      variant="standard"
                      label="Nombre"
                      value={props.values.name}
                      InputLabelProps={{
                        shrink: props.values.name ? true : false,
                      }}
                      onChange={props.handleChange('name')}
                      sx={{ alignSelf: 'center', margin: '10px 0px 10px 0px' }}
                    />
                    <TextField
                      variant="standard"
                      label="Telefono"
                      InputLabelProps={{
                        shrink: props.values.phone ? true : false,
                      }}
                      value={props.values.phone}
                      onChange={props.handleChange('phone')}
                      sx={{ alignSelf: 'center', margin: '10px 0px 10px 0px' }}
                    />
                    <TextField
                      variant="standard"
                      label="Email"
                      InputLabelProps={{
                        shrink: props.values.email ? true : false,
                      }}
                      disabled={true}
                      value={props.values.email}
                      onChange={props.handleChange('email')}
                      sx={{ alignSelf: 'center', margin: '10px 0px 10px 0px' }}
                    />
                    <Button
                      sx={{ maxWidth: '300px', alignSelf: 'center' }}
                      variant="contained"
                      onClick={() => props.handleSubmit()}
                    >
                      Actualizar
                    </Button>
                  </div>
                </div>
              </Paper>
            )}
          </Formik>
        )}
      </div>
    </>
  );
};

export default Account;
