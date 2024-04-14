import PropTypes from 'prop-types';
import Navbar from '../Navbar';

const AppTemplate = ({children}) => {
  return (
    <>
      <Navbar/>
      <section className='mt-12 m-auto'>
        {children}
      </section>
    </>
  );
};

AppTemplate.propTypes = {
  children: PropTypes.node,
};

export default AppTemplate;