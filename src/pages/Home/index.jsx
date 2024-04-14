import React from 'react';
import PropTypes from 'prop-types';

const Home = props => {
  return (
    <section className='m-auto w-3/4'>
      <h2 className='bebas-neue-regular text-4xl text-app-100 select-none'>Te damos la bienvenida a Earny</h2>
      <p className='roboto-medium text-app-100 mb-2 select-none'>Un sitio donde iniciar tus comercios y darles visibilidad</p>
    </section>
  );
};

Home.propTypes = {};

export default Home;