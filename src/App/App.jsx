import {useRoutes, HashRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';

import User from '../pages/User';
import Home from '../pages/Home';
import Register from '../pages/Register';
import AppTemplate from '../components/AppTemplate';
import Login from '../pages/Login';
import { EarnyProvider } from '../context/EarnyContext';
import Explore from '../pages/Explore';
import NotFound from '../pages/NotFound';
import BusinessMe from '../pages/BusinessMe';
import BusinessPage from '../pages/BusinessPage';
import MyAccount from '../pages/MyAccount';
import MyOrders from '../pages/MyOrders';
import BusinessOrders from '../pages/BusinessOrders';
import Recent from '../pages/Recent';
import About from '../pages/About';


const AppRoutes = () => useRoutes([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '*',
    Component: NotFound,
  },
  {
    path: '/register',
    Component: Register,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/my-account',
    Component: MyAccount,
  },
  {
    path: '/user',
    Component: User,
  },
  {
    path: '/explore',
    Component: Explore,
  },
  {
    path: '/business/me',
    Component: BusinessMe,
  },
  {
    path: '/business/analytics',
    Component: NotFound,
  },
  {
    path: '/business/:id',
    Component: BusinessPage,
  },
  {
    path: '/orders',
    Component: MyOrders,
  },
  {
    path: '/movements',
    Component: BusinessOrders,
  },
  {
    path: '/recent',
    Component: Recent,
  },
  {
    path: '/about',
    Component: About,
  },
]);


const App = () => {
  
  return (
    <HashRouter>
      <EarnyProvider>
        <AppTemplate>
            <AppRoutes/>
        </AppTemplate>
      </EarnyProvider>
    </HashRouter>
  );
};

App.propTypes = {};

export default App;