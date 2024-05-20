import PropTypes from 'prop-types';
import RecordService from '../../services/record.service';
import { useContext, useEffect, useState } from 'react';
import RecordPane from '../../components/RecordPane';
import { EarnyContext } from '../../context/EarnyContext';
const Recent = props => {
  const [ records, setRecords ] = useState(null);
  const {handleSnackClick} = useContext(EarnyContext);
    useEffect(() => {
      const alertProps = {
        severity: "error",
        variant: "filled",
      };
      RecordService.getAll()
      .then((result) => {
          if (result.error) {
            if (result.message) {
              alertProps.message = 'No pudimos traer los registros, prueba recargar la página.';
            } else {
              alertProps.message = "No pudimos traer los registros, prueba recargar la página.";
            }
            handleSnackClick(alertProps);
          } else {
            setRecords(result);
          }
        })
        .catch((err) => {
          if (err.message) {
            alertProps.message = 'No pudimos traer los registros, prueba recargar la página.';
          } else {
            alertProps.message = "No pudimos traer los registros, prueba recargar la página.";
          }
          handleSnackClick(alertProps);
        });
        

    }, []);
  return (
    <section className='w-3/4 m-auto'>
    <h2 className='bebas-neue-regular text-4xl text-app-100 select-none'>Historial de acciones</h2>
      <p className='roboto-medium text-app-100 mb-2 select-none'>¡La transparencia es muy importante!</p>
      <RecordPane records={records} loading={!records}/>
    </section>
  );
};
Recent.propTypes = {};
export default Recent;