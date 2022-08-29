import React, { useContext, useEffect, useState } from 'react';
import TopBar from '../components/TopBar';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  List,
  ListItem,
  Paper,
  Typography,
} from '@mui/material';
import { getOrders } from '../global/data';
import { AppContext } from '../context/AppContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AppContext);
  useEffect(() => {
    getOrders(user).then((products) => setOrders(products));
  }, []);

  return (
    <>
      <div
        className="no-scroll"
        style={{
          height: '100%',
          overflow: 'scroll',
          width: '100%',
          maxWidth: '800px',
          alignSelf: 'center',
          padding: '1rem',
          marginTop: '0.5rem'
        }}
      > 
        {orders.map((order) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5">
                {moment(order.timestamp).format('DD/MM/YYYY HH:MM:SS')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h6">
                {`Items totales: ${order.totalItems}`}
              </Typography>
              <List>
                {order.products.map((product) => (
                  <ListItem>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="p">{`${product.quantity}x $${
                        product.price
                      } = $${product.quantity * product.price}`}</Typography>
                    </div>
                  </ListItem>
                ))}
                <Typography
                  align="right"
                  variant="h6"
                >{`Total: $${order.totalPrice}`}</Typography>
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      
      </div>
    </>
  );
};

export default Orders;
