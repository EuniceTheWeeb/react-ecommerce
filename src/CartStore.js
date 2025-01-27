import { atom, useAtom } from 'jotai';
import axios from 'axios';
import Immutable from "seamless-immutable";
import { useEffect, useRef } from "react";
import { useJwt } from "./UserStore";

const initialCart = Immutable([]);
export const cartAtom = atom(initialCart);
export const cartLoadingAtom = atom(false);

export const useCart = () => {
  const isInitialLoad= useRef(true);
    const [cart, setCart] = useAtom(cartAtom);
    const [isLoading, setIsLoading] = useAtom(cartLoadingAtom);
    const { getJwt } = useJwt();

    useEffect(() => {
		    
    
      const debounceTimeout = setTimeout(() => {
          updateCart();
      }, 500);

      return () => clearTimeout(debounceTimeout); 
  }, [cart]);

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

      const fetchCart = async () => {
        const jwt = getJwt();
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/cart`,
                {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                }
            );
            setCart(Immutable(response.data));
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateCart = async () => {
      const jwt = getJwt();
      setIsLoading(true);
      try {
          const updatedCartItems = cart.map((item) => ({
              product_id: item.product_id,
              quantity: item.quantity,
          }));
          await axios.put(
              `${import.meta.env.VITE_API_URL}/api/cart`,
              { cartItems: updatedCartItems },
              {
                  headers: {
                      Authorization: `Bearer ${jwt}`,
                  },
              }
          );
      } catch (error) {
          console.error("Error updating cart:", error);
      } finally {
          setIsLoading(false);
      }
  };

    return {
        cart,
        getCartTotal,
        addToCart,
        modifyQuantity,
        removeFromCart,
        fetchCart,
        updateCart
    };
};