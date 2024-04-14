import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const EarnyContext = React.createContext();
function EarnyProvider({children}){
    const [isLoading, setLoading] = useState(false);
    const [ auth, setAuth ] = useLocalStorage('auth_v1');
    return (
    <EarnyContext.Provider value={{
        isLoading, setLoading,
        auth, setAuth,
    }}>
        { children }
    </EarnyContext.Provider>
    );
}
EarnyProvider.propTypes = {
    children: PropTypes.node,
};
export {EarnyProvider, EarnyContext};