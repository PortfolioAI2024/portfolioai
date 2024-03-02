import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListStudents from "./ListStudents.jsx";
import { db } from "./firebase/init.js";
import { getDocs, collection } from "firebase/firestore";

function App() {
  const [studentsData, setStudentsData] = useState([]); // Initialisation avec un tableau vide

  useEffect(() => {
    async function fetchData() {
      const usersCollectionRef = collection(db, "users"); // Référence à la collection 'users'
      const querySnapshot = await getDocs(usersCollectionRef); // Récupération des documents
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Transformation des documents en objets JavaScript
      setStudentsData(usersList); 
      console.log(usersList); // Affichage dans la console pour vérification
    }

    fetchData();
  }, []);

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

        <p>Voici les profils des users!</p>
        {studentsData.length > 0 && (
          <ListStudents students={studentsData} />
        )}
      </div>
    </>
  );
}

export default App;
