import { useCartContext } from "../context/CartContext";


async function handlePayment() {
    const { cart } = useCartContext();

    // const { cart } = useCartContext();
    const transformedCart = cart.map(item => ({
        product: item.product.default_price,
        quantity: item.quantity // Assuming a default quantity of 1 for each product.
    }));
    const response = await fetch("http://localhost:3000/api/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(transformedCart),
        credentials: 'include'
    }
    );
    if (response.status === 401) {
        alert("Your session has expired. Please log in again.");
        window.location = "/"; // replace with your login page URL
        return;
    }
    if (!response.ok) {
        alert("Log in to procced!");
        return
    } const { url } = await response.json();
    window.location = url;
}

export { handlePayment };
