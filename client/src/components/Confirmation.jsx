import { useCartContext } from "../context/CartContext";
import { useEffect } from 'react';

function Confirmation() {
    const { cart, setCart } = useCartContext();

    useEffect(() => {
        if (window.location.pathname === "/confirmation") {
            // Display a success message
            alert("Payment was successful!");
        }
        // You can handle other paths similarly
    }, []);

    return (
        <div>
            <p>Tack för ditt köp</p>
        </div>
    );
}

export default Confirmation;
