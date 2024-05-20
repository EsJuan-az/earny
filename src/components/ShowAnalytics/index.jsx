import { Box, Container, Icon, Skeleton, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ManyHelper from '../../helpers/many.helper';
const ShowAnalytics = ({data, loading, error}) => {
  return (
    <Box className='p-3'>
        {
            loading ?
            <>
            <Container className='grid grid-cols-2 text-app-100 gap-6 p-3'>
                <Skeleton variant='rectangular' className='h-64'></Skeleton>
                <Skeleton variant='rectangular' className='h-64'></Skeleton>
                <Skeleton variant='rectangular' className='h-64'></Skeleton>
                <Skeleton variant='rectangular' className='h-64'></Skeleton>
            </Container>
            </>
            :
            !error ? 
            <>
                <Container className='grid grid-cols-2 text-app-100 gap-6 p-3'>
                <Box>
                    <h2 className='bebas-neue-regular text-xl text-app-100 select-none'>Productos más vendidos</h2>
                    <img src={data.top_selling_products_chart} className='w-full'/>
                </Box>
                <Box className='mt-2 p-3'>
                    <h2 className='bebas-neue-regular text-4xl text-app-100 select-none'>Avances de tu negocio</h2>
                    <p className='roboto-medium text-app-100 mb-2 select-none'>¡Amamos ver que tu negocio está creciendo!</p>
                    <Typography className='font-medium text-app-100 text-md flex items-center gap-3 my-4'>
                        <Icon>paid</Icon>
                        Has recibido {data.total_orders} ordenes.
                    </Typography>
                    <Typography className='font-medium text-app-100 text-md flex items-center gap-3 my-4'>
                        <Icon>paid</Icon>
                        Tus ordenes han reunido ${ManyHelper.commaSeparate(data.total_earned)}.
                    </Typography>
                    {
                        data.top_selling_products.slice(0, 2).map( (p, i)=> {
                            return (<Typography key={i} className='font-medium text-app-100 text-md flex my-4 items-center gap-3'>
                            <Icon>inventory_2</Icon>
                            {p.name} está entre tus productos más vendidos con {p.amount} ordenados y ${ManyHelper.commaSeparate(p.total_revenue)} de ganancia.
                            </Typography>);
                        })
                    }
                    {
                        data.price_quantity_correlation.p_value &&
                        <>
                        <Typography className='font-medium text-app-100 text-md flex items-center gap-3 my-4'>
                            <Icon>shopping_basket</Icon>
                            La relación entre el precio de tus productos y la cantidad vendida es de {data.price_quantity_correlation.p_value}.
                        </Typography>
                        <p>Esto significa que la gente tiende a comprar
                            {
                            data.price_quantity_correlation.p_value == 0 
                            ?
                            ' de la misma forma '
                            :
                            data.price_quantity_correlation.p_value > 0
                            ?
                            ' en mayor cantidad '
                            :
                            ' en menor cantidad '

                            }
                        los productos costosos que los baratos</p>
                        </>
                        
                    }
                </Box>
                <Box>
                    <h2 className='bebas-neue-regular text-xl text-app-100 select-none'>Relación precio/cantidad</h2>
                    <img src={data.price_quantity_scatter} className='w-full'/>
                </Box>
                <Box>
                    <h2 className='bebas-neue-regular text-xl text-app-100 select-none'>Distribución del precio</h2>
                    <img src={data.price_distribution_chart} className='w-full'/>
                </Box>
                <Box>
                    <h2 className='bebas-neue-regular text-xl text-app-100 select-none'>Ubicación de tus ordenes</h2>
                    <img src={data.orders_geospatial_chart} className='w-full'/>
                </Box>
                </Container>

                
            </>
            :
            <>
                <h2 className='bebas-neue-regular text-xl text-app-100 select-none'>Aún no hay mucho que mostrar...</h2>
                <p className='roboto-medium text-app-100 mb-2 select-none'>¡Estaremos recopilando información para mostrar tu analítica!</p>
            </>
        }
    </Box>
  );
};
ShowAnalytics.propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    error: PropTypes.bool,
};
export default ShowAnalytics;