import Register from "./RegisterForm"
import Checkout from "./Checkout";

function Header() {

    return (
        <div className="flex justify-between items-center bg-blue-500 p-4">
            <Register />
            <Checkout />
        </div>

    )
}
export default Header 