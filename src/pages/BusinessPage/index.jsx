import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { EarnyContext } from '../../context/EarnyContext';
import BusinessService from '../../services/business.service';
import { useParams } from 'react-router-dom';
import { Drawer, Fab, Modal, Skeleton } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import Loading from '../../components/Loading';
import AddProduct from '../../components/AddProduct';
import ProductService from '../../services/product.service';
import ProductPane from '../../components/ProductPane';
import { Assessment } from '@mui/icons-material';
import ShowAnalytics from '../../components/ShowAnalytics';


const BusinessPage = props => {
    const { id } = useParams();


    const [ analyticOpen, setAnalyticOpen ] = useState(false);
    const handleAnalyticClose = () => setAnalyticOpen(false);
    const handleAnalyticOpen = () => setAnalyticOpen(true);

    const [ productModalOpen, setProductModalOpen ] = useState(false);
    const handleProductModalClose = () => setProductModalOpen(false);
    const handleProductModalOpen = () => setProductModalOpen(true);

    const [ isProductLoading, setProductLoading ] = useState(false);
    const [ isBusinessLoading, setBusinessLoading ] = useState(false);

    const { auth_token, handleSnackClick} = useContext(EarnyContext);
    const [ business, setBusiness ] = useState(null);
    const [ products, setProducts ] = useState([]);
    const [ analyticError, setAnalyticError ] = useState(false);
    const [ analyticData, setAnalyticData ] = useState(null);
    const isAnalyticLoading = !analyticData;
    const [ productPage, setProductPage ] = useState(1);

    useEffect(() => {
      setProductLoading(true);
      const alertProps = {
          severity: "error",
          variant: "filled",
        };
      ProductService.getByBusiness(id)
      .then((result) => {
          if (result.error) {
            if (result.message) {
              alertProps.message = result.message;
            } else {
              alertProps.message = "¡Ups! Parece que ha ocurrido un problema.";
            }
            handleSnackClick(alertProps);
          } else {
            setProducts(result);
            setProductLoading(false);
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
  }, []);

    useEffect(() => {
        const alertProps = {
            severity: "error",
            variant: "filled",
          };
        setBusinessLoading(true);
        BusinessService.getOne(id, auth_token)
        .then((result) => {
            if (result.error) {
              if (result.message) {
                alertProps.message = result.message;
              } else {
                alertProps.message = "¡Ups! Parece que ha ocurrido un problema.";
              }
              handleSnackClick(alertProps);
            } else {
              setBusiness(result);
              setBusinessLoading(false);
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
    }, []);

    useEffect(() => {
      if(business && business.user_has_rights){
        BusinessService.getOneAnalytics(id, auth_token)
          .then((result) => {
            if (!result.error) {
              setAnalyticData(result);
            }
            setAnalyticError(true);
          })
          .catch((err) => {
            setAnalyticError(true);
          });
      }
    }, [business]);

    const diasEnPlataforma = Math.floor((new Date().getTime() - new Date(business?.created_at).getTime()) / (1000 * 60 * 60 * 24));
  return (
  <section className='w-[90%] m-auto'>
        <nav className='flex w-3/4 m-auto items-center gap-3 rounded-md p-2'>
            {
              isBusinessLoading || isProductLoading  ?
              <>
                <Skeleton variant='circular' className='w-1/4 relative aspect-square h-full'></Skeleton>
                <Skeleton className='w-3/4 h-40'></Skeleton>
              </>
              :
              <>
                <figure className='w-1/4 relative'>
                  <img className='w-full rounded-full'
                      src={business?.image || `https://picsum.photos/300/300`}
                      alt={business?.name} />
                </figure>
                <span className='w-3/4'>
                  <h2 className='text-4xl roboto-bold'>{business?.name}</h2>
                  <p className='text-md roboto-regular'>{business?.description}</p>
                  {isNaN(diasEnPlataforma) || <p className='text-sm mt-[-4px] roboto-bold'>Es parte de nosotros desde hace {diasEnPlataforma} días.</p>}
                </span>
              </>

            }
        </nav>
        {
          business?.user_has_rights && <>
            <Modal
            className='backdrop-blur-[2px]'
            open={productModalOpen}
            onClose={handleProductModalClose}>
            <AddProduct
              handleModalClose={handleProductModalClose}
              productPage={products}
              setProductPage={setProducts}
              businessId={business.id}
              />
            </Modal>

            <Drawer
              anchor='bottom'
              open={analyticOpen}
              onClose={handleAnalyticClose}
              className='backdrop-blur-[2px]'
              sx={{
                '& .MuiDrawer-paper': {
                    height: '80vh',
                    backgroundColor: '#4E54C8',
                },
              }}
              >
                <ShowAnalytics loading={isAnalyticLoading} data={analyticData} error={analyticError}/>
              </Drawer>
      
          <span className='flex gap-3 fixed bottom-3 right-3 z-50'>    
            <Fab
            variant="extended"
            className=" !bg-black !text-white"
            onClick={() => handleProductModalOpen()}>
              <AddIcon className="text-xl" sx={{ mr: 1 }}/>
              Añade tus productos
            </Fab>
  
            <Fab
            variant="extended"
            className="!bg-black !text-white"
            onClick={() => handleAnalyticOpen()}>
              <Assessment sx={{ fontSize: 30 }}/>
              Analítica
            </Fab>
          </span>
          </>

                          
        }
        <ProductPane isLoading={isBusinessLoading || isProductLoading } page={products} setPage={setProducts} user_has_rights={business && business.user_has_rights}/>

    </section>
  );
};
BusinessPage.propTypes = {};
export default BusinessPage;