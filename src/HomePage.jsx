import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useCart } from './CartStore';
import { useFlashMessage } from './FlashMessageStore';

export default function HomePage() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const { showMessage } = useFlashMessage();
  const { addToCart } = useCart();

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


    const handleAddToCart = (productId) => {
        const product = featuredProducts.find((item) => item.id === productId);
        if (product) {
            addToCart({
                product_id: product.id,
                productName: product.name,
                imageUrl: product.image,
                price: product.price,
                description: product.description
              });
            showMessage(`Added ${product.name} to cart!`, 'success');
            console.log(`Added ${product.name} to cart.`);
        } else {
            console.error('Product not found.');
            showMessage(`Failed to add ${product.name} to cart. Please try again.`, 'danger');
        }
    };

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
                    <h1 className="display-4">Welcome to E-Shop</h1>
                    <p className="lead">Discover amazing products at unbeatable prices!</p>
                    <a href="#" className="btn btn-light btn-lg">Shop Now</a>
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

    // TODO: move featured products into carousel
    
    //     return (
    //         <>
    //             {/* Carousel Section */}
    //             <main className="container my-5">
    //                 <div id="carouselExampleCaptions" className="carousel slide">
    //                     <div className="carousel-indicators">
    //                         {/* First indicator for the header slide */}
    //                         <button
    //                             type="button"
    //                             data-bs-target="#carouselExampleCaptions"
    //                             data-bs-slide-to="0"
    //                             className="active"
    //                             aria-current="true"
    //                             aria-label="Slide 1"
    //                         ></button>

    //                         {/* Create additional indicators for featured products */}
    //                         {featuredProducts.map((product, index) => (
    //                             <button
    //                                 key={product.id}
    //                                 type="button"
    //                                 data-bs-target="#carouselExampleCaptions"
    //                                 data-bs-slide-to={index + 1}
    //                                 aria-label={`Slide ${index + 2}`}
    //                             ></button>
    //                         ))}
    //                     </div>

    //                     <div className="carousel-inner">
    //                         {/* First carousel item - Header Content */}
    //                         <div className="carousel-item active">
    //                             <img
    //                                 src="path_to_header_image.jpg"
    //                                 className="d-block w-100"
    //                                 alt="Header Slide"
    //                             />
    //                             <div className="carousel-caption d-none d-md-block">
    //                                 <h1 className="display-4">Welcome to E-Shop</h1>
    //                                 <h2 className="lead">Discover amazing products at unbeatable prices!</h2>
    //                                 <a href="#" className="btn btn-light btn-lg">
    //                                     Shop Now
    //                                 </a>
    //                             </div>
    //                         </div>

    //                         {/* Render the featured products as carousel items */}
    //                         {featuredProducts.map((product, index) => (
    //                             <div
    //                                 key={product.id}
    //                                 className={`carousel-item ${index === 0 ? "active" : ""}`}
    //                             >
    //                                 <img
    //                                     src={product.image}
    //                                     className="d-block w-100"
    //                                     alt={product.name}
    //                                 />
    //                                 <div className="carousel-caption d-none d-md-block">
    //                                     <h2>{product.name}</h2>
    //                                     <h3>{product.description}</h3>
    //                                     <a href="#" className="btn btn-light btn-lg">
    //                                         Add to Cart
    //                                     </a>
    //                                 </div>
    //                             </div>
    //                         ))}
    //                     </div>

    //                     {/* Carousel Controls */}
    //                     <button
    //                         className="carousel-control-prev"
    //                         type="button"
    //                         data-bs-target="#carouselExampleCaptions"
    //                         data-bs-slide="prev"
    //                     >
    //                         <span
    //                             className="carousel-control-prev-icon"
    //                             aria-hidden="true"
    //                         ></span>
    //                         <span className="visually-hidden">Previous</span>
    //                     </button>
    //                     <button
    //                         className="carousel-control-next"
    //                         type="button"
    //                         data-bs-target="#carouselExampleCaptions"
    //                         data-bs-slide="next"
    //                     >
    //                         <span
    //                             className="carousel-control-next-icon"
    //                             aria-hidden="true"
    //                         ></span>
    //                         <span className="visually-hidden">Next</span>
    //                     </button>
    //                 </div>
    //             </main>
    //         </>
    //     );
    // }