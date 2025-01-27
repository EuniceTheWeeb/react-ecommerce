import React, {useEffect, useState} from 'react';
import { Route, Switch } from 'wouter';
import './styles.css';
import { useFlashMessage } from './FlashMessageStore';
import UserLogin from "./UserLogin"
import HomePage from './HomePage';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductsPage from './ProductsPage';
import RegisterPage from './RegisterPage';
import Profile from './Profile';
import ShoppingCart from './ShoppingCart';

export default function App() {
  const { getMessage, clearMessage } = useFlashMessage();
  const flashMessage = getMessage();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (flashMessage.message) {
      setIsVisible(true); 
      const timer = setTimeout(() => {
        setIsVisible(false); 
        clearMessage(); 
      }, 5000);

      return () => {
        clearTimeout(timer);
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
        <Route path="/register" component={RegisterPage} />
        <Route path="/login" component={UserLogin} />
        <Route path="/profile" component={Profile} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/cart" component={ShoppingCart} />
      </Switch>

      <Footer />
    </>
  );
}
