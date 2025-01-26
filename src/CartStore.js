import { atom, useAtom } from 'jotai';
import Immutable from "seamless-immutable";

const initialCart = Immutable([
    {
        "id": 1,
        "product_id": 1,
        "quantity": 3,
        "productName": "Pineapple Tarts (Bottle)",
        "price": 21.90,
        "imageUrl": "pineappleTarts.jpg",
        "description": "Our pineapple tarts melt in your mouth with the perfect balance of sweet and tangy."
    },
]);

// Create an atom for the cart
export const cartAtom = atom(initialCart);

// Custom hook for cart operations
export const useCart = () => {
    const [cart, setCart] = useAtom(cartAtom);

    // Function to calculate the total price of items in the cart
    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const addToCart = (product) => {
        setCart(currentCart => {
            const existingItemIndex = cart.findIndex(i => i.product_id === product.product_id);
            if (existingItemIndex !== -1) {
                let newQuantity = cart[existingItemIndex].quantity + 1;

                // existing item
                const modifiedCart = currentCart.setIn([existingItemIndex, 'quantity'], newQuantity);
                return modifiedCart;
            } else {
                // new item
                return currentCart.concat({
                    ...product,
                    quantity: 1
                })
            }
        })
    }

    const modifyQuantity = (product_id, quantity) => {
        setCart((currentCart) => {
          const existingItemIndex = currentCart.findIndex(item => item.product_id === product_id);
          if (existingItemIndex !== -1) {
    
            // check if the quantity will be reduced to 0 or less, if so remove the item
            if (quantity < 0) {
              return currentCart.filter(item => item.product_id !== product_id);
            } else {                      
                return currentCart.setIn([existingItemIndex, 'quantity'], quantity);
            }
          }
          return currentCart;
        });
      }

      const removeFromCart = (product_id) => {
        setCart((currentCart) => {
          return currentCart.filter(item => item.product_id !== product_id);
        });
      }

    return {
        cart,
        getCartTotal,
        addToCart,
        modifyQuantity,
        removeFromCart
    };
};