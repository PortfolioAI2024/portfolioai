import { useState, useEffect, useContext } from "react";
import { db } from "../../firebase/init.js";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../AuthContext";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom"; // Importez Link depuis react-router-dom

function PortfolioCV() {
  const [userData, setUserData] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [cvDownloadUrl, setCVDownloadUrl] = useState(null);

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { userId, charID } = useContext(AuthContext);

  const apiKey = "b22b5ea5b583d8763f62f2ecf7ea384c"; // Removed < >
  const url = "https://api.convai.com/character/getResponse";

  const sendMessage = async (e) => {
    console.log(charID);
    e.preventDefault();
    if (inputValue.trim()) {
      const userMessage = {
        text: inputValue,
        author: "user",
      };
      const data = new FormData();
      // Access FormData fields with `data.get(fieldName)`
      // For example, converting to upper case
      data.set("charID", data.get("charID"));
      // Optimistically add the user message to the state
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Reset the input field
      setInputValue("");

      const myHeaders = new Headers();
      myHeaders.append("CONVAI-API-KEY", "b22b5ea5b583d8763f62f2ecf7ea384c");

      const formdata = new FormData();
      formdata.append("userText", inputValue);
      console.log(charID);
      formdata.append("charID", charID);
      formdata.append("sessionID", "-1");
      formdata.append("voiceResponse", "False");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      fetch("https://api.convai.com/character/getResponse", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.text();
        })
        .then((result) => {
          try {
            const parsedResult = JSON.parse(result);
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: parsedResult.text, author: "bot" },
            ]);
          } catch (error) {
            console.error("Error parsing JSON response", error);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          setUserData(userDocSnapshot.data());

          const storage = getStorage();

          // Récupération de l'URL de l'image de profil depuis Firebase Storage
          const profileImageRef = ref(storage, `/profilPicture/${userId}`);
          const imageUrl = await getDownloadURL(profileImageRef);
          setProfileImageUrl(imageUrl);

          // Récupération de l'URL du CV depuis Firebase Storage
          const cvRef = ref(storage, `/cv/${userId}`);
          const cvUrl = await getDownloadURL(cvRef);
          setCVDownloadUrl(cvUrl);
        } else {
          console.log("Le document n'existe pas");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur",
          error
        );
      }
    };

    fetchUserData();
  }, [userId]);

  const handleDownloadCV = () => {
    // Utilisez l'URL du CV pour déclencher le téléchargement
    window.open(cvDownloadUrl, "_blank");
  };

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
            <h2 className="text-2xl font-bold mb-4">
              {userData.name} {userData.surname}
            </h2>

            <p className="text-md text-black mb-2">Email: {userData.email}</p>
            <p className="text-md text-black mb-2">
              Numéro de téléphone: {userData.phoneNumber}
            </p>
            <p className="text-md text-black mb-2">
              GitHub: {userData.GitHubLink}
            </p>

            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">
                Compétences Techniques:
              </h3>
              <ul className="list-disc pl-4">
                {userData.competencesTechniques &&
                  userData.competencesTechniques.map((competence, index) => (
                    <li key={index}>{competence}</li>
                  ))}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Écoles:</h3>
              <ul className="list-disc pl-4">
                {userData.ecoles &&
                  userData.ecoles.map((ecole, index) => (
                    <li key={index}>{ecole}</li>
                  ))}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Expériences:</h3>
              <ul className="list-disc pl-4">
                {userData.experiences &&
                  userData.experiences.map((experience, index) => (
                    <li key={index}>{experience}</li>
                  ))}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-bold mb-2">Langues:</h3>
              <ul className="list-disc pl-4">
                {userData.langues &&
                  userData.langues.map((langue, index) => (
                    <li key={index}>{langue}</li>
                  ))}
              </ul>
            </div>

            <div className="mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleDownloadCV}
              >
                Télécharger le CV
              </button>
            </div>
          </div>
          <div className="max-w-sm mx-auto border rounded-lg flex flex-col">
            <div className="bg-blue-500 text-white p-3 text-center">
              <h2>Live Chat</h2>
            </div>
            <div className="flex-grow overflow-auto p-3 space-y-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${
                    message.author === "user"
                      ? "bg-gray-200 ml-auto"
                      : "bg-blue-100"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              ))}
            </div>
            <div className="border-t p-3">
              <div className="flex">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type a message..."
                  className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  onClick={sendMessage}
                  className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </div>

            <div className="mt-4">
              {/* Utilisez Link avec to pour spécifier l'URL vers laquelle vous souhaitez rediriger */}
              <Link
                to="/world"
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Aller quelque part
              </Link>
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
