import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { EarnyContext } from '../../context/EarnyContext';
import BusinessService from '../../services/business.service';
import { useParams } from 'react-router-dom';
const BusinessPage = props => {
    const { id } = useParams();
    const { setLoading, isLoading, auth_token, handleSnackClick} = useContext(EarnyContext);
    const [ business, setBusiness ] = useState(null);
    const [ products, setProducts ] = useState([]);
    useEffect(() => {
        const alertProps = {
            severity: "error",
            variant: "filled",
          };
        BusinessService.getOne(id, auth_token)
        .then((result) => {
            if (result.error) {
              if (result.message) {
                alertProps.message = result.message;
              } else {
                alertProps.message = "¡Ups! Parece que ha ocurrido un problema.";
              }
              handleSnackClick(alertProps);
            } else {
                setBusiness(result);
            }
          })
          .catch((err) => {
            if (err.message) {
              alertProps.message = err.message;
            } else {
              alertProps.message = "¡Ups! Parece que ha ocurrido un problema.";
            }
            handleSnackClick(alertProps);
          })
          .finally(() => {
            setLoading(false);
          });
    }, []);
    const diasEnPlataforma = Math.floor((new Date().getTime() - new Date(business?.created_at).getTime()) / (1000 * 60 * 60 * 24));
  return (<>
    {business && <section className='w-[90%] m-auto'>
        <nav className='flex w-3/4 m-auto items-center gap-3 rounded-md p-2'>
            <figure className='w-1/4 relative'>
                <img className='w-full rounded-full'
                    src={business?.image || `https://picsum.photos/300/300`}
                    alt={business?.name} />
                
            </figure>
            <span className='w-3/4'>
                <h2 className='text-4xl roboto-bold'>{business.name}</h2>
                <p className='text-md roboto-regular'>{business.description}</p>
                <p className='text-sm mt-[-4px] roboto-bold'>Es parte de nosotros desde hace {diasEnPlataforma} días.</p>
            </span>
        </nav>
    </section>
    }
    </>
  );
};
BusinessPage.propTypes = {};
export default BusinessPage;