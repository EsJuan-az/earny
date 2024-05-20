import { Accordion, AccordionDetails, AccordionSummary, Icon, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const OrderCard = ({order, onClick}) => {
  console.log(order);
  const Products = order.products.map( (m, i) => <li key={i}>{m.amount} {m.product.name}</li> );
  return (
    <Accordion onClick={onClick} className='bg-black text-app-100 px-4 py-2 cursor-pointer'>
      <AccordionSummary
                expandIcon={<Icon>expand_more</Icon>}
                aria-controls="panel1-content"
                id="panel1-header">
          <TableContainer component={Paper} sx={{backgroundColor: '#4E54C8'}}>
            <Table className='text-app-100 p-[-4rem]' aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <Icon className='text-app-100'>person</Icon>
                    <Typography className='text-app-100'>{order.customer.name}</Typography>
                  </TableCell>
                  <TableCell  align="center">
                    <Icon className='text-app-100'>store</Icon>
                    <Typography className='text-app-100'>{order.business.name}</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
      </AccordionSummary>
      <AccordionDetails>
        {
          Products
        }
        <Link to={`https://www.google.com/maps?q=${order.lat},${order.lon}`}
        className='px-3 py-1 bg-app-purple rounded-full block mt-4 text-center font-medium'>Direcciones</Link>
      </AccordionDetails>
    </Accordion>
  );
};
OrderCard.propTypes = {
    order: PropTypes.object,
    isLink: PropTypes.bool,
    onClick: PropTypes.func,
};
export default OrderCard;