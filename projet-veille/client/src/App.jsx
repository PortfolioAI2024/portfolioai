import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { apiUrl } from "./constantes.js";
import SideMenu from "./SideMenu";

function App() {
    const { token, userId } = useContext(AuthContext);

    useEffect(() => {
        // Ici, vous pouvez effectuer des actions supplémentaires lors du chargement du composant
        // ou réagir à des changements spécifiques (par exemple, le token) si nécessaire.
        console.log("Token mis à jour :", token);
    }, [token]); // Ajoutez le token en dépendance pour déclencher le useEffect lorsqu'il change.

    return (
        <>
            {token ? (
                <div>
                    <SideMenu />
                    <p>Bonjours!</p>
                </div>
            ) : (
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
                </div>
            )}
        </>
    );
}

export default App;
