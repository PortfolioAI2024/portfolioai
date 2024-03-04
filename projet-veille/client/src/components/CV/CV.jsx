import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { apiUrl } from "../../constantes.js";
import {} from "./CV.css";
import SideMenu from "../SideMenu/SideMenu.jsx";
import PortfolioCV from "../PortfolioCV/PortfolioCV.jsx";

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
                    <PortfolioCV className="PortfolioCV" />
                </main>
            )}
        </>
    );
}

export default Home;
