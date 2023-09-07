
import { useState } from "react";

import Header from "./Header";
import Products from "./CartItems";
import { useCartContext } from "../context/CartContext";
function Home() {
    const { cart } = useCartContext();
    const [carte, setCart] = useState([
        {
            product: "price_1NmwtYAZbxXHiVZzmf9jQyDs",
            quantity: 2
        },
        {
            product: "price_1NmwsHAZbxXHiVZz62iKEfqF",
            quantity: 2
        }
    ]);
    const transformedCart = cart.map(item => ({
        product: item.product.default_price,
        quantity: item.quantity // Assuming a default quantity of 1 for each product.
    }));
    async function handlePayment() {
        const response = await fetch("http://localhost:3000/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(transformedCart)
        }
        ); console.log(transformedCart);
        if (!response.ok) {
            return
        } const { url } = await response.json();
        window.location = url;
    }

    return (
        <div>
            <Header />
            <Products />

            <button onClick={handlePayment}> Buy now !</button>
        </div>
    )
}

export default Home
