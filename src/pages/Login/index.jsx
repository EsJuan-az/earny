import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserForm from '../../components/UserForm';
import { EarnyContext } from '../../context/EarnyContext';
import UserService from '../../services/user.service';
import { Link } from 'react-router-dom';

const Login = props => {
  const { setLoading, setAuthToken, handleSnackClick, navigate, auth } = useContext(EarnyContext);
  // Form submission event.
  const formOnSubmit = (e, data) => {
    const alertProps = {
      severity: 'error',
      variant: 'filled',
    };
    setLoading(true);
    UserService.login(data)
      .then(resp => {
        console.log(resp);
        if(resp.error || !resp.access_token){
          alertProps.message = resp.message || 'Ha ocurrido un error.';
        }else{
          alertProps.message = '¡Te has logueado con éxito!';
          alertProps.severity = 'success';
          setAuthToken(resp.access_token);
          navigate('/');
        }
      })
      .catch(err => {
        if(err.message){
          alertProps.message = err.message;
          return;
        }
        alertProps.message = 'Ha ocurrido un error.';
      })
      .finally( () => {
        handleSnackClick(alertProps);
        setLoading(false);
      });
  };
  // Auth change effect.
  useEffect(() => {
    if(auth){
      navigate('/');
    }
  }, [auth]);
  return (
    <section className="m-auto w-1/2">
      <h2 className='bebas-neue-regular text-4xl text-app-100 select-none'>¡Bienvenido de nuevo!</h2>
      <p className='roboto-medium text-app-100 mb-2 select-none'>¡Nos alegra verte por estos lados!</p>
      <UserForm isLogin onSubmit={formOnSubmit}/>
      <p className='roboto-medium text-app-100 mb-2 select-none mt-1'>
        ¿No tienes una cuenta? <Link exact="true" to="/register" className="underline">Regístrate</Link>
      </p>
    </section>
  );
};

Login.propTypes = {};

export default Login;