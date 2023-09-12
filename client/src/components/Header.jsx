import Register from "./RegisterForm"
// import { useCartContext } from "../context/CartContext";
import { handlePayment } from "./Checkout";
function Header() {

    return (
        <div className="flex justify-between items-center bg-blue-500 p-4">
            <Register />
            <button onClick={handlePayment} className="bg-white text-blue-500 text-xs px-1 py-0.5 rounded hover:bg-gray-200"> Checkout!</button>
        </div>

    )
}
export default Header 