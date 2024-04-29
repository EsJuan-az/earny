import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { EarnyContext } from '../../context/EarnyContext';
import BusinessPane from '../../components/BusinessPane';
import BusinessService from '../../services/business.service';
const Explore = props => {
  const [businessPage, setBusinessPage] = useState([]);
  const [page, setPage] = useState(1);
  const { setLoading, handleSnackClick } = useContext(EarnyContext);
  useEffect(() => {
    setLoading(true);
    const alertProps = {
      severity: 'error',
      variant: 'filled',
    };
    BusinessService.getTrending(page)
      .then(result => {
        if(result.error){
          if( result.message ){
            alertProps.message = result.message;
          }else{
            alertProps.message = '¡Ups! Parece que ha ocurrido un problema.';
          }
          handleSnackClick(alertProps);
          setBusinessPage([]);
        }else{
          setBusinessPage(result);
        }
      })
      .catch(err => {
        if( err.message ){
          alertProps.message = err.message;
        }else{
          alertProps.message = '¡Ups! Parece que ha ocurrido un problema.';
        }
        handleSnackClick(alertProps);
        setBusinessPage([]);
      })
      .finally( () => {
        setLoading(false);
      });
  }, [page]);
  return (
    <section className="m-auto w-3/4">
      <h2 className='bebas-neue-regular text-4xl text-app-100 select-none'>¡Échale un vistazo a estos negocios!</h2>
      <p className='roboto-medium text-app-100 mb-2 select-none'>¿Ves algo que te guste?</p>
      <BusinessPane page={businessPage}/>
    </section>
  );
};
Explore.propTypes = {};
export default Explore;