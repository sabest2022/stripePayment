import React from 'react'
import ReactDOM from 'react-dom/client'
import CartProvider from './context/CartContext.jsx'
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <CartProvider>
    <App />
  </CartProvider>


)
