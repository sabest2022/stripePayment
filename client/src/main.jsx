import React from 'react'
import ReactDOM from 'react-dom/client'
import CartProvider from './context/CartContext.jsx'
import App from './App.jsx'
import './main.css'; // Or './main.css' or the path to your CSS file


ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
    <App />
  </CartProvider>


)
