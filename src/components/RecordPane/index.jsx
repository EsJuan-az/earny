import PropTypes from 'prop-types';
import RecordCard from '../RecordCard';
import { Skeleton } from '@mui/material';
const RecordPane = ({records, loading}) => {
    let recordDisplay = (records || []).map((o, i) => <RecordCard record={o} key={i}/>);
  return (
    <ul className="m-auto w-full grid grid-cols-1 gap-4 justify-center">
    {
        loading ? 
        <>
          <Skeleton variant="rounded" className="w-full !h-10 my-2"/>
          <Skeleton variant="rounded" className="w-full !h-10 my-2"/>
          <Skeleton variant="rounded" className="w-full !h-10 my-2"/>
        </>
        :
        recordDisplay
    }
</ul>);
};
RecordPane.propTypes = {
    records: PropTypes.array,
    loading: PropTypes.bool,
};
export default RecordPane;