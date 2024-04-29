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
      <Snackbar className="z-10"
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

    </>
  );
};

AppTemplate.propTypes = {
  children: PropTypes.node,
};

export default AppTemplate;