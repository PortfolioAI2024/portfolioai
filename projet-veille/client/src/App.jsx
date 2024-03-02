import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "./constantes.js";

function App() {
    useEffect(() => {}); // Ajoutez le token en dépendance pour déclencher le useEffect lorsqu'il change.

    return (
        <>
            <div className="flex space-x-4 mt-4">
                <Link to="/login">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Login
                    </button>
                </Link>
                <Link to="/signup">
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Signup
                    </button>
                </Link>

                <p>Voici les profile des users!</p>
            </div>
        </>
    );
}

export default App;
