import { createContext, useState, useContext } from "react";
const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);


const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    function addToCart(product) {
        // const updatedCart = [...cart, product];

        // Update the state with the local copy
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.product.id === product.id);

            if (existingProduct) {
                // Increase the quantity of the existing product
                return prevCart.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Add the new product to the cart
                return [...prevCart, { product, quantity: 1 }];
            }
        });

        // Log the local copy
        console.log(cart);
    }

    function removeFromCart(product) {
        const productId = product.id;

        setCart(prevCart => {
            const itemIndex = prevCart.findIndex(item => item.product.id === productId);

            if (itemIndex === -1) return prevCart;  // If product is not in cart, return the cart as is

            // Copy the cart for immutability
            const updatedCart = [...prevCart];

            // If product quantity > 1, decrement it
            if (updatedCart[itemIndex].quantity > 1) {
                updatedCart[itemIndex].quantity -= 1;
            } else {
                // Otherwise, remove the product entirely
                updatedCart.splice(itemIndex, 1);
            }

            return updatedCart;
        });
    }


    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;