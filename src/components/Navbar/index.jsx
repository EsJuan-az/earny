import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { EarnyContext } from '../../context/EarnyContext';
import { Avatar, Badge, Tooltip } from '@mui/material';
import { AccountCircle, Assessment, Book, Login, PendingActions, Store } from '@mui/icons-material';
const Navbar = props => {
    const { auth } = useContext(EarnyContext);
    const navlinkClass = ({isActive}) =>  [
        isActive ? "active" : "",
      ].join(" ");
  return (
    <>
    <nav className={`bg-app-700 text-app-100 fixed top-0 left-0 w-screen py-2 flex roboto-medium items-center
    [&>div]:flex-1 [&>div]:flex [&>div]:gap-5 [&>div]:items-center text-lg
    [&>div>*]:block  [&>div>*]:mx-7 z-[10]`}>
        <div className='justify-start'>
            <NavLink exact="true" to='/' className={p => navlinkClass(p) + ` bebas-neue-regular text-4xl !mx-14`}>
                Earny
            </NavLink>
            <NavLink exact="true" to='/explore' className={p => navlinkClass(p) + ``}>
                Explora
            </NavLink>
        </div>
        <div className='justify-end'>
            {   !auth ?
                <>
                    <Tooltip title="Regístrate">
                        <NavLink exact="true" to='/register' className={navlinkClass}>
                            <AccountCircle sx={{ fontSize: 30 }}/>
                        </NavLink>
                    </Tooltip>
                    <Tooltip title="Ingresa">
                        <NavLink exact="true" to='/login' className={p => navlinkClass(p) + ``}>
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
                    <Tooltip title="Analítica">
                        <NavLink exact="true" to='/business/analytics'>
                            <Assessment sx={{ fontSize: 30 }}/>
                        </NavLink>
                    </Tooltip>
                    <Tooltip title="Registros">
                        <NavLink exact="true" to='/movements'>
                            <Book sx={{ fontSize: 30 }}/>
                        </NavLink>
                    </Tooltip>
                    <Tooltip title="Órdenes">
                        <NavLink exact="true" to='/orders'>
                            <PendingActions sx={{ fontSize: 30 }}/>
                        </NavLink>
                    </Tooltip>
                    <NavLink exact="true" to="/user/me" className={'outline-none'}>
                        <Avatar sx={{bgcolor: '#4E54C8'}} className="text-center cursor-pointer relative">
                            { auth.name.split(' ').slice(0, 2).reduce((p, c) => p + c[0],'').toUpperCase() }
                        </Avatar>
                    </NavLink>
                </>
            }
        </div>
    </nav>
    </>
  );
};

Navbar.propTypes = {};

export default Navbar;