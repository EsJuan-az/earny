import PropTypes from 'prop-types';
import { useContext } from 'react';
import { EarnyContext } from '../../context/EarnyContext';
import { Skeleton } from '@mui/material';
import BusinessCard from '../BusinessCard';
import ProductCard from '../ProductCard';
import useLocalStorage from '../../hooks/useLocalStorage';
import ProductService from '../../services/product.service';
const ProductPane = ({page, isLoading, user_has_rights = false, setPage}) => {
  const {handleSnackClick, auth_token} = useContext(EarnyContext);
  let businessDisplay = [];
  if(page){
    businessDisplay = page.map((p, i) => {
      const onDelete = () => {
        const alertProps = {
          severity: "error",
          variant: "filled",
        };
        ProductService.deleteProduct(p.id, auth_token)
        .then((result) => {
          if (result.error) {
            if (result.message) {
              alertProps.message = result.message;
            } else {
              alertProps.message = "¡Ups! Parece que ha ocurrido un problema.";
            }
            handleSnackClick(alertProps);
          }
        })
        .catch((err) => {
          if (err.message) {
            alertProps.message = err.message;
          } else {
            alertProps.message = "¡Ups! Parece que ha ocurrido un problema.";
          }
          handleSnackClick(alertProps);
        });
        setPage(page.filter(page => page.id != p.id ));
      };
      return <ProductCard product={p} key={i} user_has_rights={user_has_rights} onDelete={onDelete}/>;
    });
  }
  return (
    <ul className="m-auto w-full grid xl:grid-cols-4 lg:grid-cols-3 gap-9 [&>*]:w-64 justify-center">
        {
            isLoading ? 
            <>
              <Skeleton variant="rounded" className="w-full my-2"/>
              <Skeleton variant="rounded" className="w-full my-2"/>
              <Skeleton variant="rounded" className="w-full my-2"/>
            </>
            :
            businessDisplay
        }
    </ul>
  );
};
ProductPane.propTypes = {
  page: PropTypes.array,
  isLoading: PropTypes.bool,
  user_has_rights: PropTypes.bool,
  setPage: PropTypes.func,
};
export default ProductPane;