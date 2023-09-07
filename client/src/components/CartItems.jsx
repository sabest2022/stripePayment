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
        <div className="p-4">
            <h1 className="text-2xl mb-4">Products</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                    <div key={product.id} className="border p-2 rounded-lg shadow-sm">
                        <img src={product.images[0]} alt={product.name} className="w-full h-24 object-contain mb-2 rounded" />
                        <h2 className="text-lg mb-1">{product.name}</h2>
                        <p className="text-xs text-gray-600 mb-2">{product.description}</p>
                        <div className="flex gap-2">
                            <button onClick={() => addToCart(product)} className="bg-blue-500 text-white text-xxs rounded-md hover:bg-blue-600 transition-colors w-24 h-6">Add</button>
                            <button onClick={() => { console.log("Remove button clicked for:", product); removeFromCart(product); }} className="bg-red-500 text-white text-xxs rounded-md hover:bg-red-600 transition-colors w-24 h-6">Remove</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )





        ;
}

export default Products;
