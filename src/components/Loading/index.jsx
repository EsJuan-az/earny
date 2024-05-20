import { CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
const Loading = props => {
  return (
    <div className='text-app-100 absolute w-full h-full flex flex-col justify-center gap- items-center bg-app-500 top-0 left-0 rounded-md bg-opacity-50'>
        <span className='bebas-neue-regular text-4xl'>Stand by...</span>
        <CircularProgress color="secondary" />
    </div>
  );
};
Loading.propTypes = {};
export default Loading;