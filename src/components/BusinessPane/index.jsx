import PropTypes from 'prop-types';
import { useContext } from 'react';
import { EarnyContext } from '../../context/EarnyContext';
import { Skeleton } from '@mui/material';
import BusinessCard from '../BusinessCard';
const BusinessPane = ({page, isLoading}) => {
    const businessDisplay = page.map((b, i) => <BusinessCard business={b} key={i}/>);
  return (
    <ul className="m-auto w-full grid xl:grid-cols-4 lg:grid-cols-3 gap-4 [&>*]:w-60 justify-center">
        {
            isLoading ? 
            <>
              <Skeleton variant="rounded" className="w-full !h-72 my-2"/>
              <Skeleton variant="rounded" className="w-full !h-72 my-2"/>
              <Skeleton variant="rounded" className="w-full !h-72 my-2"/>
            </>
            :
            businessDisplay
        }
    </ul>
  );
};
BusinessPane.propTypes = {
  page: PropTypes.array,
  isLoading: PropTypes.bool,
};
export default BusinessPane;