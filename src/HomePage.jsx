import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useCart } from './CartStore';
import { useLocation } from 'wouter';
import { useFlashMessage } from './FlashMessageStore';

export default function HomePage() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const { addToCart } = useCart();
    const [, setLocation, location] = useLocation();
    const { showMessage } = useFlashMessage();

    const handleAddToCart = (productId) => {
        const product = featuredProducts.find((item) => item.id === productId);
        try {
            addToCart({
                product_id: product.id,
                productName: product.name,
                imageUrl: product.image,
                price: product.price,
                description: product.description
              });

            showMessage(`Added ${product.name} to cart!`, 'success');
            console.log(`Added ${product.name} to cart.`);
        } catch (error) {
            console.error("Error adding product to cart:", error);
            showMessage(`Failed to add ${product.name} to cart. Please try again.`, 'danger');
        }
    };
    
    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await axios.get('/featured.json');
                setFeaturedProducts(response.data);
            } catch (error) {
                console.error('Error fetching featured products:', error);
            }
        };
        fetchFeaturedProducts();
    }, []);

    const renderFeaturedProducts = () => {
        return featuredProducts.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
                <ProductCard
                    id={product.id}
                    imageUrl={product.image}
                    productName={product.name}
                    price={product.price.toFixed(2)}
                    onAddToCart={() => handleAddToCart(product.id)} 
                />
            </div>
        ));
    };

    return (
        <>
            <header className="bg-primary text-white text-center py-5">
                <div className="container">
                    <h1 className="display-4">Ring in the New Year with our delicious snacks!</h1>
                    <a onClick={() => setLocation('/products')}
                        className={`btn btn-light btn-lg ${location === '/products' ? 'active' : ''}`}
                        role="button">
                        Shop Now</a>
                </div>
            </header>

            <main className="container my-5">
                <h2 className="text-center mb-4">Featured Products</h2>
                <div className="row">
                    {renderFeaturedProducts()}
                </div>
            </main>
        </>
    )
}