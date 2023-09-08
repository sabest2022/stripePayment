import { useCartContext } from "../context/CartContext";
import { useEffect } from 'react';

function Confirmation() {
    const { cart, setCart } = useCartContext();

    useEffect(() => {
        console.log(cart);
        // If you want to empty the cart after confirmation
        setCart([]);
    }, [setCart]);

    return (
        <div>
            <p>Tack för ditt köp</p>
        </div>
    );
}

export default Confirmation;
