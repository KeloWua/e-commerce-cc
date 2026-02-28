import React, { useEffect, useState } from 'react';
import productService from '../services/product.service';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    productService.getAll().then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="products-page">
      <h2>Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
