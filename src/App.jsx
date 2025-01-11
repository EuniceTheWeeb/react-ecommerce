import React from 'react';
import { Route, Switch } from 'wouter';
import './styles.css';
import HomePage from './HomePage';
import Navbar from './Navbar';
import Footer from './Footer';
import ProductsPage from './ProductsPage';
import AboutPage from './AboutPage';
import ContactPage from './ContactPage';
import RegisterPage from './RegisterPage';

export default function App() {
  return (
    <>
      <Navbar />

      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/products" component={ProductsPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/register" component={RegisterPage} />
      </Switch>

      <Footer />
    </>
  );
}
