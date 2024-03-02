import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { apiUrl } from "../../constantes.js";
import {} from "./home.css";
import SideMenu from "../SideMenu/SideMenu.jsx";
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
                <div>
                <main>
                    <SideMenu />
                    <section className="home">
                        <Home/>
                        <Student/>
                    </section>
                </main>
                <Footer />
               </div>
            )}
        </>
    );
}

export default Home;
