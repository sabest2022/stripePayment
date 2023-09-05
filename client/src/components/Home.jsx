
import { useState } from "react";
function Home() {
    const [cart, setCart] = useState([
        {
            product: "price_1NmwtYAZbxXHiVZzmf9jQyDs",
            quantity: 2
        },
        {
            product: "price_1NmwsHAZbxXHiVZz62iKEfqF",
            quantity: 2
        }
    ]);
    async function handlePayment() {
        const response = await fetch("http://localhost:3000/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cart)
        }
        );
        if (!response.ok) {
            return
        } const { url } = await response.json();
        window.location = url;
    }

    return (
        <div>
            <button onClick={handlePayment}> Buy now !</button>
        </div>
    )
}

export default Home
