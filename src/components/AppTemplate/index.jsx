import PropTypes from 'prop-types';
import Fade from '@mui/material/Fade';
import { Alert, Snackbar } from '@mui/material';

import Navbar from '../Navbar';
import { useContext } from 'react';
import { EarnyContext } from '../../context/EarnyContext';

const AppTemplate = ({children}) => {
  const { handleSnackClose, snackAlertProps, snackOpen } = useContext(EarnyContext);
  return (
    <>
      <Navbar/>
      <section className='mt-16 m-auto'>
        {children}
      </section>
    </>
  );
};

AppTemplate.propTypes = {
  children: PropTypes.node,
};

export default AppTemplate;