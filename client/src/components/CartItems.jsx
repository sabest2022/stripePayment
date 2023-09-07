// Products.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCartContext } from '../context/CartContext';


function Products() {
    const [products, setProducts] = useState([]);

    const { removeFromCart, addToCart } = useCartContext();

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get('http://localhost:3000/api/products');
                setProducts(response.data.data);
                console.log(response.data.data) // 'data.data' because Stripe's API nests the products in a 'data' field
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }

        fetchProducts();
    }, []);




    return (
        <div>
            <h1>Products</h1>
            {products.map(product => (
                <div key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <button onClick={() => addToCart(product)}>Add to cart!</button>
                    <button onClick={() => { console.log("Remove button clicked for:", product); removeFromCart(product); }}>Remove from cart!</button>
                </div>
            ))}
        </div>
    );
}

export default Products;
