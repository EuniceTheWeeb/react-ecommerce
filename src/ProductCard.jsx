import React, { useState } from 'react';
import { useFlashMessage } from './FlashMessageStore';

export default function ProductCard(props) {
    const { showMessage } = useFlashMessage();


    const handleAddToCart = () => {
        showMessage(`Added ${props.productName} to cart!`, 'success')
    }

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
                <button className="btn btn-primary" onClick={handleAddToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
