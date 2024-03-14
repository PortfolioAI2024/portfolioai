import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListStudents from "./ListStudents.jsx";
import { db } from "./firebase/init.js";
import { getDocs, collection } from "firebase/firestore";
import "./styles.css"; // Import CSS file

function App() {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const usersCollectionRef = collection(db, "users");
      const querySnapshot = await getDocs(usersCollectionRef);
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudentsData(usersList);
    }

    fetchData();
  }, []);

  return (
    <>
      <div className="flex-container"> {/* Updated class name */}
        <div></div> {/* Added empty div for spacing */}
        <div className="buttons-container"> {/* Updated class name */}
          <Link to="/login">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded button"> {/* Added button class */}
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded button ml-2"> {/* Added button class */}
              Signup
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-4">
        <p>👾
Cliquer pour prendre un meeting avec nos Stagiaires 👾
</p>
        {studentsData.length > 0 && (
          <ListStudents students={studentsData} />
        )}
      </div>
    </>
  );
}

export default App;
