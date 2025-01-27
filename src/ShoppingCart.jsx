import React, { useEffect } from 'react';
import { useCart } from './CartStore';

export default function ShoppingCart() {
  const {
    cart, // Directly access cart from useCart
    getCartTotal,
    modifyQuantity,
    removeFromCart,
    fetchCart,
    isLoading
  } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <div className="container mt-4">
      <h1>Shopping Cart</h1>
      {isLoading ? (
        <p>Loading cart...</p>
      ) : cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="list-group">
            {cart.map((item) => (
              <li
                key={item.product_id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <h5>{item.productName}</h5>
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    style={{ maxWidth: '50px', maxHeight: '50px', objectFit: 'cover' }}
                  />
                  <div className="d-flex align-items-center mt-2">
                    <button
                      className="btn btn-sm btn-secondary me-2"
                      onClick={() => modifyQuantity(item.product_id, item.quantity - 1)}
                      disabled={isLoading || item.quantity <= 1} // Disable if quantity <= 1
                    >
                      -
                    </button>
                    <p className="mb-0">Quantity: {item.quantity}</p>
                    <button
                      className="btn btn-sm btn-secondary ms-2"
                      onClick={() => modifyQuantity(item.product_id, item.quantity + 1)}
                      disabled={isLoading}
                    >
                      +
                    </button>
                    <button
                      className="btn btn-sm btn-danger ms-2"
                      onClick={() => removeFromCart(item.product_id)}
                      disabled={isLoading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="text-end mt-3">
            <h4>Total: ${getCartTotal()}</h4>
          </div>
        </>
      )}
    </div>
  );
}
