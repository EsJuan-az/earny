import PropTypes from 'prop-types';
import Loading from '../Loading';
import { useContext, useState } from 'react';
import Validation from '../../helpers/validation.helper';
import { EarnyContext } from '../../context/EarnyContext';
import ProductService from '../../services/product.service';

const AddProduct = ({ setProductPage, productPage, handleModalClose, businessId }) => {
    const [product, setProduct ] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        business_id: businessId,
    });
    const { setLoading, handleSnackClick, auth_token, isLoading } = useContext(EarnyContext);
    const formOnAddBusiness = e => {
        const alertProps = {
            severity: 'error',
            variant: 'filled',
          };
        e.preventDefault();
        if(!Validation.validBusinessname(product.name)){
            alertProps.message = 'Tu nombre de producto no es válido.';
            return handleSnackClick(alertProps);
        }else if( isNaN(product.price) ){
            alertProps.message = 'Tu precio no es válido.';
            return handleSnackClick(alertProps);
        }else if( isNaN(product.stock) ){
            alertProps.message = 'Tus existencias no son válidas.';
            return handleSnackClick(alertProps);
        }else if( product.price <= 0 ){
            alertProps.message = 'Tu producto no puede ser gratuito.';
            return handleSnackClick(alertProps);
        }else if( product.stock <= 0 ){
            alertProps.message = 'Tu producto no puede carecer de existencias.';
            return handleSnackClick(alertProps);
        }
        console.log(product);
        setLoading(true);
        ProductService.addProduct(product, auth_token)
            .then(resp => {
                if(resp.error){
                    alertProps.message = resp.message;
                }else{
                    alertProps.message = `¡Qué bien! ${product.name} ha sido añadido.`;
                    alertProps.severity = 'success';
                    setProductPage([...productPage, resp]);
                    handleModalClose();
                }
            })
            .catch(err => {
                if(err.message){
                alertProps.message = err.message;
                return;
                }
                alertProps.message = 'Ha ocurrido un error.';
            })
            .finally( () => {
                handleSnackClick(alertProps);
                setLoading(false);
            });
      };
    
  return (
    <section className='bg-app-700 p-4 text-app-100 rounded-md absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            {isLoading && <Loading/>}
            <h2 className="bebas-neue-regular text-4xl select-none">
                Agrega tu producto
            </h2>
            <form className="w-full flex flex-col items-center
              [&>span]w-full
              [&>span>input]:w-full [&>span>input]:block [&>span>input]:outline-none [&>span>textarea]:outline-none [&>span>input]:bg-app-100 [&>span>input]:text-app-700
              [&>span>input]:px-2 [&>span>input]:py-1 [&>span>input]:rounded-md [&>span>textarea]:resize-none [&>span>textarea]:text-black
              [&>span>h3]:mr-4 [&>span>textarea]:h-28 [&>span>textarea]:rounded-md [&>span>textarea]:py-1 [&>span>textarea]:px-2 [&>span>textarea]:w-full" onSubmit={formOnAddBusiness}>
                <span>
                    <h3 className="roboto-bold-italic">Nombre de tu producto:</h3>
                    <input type="text" onChange={e => setProduct({...product, name: e.target.value})} autoComplete='product-name'/>
                </span>
                <span>
                    <h3 className="roboto-bold-italic">Describe tu producto:</h3>
                    <textarea type="text" onChange={e => setProduct({...product, description: e.target.value})} autoComplete='product-description'/>
                </span>
                <span>
                    <h3 className="roboto-bold-italic">Precio:</h3>
                    <input type="number" onChange={e => setProduct({...product, price: parseInt(e.target.value)})}/>
                </span>
                <span>
                    <h3 className="roboto-bold-italic">Existencias:</h3>
                    <input type="number" onChange={e => setProduct({...product, stock: parseInt(e.target.value)})}/>
                </span>
                <button
                className='rounded-full mt-3 bg-app-100 text-app-700 px-4 py-2 hover:bg-app-600 hover:text-app-100 transition-colors'>
                    Crear
                </button>
            </form>
        </section>
  );
};
AddProduct.propTypes = {
    setProductPage: PropTypes.func,
    productPage: PropTypes.object,
    handleModalClose: PropTypes.func,
    businessId: PropTypes.number,
};
export default AddProduct;