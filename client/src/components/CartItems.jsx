// Products.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCartContext } from '../context/CartContext';


function Products() {
    const [products, setProducts] = useState([]);
    const [expandedDescriptions, setExpandedDescriptions] = useState([]); // Use this state
    const { removeFromCart, addToCart } = useCartContext();

    const toggleDescription = (productId) => {
        if (expandedDescriptions.includes(productId)) {
            setExpandedDescriptions(prev => prev.filter(id => id !== productId));
        } else {
            setExpandedDescriptions(prev => [...prev, productId]);
        }
    }

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get('http://localhost:3000/api/products');
                setProducts(response.data.data);
                console.log(response.data.data)
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
                {products.map(product => {
                    return (
                        <div key={product.id} className="border p-2 rounded-lg shadow-sm w-84 h-108"> {/* Adjusted width and height for 50% larger */}
                            <img src={product.images[0]} alt={product.name} className="w-full h-36 object-contain mb-2 rounded" /> {/* Adjusted image height to 50% larger */}
                            <h2 className="text-sm mb-1 text-center">{product.name}</h2> {/* Center-aligned product name */}
                            <p
                                className={`text-xs text-gray-600 mb-2 overflow-hidden ${expandedDescriptions.includes(product.id) ? '' : 'line-clamp-1'}`}
                                onClick={() => toggleDescription(product.id)} // Use the toggleDescription function here
                            >
                                {product.description}
                            </p>
                            <div className="flex gap-2 mt-2 justify-center"> {/* Center-aligned buttons */}
                                <button onClick={() => addToCart(product)} className="bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors w-16 h-4">Add</button>
                                <button onClick={() => { console.log("Remove button clicked for:", product); removeFromCart(product); }} className="bg-red-500 text-white text-xs rounded-md hover:bg-red-600 transition-colors w-16 h-4">Remove</button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    );
}


export default Products;
