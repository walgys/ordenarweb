import React, { useContext, useEffect, useState } from 'react';

import { Paper, Typography } from '@mui/material';
import { getProducts } from '../global/data';
import CategoryBar from '../components/CategoryBar';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../context/EcommerceContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const { cart } = useContext(CartContext);

  useEffect(() => {
    getProducts().then((products) => setProducts(products));
  }, []);

  return (
    <>
      <CategoryBar
        categoryIndex={categoryIndex}
        setCategoryIndex={setCategoryIndex}
        style={{ flex: 0.5 }}
      />
      <div
        className="no-scroll"
        style={{
          padding: '1rem',
          overflow: 'scroll',
          display: 'flex',
          flexWrap: 'wrap',
          height: '100%',
          justifyContent: 'center',
        }}
      >
        {products
          .filter((prod) => prod.categoryId == categoryIndex)
          .map((product) => {
            const foundItem = cart.products.find(
              (item) => item.productId === product.id
            );
            return (
              <ProductCard
                key={product.id}
                {...product}
                quantity={foundItem ? foundItem.quantity : 0}
              />
            );
          })}
      </div>
    </>
  );
};

export default Home;
