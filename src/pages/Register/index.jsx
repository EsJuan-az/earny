import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import UserForm from '../../components/UserForm';
import { EarnyContext } from '../../context/EarnyContext';
import UserService from '../../services/user.service';
import { Link } from 'react-router-dom';

const Register = props => {

  const [ errors, setErrors ] = useState({});
  const { setLoading, setAuth } = useContext(EarnyContext);
  const formOnSubmit = (e, data) => {
    // TODO: Validar los datos
    setLoading(true);
    UserService.register(data)
      .then(resp => {
        if(resp) setAuth(resp);
      })
      .finally( () => {
        setLoading(false);
      });
  };

  return (
    <section className="m-auto w-1/2">
      <h2 className='bebas-neue-regular text-4xl text-app-100 select-none'>Registro</h2>
      <p className='roboto-medium text-app-100 mb-2 select-none'>¡Únete y emprende con Earny!</p>
      <UserForm isLogin isUserData errors={errors} onSubmit={formOnSubmit}/>
      <p className='roboto-medium text-app-100 mb-2 select-none'>
        ¿Ya tienes una cuenta? <Link exact="true" to="/login" className="underline">Ingresa</Link>
        
      </p>
    </section>
  );
};

Register.propTypes = {};

export default Register;