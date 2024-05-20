import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useCookies } from 'react-cookie';
import UserService from '../services/user.service';
import { useNavigate } from 'react-router-dom';
import { Alert, Fade, Snackbar } from '@mui/material';

const EarnyContext = React.createContext();
function EarnyProvider({children}){
  // AUTH STATE
  const [cookies, setCookie, removeCookie] = useCookies(['auth_token']);
  const [productsOnCart, setProductsOnCart] = useLocalStorage('product_cart', []);
  const deleteOnCartByBusiness = (business_id) => {
    const newProductsOnCart = productsOnCart.filter(p => p.business_id != business_id);
    setProductsOnCart(newProductsOnCart);
  };
  const addOnCart = (id, quantity, onCart, business_id, product) => {
    const newProductsOnCart = productsOnCart.filter(p => p.id != id);
    if( onCart && quantity > 0 ){
      setProductsOnCart([ ...newProductsOnCart, { id, quantity, onCart, business_id, product } ]);
    }else{
      setProductsOnCart(newProductsOnCart);
    }
  };
  const setAuthToken = (token) => {
    if( !token ){
      removeCookie('auth_token', { path: '/' });
    }else{
      setCookie('auth_token', token, { path:'/' });
    }
  };
  const {auth_token} = cookies;
  const [auth, setAuth] = useLocalStorage(null);
  const resetAuthSession = () => setAuthToken(auth_token);
  // UI STATES.
  const [isLoading, setLoading] = useState(false);
  const [ snackOpen, setSnackOpen ] = useState(false);
  const [ snackAlertProps, setSnackAlertProps ] = useState({
      message: '',
      severity: 'success',
      variant: 'filled',
  });
  const navigate = useNavigate();
  const handleSnackClick = (alertProps) => {
      setSnackAlertProps({...snackAlertProps, ...alertProps});
      setSnackOpen(true);
    };
  const handleSnackClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };
  // EFFECT.
  useEffect(() => {
    if( !auth_token ){
      return setAuth(null);
    }
    UserService.getMe(auth_token).then(resp => {
      if(resp.error){
        setAuth(null);
        setAuthToken(null);
        handleSnackClick({
          severity: 'warning',
          variant: 'filled',
          message: resp.message,
        });
      }else{
        setAuth(resp);
      }
    });
  }, [auth_token]);
    return (
    <EarnyContext.Provider value={{
      resetAuthSession,
      productsOnCart, setProductsOnCart, deleteOnCartByBusiness,
      addOnCart,
      navigate,
      isLoading, setLoading,
      auth, setAuthToken, auth_token,
      snackOpen, handleSnackClick,
      snackAlertProps, handleSnackClose,
    }}>
        { children }
        <Snackbar className="z-"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackOpen}
        onClose={handleSnackClose}
        TransitionComponent={Fade}
        autoHideDuration={1200}
      >
        <Alert
          onClose={handleSnackClose}
          variant={snackAlertProps.variant}
          severity={snackAlertProps.severity}
          sx={{ width: '100%' }}
        >
          {snackAlertProps.message}
        </Alert>
      </Snackbar>
    </EarnyContext.Provider>
    );
}
EarnyProvider.propTypes = {
    children: PropTypes.node,
};
export {EarnyProvider, EarnyContext};