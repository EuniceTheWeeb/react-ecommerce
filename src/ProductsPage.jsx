import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useCart } from './CartStore';
import { useLocation } from 'wouter';
import { useFlashMessage } from './FlashMessageStore';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [, setLocation] = useLocation();
  const { showMessage } = useFlashMessage();

  const handleAddToCart = (product) => {
    try {

      addToCart({
        product_id: product.id,
        productName: product.name,
        imageUrl: product.image,
        price: product.price,
        description: product.description
      });

      showMessage(`Added ${product.name} to cart!`, 'success');
    } catch (error) {

      console.error("Error adding product to cart:", error);
      showMessage(`Failed to add ${product.name} to cart. Please try again.`, 'danger');
      setLocation('/cart');
    }
  };


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products.json');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="container my-5">
        <h1 className="text-center mb-4">Our Products</h1>
        <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-md-4 mb-4">
              <ProductCard
                imageUrl={product.image}
                productName={product.name}
                price={product.price.toFixed(2)}
                onAddToCart={() => handleAddToCart(product)}
              // setLocation={setLocation}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}