import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Home from './Home';
import Book from './Book';
import Services from './Services';
import Products from './Products';
import Cart from './components/Cart';
import Header from './components/Header';
import Footer from './components/Footer';

const theme = {
  colors: {
    heading: 'rgb(24, 24, 29)',
    text: 'rgb(24, 24, 29)',
    white: '#fff',
    black: '#212529',
    bg: 'rgb(249, 249, 255)',
    footer_bg: '#0a1435',
    btn: 'rgb(98, 84, 243)',
    border: 'rgba(98, 84, 243, 0.5)',
    hr: '#ffff',
    gradient: 'linear-gradient(0deg, rgb(132, 144, 255) 0%, rgb(98, 189, 252) 100%)',
    shadow: 'rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
    shadowSupport: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
  },
  media: { mobile: '768px', tab: '998px' },
};

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((product) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevCartItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const updateQuantity = useCallback((product, quantity) => {
    setCartItems(prevCartItems =>
      prevCartItems
        .map(item =>
          item.id === product.id
            ? { ...item, quantity: Math.max(0, quantity) } // Ensure quantity is not negative
            : item
        )
        .filter(item => item.quantity > 0) // Remove items with zero quantity
    );
  }, []);

  const removeFromCart = useCallback((product) => {
    setCartItems(prevCartItems =>
      prevCartItems.filter(item => item.id !== product.id)
    );
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book" element={<Book />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route path="/cart" element={
            <Cart
              cartItems={cartItems}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              onBuyNow={(product) => console.log(`Buy now ${product.name}`)} // Placeholder for buy now function
            />
          } />
        </Routes> 
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;