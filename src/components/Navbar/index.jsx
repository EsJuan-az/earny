import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { EarnyContext } from '../../context/EarnyContext';
import { Avatar, Badge, Menu, MenuItem, Tooltip } from '@mui/material';
import { AccountCircle, Assessment, Book, Login, PendingActions, Store } from '@mui/icons-material';
const Navbar = props => {
    const [ menuAnchor, setMenuAnchor ] = useState(null);
    const menuOpen = Boolean(menuAnchor);
    const { auth, setAuthToken, navigate } = useContext(EarnyContext);
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
            <NavLink exact="true" to='/explore' >
                Explora
            </NavLink>
        </div>
        <div className='justify-end'>
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
                <MenuItem>My account</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </div>
    </nav>
    </>
  );
};

Navbar.propTypes = {};

export default Navbar;