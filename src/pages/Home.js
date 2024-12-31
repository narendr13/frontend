import React, { useEffect, useState } from 'react';
import { fetchProducts, fetchCategories } from '../services/apiService';
import { Link } from 'react-router-dom';

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadHomeData() {
      try {
        const products = await fetchProducts(); // Fetch all products
        const categories = await fetchCategories(); // Fetch categories
        setFeaturedProducts(products.slice(0, 5)); // Show top 5 products as featured
        setCategories(categories);
      } catch (error) {
        console.error('Error loading home data:', error);
      }
    }
    loadHomeData();
  }, []);

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>Browse our amazing products and categories!</p>
      
      <div>
        <h2>Featured Products</h2>
        <ul>
          {featuredProducts.map((product) => (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>{product.name}</Link> - ${product.price}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link to={`/categories/${category.id}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
