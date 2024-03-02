import { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "./constantes.js";
import  ListStudents  from "./ListStudents.jsx"
import { db } from "./firebase/init.js";

function App() {
    useEffect(() => {
        async function getUsers(){
        let students = []
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.array.forEach(element => {
                students.push(element)
            });
        })
    }
    getUsers
    }); // Ajoutez le token en dépendance pour déclencher le useEffect lorsqu'il change.
    const studentsData = [
        { id: 1, nom: "Doe", prenom: "Moha", prix: 1, github: "moha-github", ecole: "Cegep De Maisonneuve" },
        { id: 2, nom: "Smith", prenom: "Alex", prix: 95, github: "alex-github", ecole: "Cegep De Maisonneuve" },
        { id: 3, nom: "Johnson", prenom: "Aimen", prix: 4, github: "aimen-github", ecole: "Cegep De Maisonneuve" },
        { id: 4, nom: "Rodriguez", prenom: "Pedro", prix: 19, github: "pedro-github", ecole: "Cegep De Maisonneuve" }
      ];
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
                <ListStudents students={studentsData} />
            </div>
        </>
    );
}

export default App;
