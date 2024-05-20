import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { EarnyContext } from '../../context/EarnyContext';
import { useContext } from 'react';
import ManyHelper from '../../helpers/many.helper';
import { Accordion, AccordionDetails, AccordionSummary, Skeleton } from '@mui/material';
const BusinessCard = ({business}) => {
  const { auth } = useContext(EarnyContext);
  const {name, image, description, holder_id, id} = business;

  return (
    <Accordion className='bg-black'>
      <AccordionSummary>
        <section className='bg-app-700 flex flex-col gap-3 items-center rounded-md p-1 text-app-100
        my-2 relative rounded-tl-none overflow-clip cursor-pointer hover:-translate-y-3 transition-all m-auto'>
          <figure className='w-40'>
            <Skeleton variant='circular' className="absolute top-0 left-0 w-full h-full"></Skeleton>
            <img
              src={image || `https://picsum.photos/300/300?random=${name}`} alt="name"
              className='w-full rounded-full'
            />
          </figure>
          <div>
            <div className='bg-lime-400 w-3 h-3 rounded-full absolute top-2 right-2 animate-pulse'></div>
            <h2 className='text-2xl font-bold'>{name}</h2>
          </div>
        </section>
      </AccordionSummary>
      <AccordionDetails className='text-white w-full'>
        <section className='w-full'>
          Detalles:
          <li className="text-sm italic font-thin">{description && ManyHelper.limitText(description, 69)}</li>
          <Link to={`/business/${id}`} className='bg-app-purple rounded-full px-3 py-1 w-full mt-2 m-auto'>Ir al sitio.</Link>
        </section>
      </AccordionDetails>
    </Accordion>
  );
};
BusinessCard.propTypes = {
  business: PropTypes.object,
};
export default BusinessCard;