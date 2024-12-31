import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/apiService';

function ProductListing() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Product Listing</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductListing;
