import React, {useEffect, useState} from 'react';
import { Route, Switch } from 'wouter';
import './styles.css';
import { useFlashMessage } from './FlashMessageStore';

import HomePage from './HomePage';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductsPage from './ProductsPage';
import ContactPage from './ContactPage';
import RegisterPage from './RegisterPage';
import ShoppingCart from './ShoppingCart';

export default function App() {
  const { getMessage, clearMessage } = useFlashMessage();
  const flashMessage = getMessage();

  const [isVisible, setIsVisible] = useState(false); // State to track toast visibility

  useEffect(() => {
    if (flashMessage.message) {
      setIsVisible(true);  // Show the toast notification
      const timer = setTimeout(() => {
        setIsVisible(false); // Hide the toast after 10 seconds
        clearMessage(); // Clear the flash message state
      }, 10000);

      return () => {
        clearTimeout(timer);  // Cleanup timeout on unmount or message change
      };
    }
  }, [flashMessage, clearMessage]);

  return (
    <>
      <Navbar />
      {isVisible && flashMessage.message && (
        <div
          className={`flash-alert alert-${flashMessage.type} ${!isVisible ? 'hide' : ''}`}
          role="alert"
        >
          {flashMessage.message}
        </div>
      )}

      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/cart" component={ShoppingCart} />
      </Switch>

      <Footer />
    </>
  );
}
// TODO: contact page optional