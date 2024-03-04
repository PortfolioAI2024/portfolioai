import { useState, useEffect, useContext } from "react";
import { db } from "../../firebase/init.js";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../AuthContext";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

function PortfolioCV() {
  const { userId } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Référence au document de l'utilisateur dans la collection "users"
        const userDocRef = doc(db, "users", userId);

        // Obtention des données du document
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          // Mise à jour de l'état avec les données du document
          setUserData(userDocSnapshot.data());

          // Récupération de l'URL de l'image de profil depuis Firebase Storage
          const storage = getStorage();
          const profileImageRef = ref(storage, `/profilPicture/${userId}`);
          const imageUrl = await getDownloadURL(profileImageRef);
          setProfileImageUrl(imageUrl);
        } else {
          console.log("Le document n'existe pas");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur", error);
      }
    };

    // Appel de la fonction pour récupérer les données utilisateur
    fetchUserData();
  }, [userId]);

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white shadow-md p-8 rounded-md">
      {userData ? (
        <>
          {profileImageUrl && (
            <img
              src={profileImageUrl}
              alt="Profile"
              className="rounded-full w-16 h-16 mr-4"
            />
          )}
  
          <div>
            <h2 className="text-2xl font-bold mb-4">{userData.name} {userData.surname}</h2>
            <p className="text-black mb-2">Email: {userData.email}</p>
            <p className="text-black mb-2">Numéro de téléphone: {userData.phoneNumber}</p>
            <p className="text-black mb-2">GitHub: {userData.GitHubLink}</p>
  
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Compétences Techniques:</h3>
              <ul className="list-disc pl-4">
                {userData.competencesTechniques && userData.competencesTechniques.map((competence, index) => (
                  <li key={index}>{competence}</li>
                ))}
              </ul>
            </div>
  
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Écoles:</h3>
              <ul className="list-disc pl-4">
                {userData.ecoles && userData.ecoles.map((ecole, index) => (
                  <li key={index}>{ecole}</li>
                ))}
              </ul>
            </div>
    
            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Expériences:</h3>
              <ul className="list-disc pl-4">
                {userData.experiences && userData.experiences.map((experience, index) => (
                  <li key={index}>{experience}</li>
                ))}
              </ul>
            </div>


            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Langues:</h3>
              <ul className="list-disc pl-4">
                {userData.langues && userData.langues.map((langue, index) => (
                  <li key={index}>{langue}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-600">Chargement des données...</p>
      )}
    </div>
  );
  
}

export default PortfolioCV;
