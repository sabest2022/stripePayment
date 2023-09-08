import Register from "./RegisterForm"
import { useCartContext } from "../context/CartContext";

function Header() {
    const { cart } = useCartContext();
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
            body: JSON.stringify(transformedCart),
            credentials: 'include'
        }
        ); console.log(transformedCart);
        if (!response.ok) {
            return
        } const { url, sessionId, paymentStatus } = await response.json();
        // console.log("Session ID:", sessionId);
        // console.log("Payment Status:", paymentStatus);
        window.location = url;
    }
    return (
        <div>
            <Register />
            <button onClick={handlePayment}> Checkout!</button>
        </div>
    )
}
export default Header 