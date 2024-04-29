// Third party dependencies.
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Own modules.
import { EarnyContext } from '../../context/EarnyContext';
import UserForm from '../../components/UserForm';
import UserService from '../../services/user.service';
import Validation from '../../helpers/validation.helper';
import ManyHelper from '../../helpers/many.helper';


const Register = props => {
  const { setLoading, handleSnackClick, navigate, auth } = useContext(EarnyContext);
  // Validación de datos y registro.
  const formOnSubmit = (e, data) => {
    const alertProps = {
      severity: 'error',
      variant: 'filled',
    };
    // Validar los datos
    if( !Validation.validEmail(data.email) ){
      alertProps.message = 'Tu email no es válido.';
      return handleSnackClick(alertProps);
    }else if( !Validation.isSecurePassword(data.password) ){
      alertProps.message = 'Tu contraseña es muy débil.';
      return handleSnackClick(alertProps);
    }else if( !Validation.validPhoneNumber(data.phone) ){
      alertProps.message = 'Tu telefono no es válido.';
      return handleSnackClick(alertProps);
    }else if( !Validation.validRealName(data.name) ){
      alertProps.message = 'Tu nombre no es válido.';
      return handleSnackClick(alertProps);
    }else if( !Validation.validUsername(data.nick) ){
      alertProps.message = 'Tu nickname no es válido.';
      return handleSnackClick(alertProps);
    }
    // Hacer la petición.
    setLoading(true);
    return UserService.register(data)
      .then(resp => {
        if(resp.error){
          alertProps.message = 'Intentalo denuevo en unos minutos.';
          return;
        }
        alertProps.severity = 'success';
        alertProps.message = 'Te has registrado con éxito.';
        navigate('/login');
      })
      .catch( err => {
        if(err.message){
          alertProps.message = err.message;
          return;
        }
        alertProps.message = 'Ha ocurrido un error.';
      })
      .finally(() => {
        handleSnackClick(alertProps);
        setLoading(false);
      });
  };
  // Efecto de registro.
  useEffect(() => {
    if(auth){
      navigate('/');
    }
  }, [auth]);
  return (
    <section className="m-auto w-1/2">
      <h2 className='bebas-neue-regular text-4xl text-app-100 select-none'>Registro</h2>
      <p className='roboto-medium text-app-100 mb-2 select-none'>¡Únete y emprende con Earny!</p>
      <UserForm isLogin isUserData onSubmit={formOnSubmit}/>
      <p className='roboto-medium text-app-100 mb-2 select-none mt-1'>
        ¿Ya tienes una cuenta? <Link exact="true" to="/login" className="underline">Ingresa</Link>
      </p>

    </section>
  );
};

Register.propTypes = {};

export default Register;