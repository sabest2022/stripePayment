import { createContext, useState, useContext } from "react";
const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);


const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    function addToCart(product) {
        const updatedCart = [...cart, product];

        // Update the state with the local copy
        setCart(updatedCart);

        // Log the local copy
        console.log(updatedCart);
    }

    function removeFromCart(productId) {
        setCart(prevCart => prevCart.filter(p => p.id !== productId));
        console.log(cart);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;