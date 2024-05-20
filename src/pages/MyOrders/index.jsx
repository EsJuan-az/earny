import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import OrderService from '../../services/order.service';
import { EarnyContext } from '../../context/EarnyContext';
import { Skeleton, snackbarClasses } from '@mui/material';
import OrderPane from '../../components/OrderPane';
import { useNavigate } from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
const MyOrders = props => {
    const [orders, setOrders] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ map, setMap ] = useState(null);
    const { auth_token, handleSnackClick } = useContext(EarnyContext);
    useEffect(() => {
        const snackData = {
            severity: 'error',
            variant: 'filled',
        };
        setLoading(true);
        OrderService.getOrders(auth_token)
            .then(result => {
                if(!result.error){
                    return setOrders(result);
                }
                snackData.message = 'Ha ocurrido un error al obtener tus ordenes...';
                handleSnackClick(snackData);
            })
            .catch(() => {
                snackData.message = 'Ha ocurrido un error al obtener tus ordenes...';
                handleSnackClick(snackData);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
  return (
    <section className="m-auto w-1/2">
        <h2 className='bebas-neue-regular text-4xl text-app-100 select-none'>Gracias por apoyar a nuestros emprendimientos</h2>
        <p className='roboto-medium text-app-100 mb-2 select-none'>¡Aquí verás todos tus pedidos actuales!</p>
        <section className=''>
            <OrderPane orders={orders} loading={loading} onClick={() => {}}/>
        </section>
    </section>
  );
};
MyOrders.propTypes = {};
export default MyOrders;