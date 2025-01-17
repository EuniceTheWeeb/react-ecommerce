import React, {useEffect} from 'react';
import { Route, Switch } from 'wouter';
import './styles.css';
import { useFlashMessage } from './FlashMessageStore';

import HomePage from './HomePage';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductsPage from './ProductsPage';
import ContactPage from './ContactPage';
import RegisterPage from './RegisterPage';

export default function App() {
  const { getMessage, clearMessage  } = useFlashMessage();
  const flashMessage = getMessage();

  useEffect(() => {
    const timer = setTimeout(() => {
      clearMessage();
    }
    , 10000);
    return () => {
      clearTimeout(timer);
    };
  }
  , [flashMessage]);

  return (
    <>
      <Navbar />
      {flashMessage.message && (
        <div className={`alert alert-${flashMessage.type} text-center flash-alert`} role="alert">
          {flashMessage.message}
        </div>
      )}

      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>

      <Footer />
    </>
  );
}
