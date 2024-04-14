import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import UserForm from '../../components/UserForm';
import { EarnyContext } from '../../context/EarnyContext';
import UserService from '../../services/user.service';

const Login = props => {
  const [ errors, setErrors ] = useState({});
  const { setLoading, setAuth } = useContext(EarnyContext);
  const formOnSubmit = (e, data) => {
    setLoading(true);
    UserService.login(data)
      .then(resp => {
        if(resp) setAuth(resp);
      })
      .finally( () => {
        setLoading(false);
      });
  };
  return (
    <section className="m-auto w-1/2">
      <h2 className='bebas-neue-regular text-4xl text-app-100 select-none'>¡Bienvenido de nuevo!</h2>
      <p className='roboto-medium text-app-100 mb-2 select-none'>¡Nos alegra verte por estos lados!</p>
      <UserForm isLogin onSubmit={formOnSubmit} errors={errors}/>
    </section>
  );
};

Login.propTypes = {};

export default Login;