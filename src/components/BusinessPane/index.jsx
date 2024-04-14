import PropTypes from 'prop-types';
import { useContext } from 'react';
import { EarnyContext } from '../../context/EarnyContext';
import { Skeleton } from '@mui/material';
import BusinessCard from '../BusinessCard';
const BusinessPane = ({page}) => {
    const { isLoading } = useContext(EarnyContext);
    const businessDisplay = page.map((b, i) => <BusinessCard business={b} key={i}/>);
  return (
    <ul className="m-auto w-3/4 flex flex-col justify-center">
        {
            isLoading ? 
            <>
              <Skeleton variant="rounded" className="w-full !h-32 my-2"/>
              <Skeleton variant="rounded" className="w-full !h-32 my-2"/>
              <Skeleton variant="rounded" className="w-full !h-32 my-2"/>
            </>
            :
            businessDisplay
        }
    </ul>
  );
};
BusinessPane.propTypes = {
  page: PropTypes.array,
};
export default BusinessPane;