import PropTypes from 'prop-types';
const BusinessCard = ({business:{name, image}}) => {
  return (
    <section className='bg-app-700 rounded-md p-3 h-32 text-app-100 max-h-36 my-2 relative rounded-tl-none'>
        <div className='bg-lime-400 w-3 h-3 rounded-full absolute top-2 right-2 animate-pulse'></div>
        <h2 className='bebas-neue-regular text-2xl'>{name}</h2>
        <ul>
          <li>Imagen</li>
          <li>Descripción</li>
          <li>Imagen de productos</li>
        </ul>
    </section>
  );
};
BusinessCard.propTypes = {};
export default BusinessCard;