import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProductPane from '../../components/ProductPane';
import ProductService from '../../services/product.service';
import { EarnyContext } from '../../context/EarnyContext';

const Home = props => {
  const [products, setProducts] = useState(null);
  const { handleSnackClick } = useContext(EarnyContext);
  const loading = !products;
  useEffect(() => {
    const alertProps = {
      severity: "error",
      variant: "filled",
    };
    ProductService.getAll()
    .then((result) => {
        if (result.error) {
          if (result.message) {
            alertProps.message = result.message;
          } else {
            alertProps.message = "¡Ups! Parece que ha ocurrido un problema.";
          }
          handleSnackClick(alertProps);
        } else {
          setProducts(result);
        }
      })
      .catch((err) => {
        if (err.message) {
          alertProps.message = err.message;
        } else {
          alertProps.message = "¡Ups! Parece que ha ocurrido un problema.";
        }
        handleSnackClick(alertProps);
      });
  },[]);
  return (
    <section className='m-auto w-3/4'>
      <h2 className='bebas-neue-regular text-4xl text-app-100 select-none'>Te damos la bienvenida a Earny</h2>
      <p className='roboto-medium text-app-100 mb-2 select-none'>Un sitio donde iniciar tus comercios y darles visibilidad</p>
      <ProductPane isLoading={loading} page={products} setPage={setProducts}/>
    </section>
  );
};

Home.propTypes = {};

export default Home;