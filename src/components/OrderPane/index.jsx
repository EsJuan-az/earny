import { Skeleton } from '@mui/material';
import PropTypes from 'prop-types';
import OrderCard from '../OrderCard';
const OrderPane = ({orders, loading, onClick}) => {
    const orderDisplay = orders.map((o, i) => <OrderCard order={o} key={i} onClick={() => onClick(o)}/>);
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
        orderDisplay
    }
</ul>
  );
};
OrderPane.propTypes = {
    orders: PropTypes.array,
    loading: PropTypes.bool,
    isLink: PropTypes.bool,
    onClick: PropTypes.func,
};
export default OrderPane;