import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import OrderService from '../../services/order.service';
import { EarnyContext } from '../../context/EarnyContext';
import { Skeleton } from '@mui/material';
import OrderPane from '../../components/OrderPane';
import { useNavigate } from 'react-router-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
const BusinessOrders = props => {
    const [orders, setOrders] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ map, setMap] = useState(null);
    const { auth_token, handleSnackClick } = useContext(EarnyContext);
    const navigate = useNavigate();
    const handleShowOrderMap = o => {
        if(!auth_token){
            handleSnackClick({
                severity: 'warning',
                message: 'Necesitas autenticarte para acceder a esta función.',
            });   
            return navigate('/login');
        }
        if(!navigator.geolocation){
            return handleSnackClick({
                severity: 'error',
                message: 'Tu navegador no cuenta con las características requeridas para esta acción.',
            });
        }
        return navigator.permissions.query({ name: "geolocation" })
            .then(result => {
                console.log(result);
                switch(result.state){
                    case 'granted':
                        handleSnackClick({
                            severity: 'info',
                            message: 'Obteniendo mapa de la orden...',
                        });
                        break;
                    case 'prompt':
                        handleSnackClick({
                            severity: 'info',
                            message: 'Requerimos de tu geolocalización obtener el mapa.',
                        });
                        break;
                    default:
                        return handleSnackClick({
                            severity: 'error',
                            message: 'Requerimos de tu geolocalización obtener el mapa.',
                        });
                }
                navigator.geolocation.getCurrentPosition(async (pos) => {
                    try{
                        setMap(null);
                        const resp = await OrderService.getMapById(auth_token, o.id, {
                            lat: pos.coords.latitude,
                            lon: pos.coords.longitude,
                        });
                        console.log(resp);
                        
                        if(resp.error){
                            return handleSnackClick({
                                severity: 'error',
                                message: 'Ha ocurrido un error al obtener el mapa.',
                            });
                        }
                        setMap(resp.map);
                    }catch(e){
                        console.log(e);
                        return handleSnackClick({
                            severity: 'error',
                            message: 'Ha ocurrido un error al obtener el mapa.',
                        });
                    }
                }, () => {
                    return handleSnackClick({
                        severity: 'error',
                        message: 'Ha ocurrido un error al obtener tu localización.',
                    });
                }, { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 });
            })
            .catch(err => {
                handleSnackClick({
                    severity: 'error',
                    message: 'Ha ocurrido un error al otorgar permisos de ubicación, intentalo denuevo.',
                });
            });
    };
    const handleGetMap = () => {
        if(!auth_token){
            handleSnackClick({
                severity: 'warning',
                message: 'Necesitas autenticarte para acceder a esta función.',
            });   
            return navigate('/login');
        }
        if(!navigator.geolocation){
            return handleSnackClick({
                severity: 'error',
                message: 'Tu navegador no cuenta con las características requeridas para esta acción.',
            });
        }
        return navigator.permissions.query({ name: "geolocation" })
            .then(result => {
                console.log(result);
                switch(result.state){
                    case 'granted':
                        handleSnackClick({
                            severity: 'info',
                            message: 'Obteniendo el mapa de ordenes...',
                        });
                        break;
                    case 'prompt':
                        handleSnackClick({
                            severity: 'info',
                            message: 'Requerimos de tu geolocalización obtener el mapa.',
                        });
                        break;
                    default:
                        return handleSnackClick({
                            severity: 'error',
                            message: 'Requerimos de tu geolocalización obtener el mapa.',
                        });
                }
                navigator.geolocation.getCurrentPosition(async (pos) => {
                    try{
                        setMap(null);
                        const resp = await OrderService.getMap(auth_token, {
                            lat: pos.coords.latitude,
                            lon: pos.coords.longitude,
                        });
                        console.log(resp);
                        
                        if(resp.error){
                            return handleSnackClick({
                                severity: 'error',
                                message: 'Ha ocurrido un error al obtener el mapa.',
                            });
                        }
                        setMap(resp.map);
                    }catch(e){
                        console.log(e);
                        return handleSnackClick({
                            severity: 'error',
                            message: 'Ha ocurrido un error al obtener el mapa.',
                        });
                    }
                }, () => {
                    return handleSnackClick({
                        severity: 'error',
                        message: 'Ha ocurrido un error al obtener tu localización.',
                    });
                }, { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 });
            })
            .catch(err => {
                handleSnackClick({
                    severity: 'error',
                    message: 'Ha ocurrido un error al otorgar permisos de ubicación, intentalo denuevo.',
                });
            });
    };
    useEffect(() => {
        const snackData = {
            severity: 'error',
            variant: 'filled',
        };
        setLoading(true);
        OrderService.getAllOrders(auth_token)
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
        <h2 className='bebas-neue-regular text-4xl text-app-100 select-none'>¡Te está yendo genial!</h2>
        <p className='roboto-medium text-app-100 mb-2 select-none'>Desde aquí podrás recibir y manejar tus ordenes</p>
        <section className='grid grid-cols-2 gap-3'>
            <OrderPane orders={orders} loading={loading} onClick={handleShowOrderMap}/>
            <figure className='size-96 flex flex-col relative'>
                {
                    map 
                    ?
                    <img src={map} className='size-full'/>
                    :
                    <Skeleton variant='rectangular' className='size-full'/>
                }
                <button className='absolute bottom-0 right-0 bg-black p-3 rounded-tl-full' onClick={handleGetMap}>
                    <RefreshIcon className='fill-app-100 mb-[-5px] mr-[-5px]'/>
                </button>
            </figure>
        </section>
    </section>
  );
};
BusinessOrders.propTypes = {};
export default BusinessOrders;