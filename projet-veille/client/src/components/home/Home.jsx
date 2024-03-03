import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { apiUrl } from "../../constantes.js";
import {} from "./home.css";
import SideMenu from "../../SideMenu.jsx";
import Portfolio from "../Portfolio/Portfolio.jsx";

function Home() {
    const { token, userId } = useContext(AuthContext);

    useEffect(() => {
        // Ici, vous pouvez effectuer des actions supplémentaires lors du chargement du composant
        // ou réagir à des changements spécifiques (par exemple, le token) si nécessaire.
        console.log("Token mis à jour :", token);
    }, [token]); // Ajoutez le token en dépendance pour déclencher le useEffect lorsqu'il change.

    return (
        <>
            {token && (
                <main className="root flex">
                    <SideMenu className="side-menu" />
                    <Portfolio className="portfolio" />
                </main>
            )}
        </>
    );
}

export default Home;
