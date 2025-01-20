import React from 'react';
import { useFlashMessage } from './FlashMessageStore';

export default function ProductCard(props) {
    const { showMessage } = useFlashMessage();
  
    const handleAddToCart = () => {
        props.onAddToCart();

        
        // TODO: if-else for success & failure (sold out products) + styling for sold out
        showMessage(`Added ${props.productName} to cart!`, 'success');
      };

    return (
        <div className="card">
            <img
                src={props.imageUrl}
                className="card-img-top"
                alt={props.productName}
            />
            <div className="card-body">
                <h5 className="card-title">{props.productName}</h5>
                <p className="card-text">${props.price}</p>
                <a href="#" className="btn btn-primary" onClick={() => {
                    handleAddToCart();
                }}>Add to Cart</a>
            </div>
        </div>
    );
}
