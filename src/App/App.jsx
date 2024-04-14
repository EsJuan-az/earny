import {useRoutes, HashRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import User from '../pages/User';
import Home from '../pages/Home';
import Register from '../pages/Register';
import AppTemplate from '../components/AppTemplate';
import Login from '../pages/Login';
import { EarnyProvider } from '../context/EarnyContext';
import Explore from '../pages/Explore';
import NotFound from '../pages/NotFound';

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
    path: '/user',
    Component: User,
  },
  {
    path: '/explore',
    Component: Explore,
  },
]);


const App = () => {
  return (
    <EarnyProvider>
      <HashRouter>
        <AppTemplate>
            <AppRoutes/>
        </AppTemplate>
      </HashRouter>
    </EarnyProvider>
  );
};

App.propTypes = {};

export default App;