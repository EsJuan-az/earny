import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useCookies } from 'react-cookie';
import UserService from '../services/user.service';
import { useNavigate } from 'react-router-dom';

const EarnyContext = React.createContext();
function EarnyProvider({children}){
  // AUTH STATE
  const [cookies, setCookie, removeCookie] = useCookies(['auth_token']);
  const setAuthToken = (token) => {
    if( !token ){
      removeCookie('auth_token', { path: '/' });
    }else{
      setCookie('auth_token', token, { path:'/' });
    }
  };
  const {auth_token} = cookies;
  const [auth, setAuth] = useLocalStorage(null);
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
      navigate,
      isLoading, setLoading,
      auth, setAuthToken, auth_token,
      snackOpen, handleSnackClick,
      snackAlertProps, handleSnackClose,
    }}>
        { children }
    </EarnyContext.Provider>
    );
}
EarnyProvider.propTypes = {
    children: PropTypes.node,
};
export {EarnyProvider, EarnyContext};