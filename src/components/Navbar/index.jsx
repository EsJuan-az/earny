import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { EarnyContext } from '../../context/EarnyContext';
import { Avatar, Badge, Box, Divider, Drawer, Icon, Menu, MenuItem, Tooltip } from '@mui/material';
import { AccountCircle, Assessment, Book, Login, PendingActions, Store  } from '@mui/icons-material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CartProductCard from '../CartProductCard';
import OrderService from '../../services/order.service';
import ManyHelper from '../../helpers/many.helper';

const processBusinessProductGroup = (productsOnCart, {handleSnackClick, auth_token, navigate, setCartOpen, deleteOnCartByBusiness,}) => {
    return Object.entries(Object.groupBy(productsOnCart, ({business_id}) => business_id))
    .map( ([k, v], j) => {
        let total = 0;
        const products = v.map((p, i) => {
            total += p.quantity * p.product.price;
            return <CartProductCard key={i} product={p.product} data={p}/>;
        });
        return (
        <Box key={j} className='flex flex-col'>
            <ul >
                {products}
            </ul>
            <h3 className='text-white font-medium'>Precio total: ${ManyHelper.commaSeparate(total)}</h3>
            <button className='my-3 p-3 bg-black text-white font-medium rounded-full w-1/4 m-auto' onClick={() => {
                if(!auth_token){
                    handleSnackClick({
                        severity: 'warning',
                        message: 'Necesitas autenticarte para acceder a esta función.',
                    });   
                    setCartOpen(false);
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
                                    message: '¡Hemos obtenido tu geolocalización con éxito!',
                                });
                                break;
                            case 'prompt':
                                handleSnackClick({
                                    severity: 'info',
                                    message: 'Requerimos de tu geolocalización para confirmar la orden.',
                                });
                                break;
                            default:
                                return handleSnackClick({
                                    severity: 'error',
                                    message: 'Requerimos de tu geolocalización para confirmar la orden.',
                                });
                        }
                        navigator.geolocation.getCurrentPosition(async (pos) => {
                            try{
                                const order = await OrderService.createOrder(auth_token, {
                                    business_id: parseInt(k),
                                    lat: pos.coords.latitude,
                                    lon: pos.coords.longitude,
                                });
                                const order_id = order.id;
                                if(order.error){
                                    return handleSnackClick({
                                        severity: 'error',
                                        message: 'Ha ocurrido un error al crear tu orden.',
                                    });
                                }
                                let promises = v.map(({id: product_id, quantity:amount}) => {
                                    return OrderService.addProduct(auth_token, {
                                        product_id,
                                        amount,
                                        order_id,
                                    });
                                });
                                promises = await Promise.all(promises);
                                console.log(promises, order);
                            }catch(e){
                                return handleSnackClick({
                                    severity: 'error',
                                    message: 'Ha ocurrido un error al crear tu orden.',
                                });
                            }
                            deleteOnCartByBusiness(parseInt(k));
                        }, (err) => {
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
            }}>
                Realiza tu pedido
            </button>
            <Divider className='border-black'/>
        </Box>);
    });
};



const Navbar = props => {
    const [ menuAnchor, setMenuAnchor ] = useState(null);
    const menuOpen = Boolean(menuAnchor);
    const { auth, setAuthToken, navigate, productsOnCart, handleSnackClick, auth_token, deleteOnCartByBusiness } = useContext(EarnyContext);
    const [ cartOpen, setCartOpen ] = useState(false);
    const CartItems = processBusinessProductGroup(productsOnCart, {
        handleSnackClick,
        auth_token,
        navigate,
        setCartOpen,
        deleteOnCartByBusiness,
    });
    const handleProfileClick = (event) => {
        setMenuAnchor(event.currentTarget);
    };
    const handleProfileClose = () => {
        setMenuAnchor(null);
    };
    const logout = () => {
        setAuthToken(null);
        navigate('/');
    };
  return (
    <>
    <nav className={`bg-app-700 text-app-100 fixed top-0 left-0 w-screen py-2 flex roboto-medium items-center
    [&>div]:flex-1 [&>div]:flex [&>div]:gap-5 [&>div]:items-center text-lg
    [&>div>*]:block  [&>div>*]:mx-7 z-[10]`}>
        <div className='justify-start'>
            <NavLink exact="true" to='/' className={`bebas-neue-regular text-4xl !mx-14`}>
                Earny
            </NavLink>
            <NavLink exact="true" to='/about' >
                Sobre mí
            </NavLink>
            <NavLink exact="true" to='/explore' >
                Explora
            </NavLink>
        </div>

        <div className='justify-end items-center'>
            <Badge badgeContent={productsOnCart.length} color="primary">
                <Tooltip title="Tu carrito" onClick={() => setCartOpen(true)}>
                    <span className={'cursor-pointer'}>
                        <ShoppingCartIcon sx={{ fontSize: 30 }}/>
                    </span>
                </Tooltip>
            </Badge>
            <Tooltip title="Acciones Recientes">
                        <NavLink exact="true" to='/recent' className={''}>
                            <Icon sx={{ fontSize: 30 }} className='flex items-center'>info</Icon>
                        </NavLink>
            </Tooltip>
            {   !auth ?
                <>
                    <Tooltip title="Regístrate">
                        <NavLink exact="true" to='/register' className={''}>
                            <AccountCircle sx={{ fontSize: 30 }}/>
                        </NavLink>
                    </Tooltip>
                    <Tooltip title="Ingresa">
                        <NavLink exact="true" to='/login' className={``}>
                            <Login sx={{ fontSize: 30 }}/>
                        </NavLink>
                    </Tooltip>
                </>
                : 
                <>
                    <Tooltip title="Tus negocios">
                        <NavLink exact="true" to='/business/me'>
                            <Store sx={{ fontSize: 30 }}/>
                        </NavLink>
                    </Tooltip>
                    <Tooltip title="Pendientes">
                        <NavLink exact="true" to='/movements'>
                            <Book sx={{ fontSize: 30 }}/>
                        </NavLink>
                    </Tooltip>
                    <Tooltip title="Tus órdenes">
                        <NavLink exact="true" to='/orders'>
                            <PendingActions sx={{ fontSize: 30 }}/>
                        </NavLink>
                    </Tooltip>
                    <Avatar
                        sx={{bgcolor: '#4E54C8'}}
                        className="text-center cursor-pointer relative pt-[0.6rem]"
                        aria-controls={menuOpen ? 'basic-menu' : undefined}
                        aria-expanded={menuOpen ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleProfileClick}>
                        { auth.name.split(' ').slice(0, 2).reduce((p, c) => p + c[0],'').toUpperCase() }
                    </Avatar>
                </>
            }
            <Menu
                className='[&>div>ul]:text-app-purple [&>div>ul]:font-medium'
                id="basic-menu"
                anchorEl={menuAnchor}
                open={menuOpen}
                onClose={handleProfileClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <Link to='my-account'>
                    <MenuItem>My account</MenuItem>
                </Link>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
            <Drawer
                anchor={'right'}
                open={cartOpen}
                onClose={() => setCartOpen(false)}
                className=''
                PaperProps={{
                    sx: { width: "30%" },
                  }}
                sx={{
                    width: '33%',
                    '& .MuiDrawer-paper': {
                        backgroundColor: '#4E54C8',
                    },
                }}>
                <Box  role="presentation" className='flex flex-col p-4 bg-app-purple !h-full w-full'>
                <h2 className="bebas-neue-regular text-4xl text-app-100 select-none">
                    Tu Carrito
                </h2>
                    {
                        CartItems.length === 0
                        ?
                        <p className="font-medium roboto-bold text-white">Aún no tienes ninguna orden pendiente en tu carrito</p>
                        :
                        CartItems
                    }
                </Box>
            </Drawer>
        </div>
    </nav>
    </>
  );
};

Navbar.propTypes = {};

export default Navbar;