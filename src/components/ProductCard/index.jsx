import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { EarnyContext } from '../../context/EarnyContext';
import { useContext, useEffect, useState } from 'react';
import ManyHelper from '../../helpers/many.helper';
import { Accordion, AccordionDetails, AccordionSummary, Icon, Skeleton } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const ProductCard = ({product, user_has_rights, onDelete}) => {
  const { auth, addOnCart, productsOnCart } = useContext(EarnyContext);
  const {name, image, description, id, price, stock, business_id} = product;
  const current  = productsOnCart.find(p => p.id == id) || {};
  const [ onCart, setOnCart ] = useState(current.onCart || false);
  const [quantity, setQuantity] = useState(current.quantity || 1);

  useEffect(() => {
    let newQuantity = parseInt(quantity);
    if( isNaN(newQuantity) || newQuantity <= 0 || newQuantity > stock ){
      newQuantity = 0;
    }
    addOnCart(id, newQuantity, onCart, business_id, product );
  }, [quantity, onCart]);
  return (
    <Accordion sx={{ backgroundColor: 'black' }} className='bg-black'>
      <AccordionSummary className='bg-app-700 flex items-center rounded-md p-2 text-app-100
      my-2 relative rounded-tl-none overflow-clip cursor-pointer hover:-translate-y-3 transition-all'>
        <figure className='w-1/2 aspect-square relative'>
          <Skeleton className="absolute top-0 left-0 w-full h-full"></Skeleton>
          <img
            src={image || `https://picsum.photos/300/300?random=${name}`} alt="name"
            className='w-full'
          />
          <h4 className='text-sm bg-black w-full absolute left-1/2 -translate-x-1/2 text-center bottom-0
          font-medium'>${ManyHelper.commaSeparate(price)}</h4>
        </figure>
        <h4 className='absolute top-1 left-1 text-sm'>{ManyHelper.commaSeparate(stock)} unidades</h4>
        <div className='p-3 flex h-full items-center'>
          <h2 className='text-2xl font-bold mr-4'>{name}</h2>
        </div>
        <span className='absolute bottom-2 right-2 flex gap-1'>
          { onCart && <input type='number' className='w-12 rounded-full outline-none text-black
          font-medium text-sm px-2' aria-controls='true' value={quantity} onChange={e => setQuantity(e.target.value)}/> }
          <figure className='' onClick={() => setOnCart(!onCart)}>
            {onCart ? <ShoppingCartIcon/> : <ShoppingCartOutlinedIcon/>}
          </figure>
        </span>
        {
          user_has_rights &&
          <figure className='size-6 absolute top-0 right-0 rounded-full hover:text-red-600' onClick={onDelete}>
            <Icon className='w-full'>clear</Icon>
          </figure>
        }
      </AccordionSummary>
      <AccordionDetails className='bg-black '>
        <li className="text-sm text-white italic font-thin">{description}</li>
      </AccordionDetails>
    </Accordion>
  );
};
ProductCard.propTypes = {
  product: PropTypes.object,
  user_has_rights: PropTypes.bool,
  onDelete: PropTypes.func,
};
export default ProductCard;