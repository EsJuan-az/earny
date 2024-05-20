import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { EarnyContext } from '../../context/EarnyContext';
import { useContext, useEffect, useState } from 'react';
import ManyHelper from '../../helpers/many.helper';
import { Box, Skeleton } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const CartProductCard = ({product, data}) => {
  const { auth, addOnCart, productsOnCart } = useContext(EarnyContext);
  const {name, image, description, id, price, stock, business_id} = product;
  const current  = productsOnCart.find(p => p.id == id) || product;
  const [ onCart, setOnCart ] = useState(current.onCart || data.onCart);
  const [quantity, setQuantity] = useState(current.quantity || data.quantity);

  useEffect(() => {
    let newQuantity = parseInt(quantity);
    if( isNaN(newQuantity) || newQuantity <= 0 || newQuantity > stock ){
      newQuantity = 0;
    }
    addOnCart(id, newQuantity, onCart, business_id, product );
  }, [quantity, onCart]);
  return (
    <Box
    // to={`/business/${id}`}
    className='bg-app-700 flex gap-3 items-center rounded-md p-2 text-app-100
    max-h-32 my-2 relative rounded-tl-none overflow-clip'>
      <figure className='w-10 aspect-square  relative'>
        <Skeleton className="absolute top-0 left-0 w-full h-full"></Skeleton>
        <img
          src={image || `https://picsum.photos/300/300?random=${name}`} alt="name"
          className='w-full rounded-full'
        />
      </figure>
      <div>
        <h2 className='text-2xl font-bold'>{name}</h2>
        <h4 className='text-sm bg-black
        font-medium'>${ManyHelper.commaSeparate(price)}</h4>
        <li className="text-sm italic font-thin">{description && ManyHelper.limitText(description, 70)}</li>
      </div>
      <span className='absolute top-2 right-2 bg-white size-6 flex justify-center items-center text-sm rounded-full text-black'>{quantity}</span>
    </Box>
  );
};
CartProductCard.propTypes = {
  product: PropTypes.object,
  data: PropTypes.object,

};
export default CartProductCard;