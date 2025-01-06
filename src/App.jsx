import React from 'react';
import './styles.css';
import ProductCard from './ProductCard';

function App() {
  const thisYear = new Date().getFullYear();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="#">E-Shop</a>
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Products</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1 className="display-4">Welcome to E-Shop</h1>
          <p className="lead">Discover amazing products at unbeatable prices!</p>
          <a href="#" className="btn btn-light btn-lg">Shop Now</a>
        </div>
      </header>

      <main class="container my-5">
        <h2 class="text-center mb-4">Featured Products</h2>
        <div class="row">
          <div class="col-md-3 mb-4">
            <ProductCard
              imageUrl="https://picsum.photos/id/20/300/200"
              productName="Product 1"
              price="19.99"
            />
          </div>

          <div class="col-md-3 mb-4">
            <ProductCard
              imageUrl="https://picsum.photos/id/1/300/200"
              productName="Product 2"
              price="29.99"
            />
          </div>

          <div class="col-md-3 mb-4">
          <ProductCard
            imageUrl="https://picsum.photos/id/26/300/200"
            productName="Product 3"
            price="39.99"
          />
        </div>

        <div class="col-md-3 mb-4">
          <ProductCard
            imageUrl="https://picsum.photos/id/96/300/200"
            productName="Product 4"
            price="49.99"
          />
        </div>
        </div>
      </main>
        

      <footer className="bg-dark text-white text-center py-3">
        <div className="container">
          <p>&copy; {thisYear} E-Shop. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;