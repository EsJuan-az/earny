import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { EarnyContext } from '../../context/EarnyContext';
import { useContext } from 'react';
const BusinessCard = ({business}) => {
  const { auth } = useContext(EarnyContext);
  const {name, image, description, holder_id, id} = business;
  return (
    <Link to={`/business/${id}`} className='bg-app-700 flex flex-col gap-3 items-center rounded-md p-3 h-72 text-app-100
    max-h-72 my-2 relative rounded-tl-none overflow-clip cursor-pointer hover:-translate-y-3 transition-all'>
      <figure className='w-40'>
        <img
          src={image || `https://picsum.photos/300/300?random=${name}`} alt="name"
          className='w-full rounded-full'
        />
      </figure>
      <div>
        <div className='bg-lime-400 w-3 h-3 rounded-full absolute top-2 right-2 animate-pulse'></div>
        <h2 className='text-2xl font-bold'>{name}</h2>
        <li className="text-sm italic font-thin">{description}</li>
      </div>
    </Link>
  );
};
BusinessCard.propTypes = {
  business: PropTypes.object,
};
export default BusinessCard;