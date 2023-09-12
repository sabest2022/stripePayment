import { useCartContext } from "../context/CartContext";
import { useEffect } from 'react';

function Confirmation() {
    function toFirstPage() {
        window.location = "http://localhost:5173";
    }

    useEffect(() => {
        if (window.location.pathname === "/confirmation") {
            // Display a success message
            alert("Payment was successful!");
        }
        // You can handle other paths similarly
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl mb-4">Tack för ditt köp</h1>
                <button onClick={toFirstPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Startsida!
                </button>
            </div>
        </div>


    );
}

export default Confirmation;
