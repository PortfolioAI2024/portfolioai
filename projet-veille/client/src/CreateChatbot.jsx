import { useState, useEffect, useContext } from "react";
import { db } from "../src/firebase/init.js";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { AuthContext } from "../src/AuthContext";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function CreateChatbot(props) {
  const [response, setResponse] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    voiceType: '',
    aboutYourself: JSON.stringify(props.userDescription, null, 2)
  });
  const { userId, setCharID } = useContext(AuthContext);

  const apiKey = 'b22b5ea5b583d8763f62f2ecf7ea384c';
  const url = 'https://api.convai.com/character/create';
  function createBot() {
    const json = JSON.stringify({
      charName: formData.fullName,
      voiceType: formData.voiceType,
      backstory: JSON.stringify(props.userDescription, null, 2)
    });

    fetch(url, {
      method: 'POST',
      headers: {
        'CONVAI-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
      body: json,
    })
      .then(response => response.json())
      .then(data => {
        console.log(json)

        console.log(data);
        setResponse(data);

        const userRef = doc(db, 'users', userId);

        if (data.charID) {

          // Enregistrez le charID dans le contexte d'authentification
          setCharID(data.charID);
          console.log(data.charID)
          // Enregistrez également le charID dans le sessionStorage
          sessionStorage.setItem('charID', data.charID);
          console.log(sessionStorage.getItem("charID"))

          return setDoc(userRef, {

            charID: data.charID,
            // Ajoutez d'autres champs si nécessaire
          },
            { merge: true }
          );
        } else {
          throw new Error('Aucun charID reçu de la réponse de l\'API');
        }
      })
      .then(() => {
        console.log('Firestore mis à jour avec charID');
      })
      .catch((error) => {
        console.error('Erreur :', error);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(prevState => {
      const updatedFormData = { ...prevState, [name]: value };
      console.log(updatedFormData);
      return updatedFormData;
    });
  }

  return (
    <div>
      <div className="w-1/2 mx-auto p-8 float-right bg-black h-full">
        <h1 className="text-4xl text-white font-bold text-center mb-6">Create your chatbot</h1>
        <div className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm text-white font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white font-medium text-gray-700">
              Character Voice
            </label>
            <select id="voiceType" name="voiceType" value={formData.voiceType} onChange={handleChange}>
              <option disabled selected value> -- select a voice -- </option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
            </select>
          </div>
          <div>
            <label htmlFor="aboutYourself" className="block text-sm text-white font-medium text-gray-700">
              Say as much as possible about yourself...
            </label>
            <textarea
              id="aboutYourself"
              name="aboutYourself"
              value={JSON.stringify(props.userDescription, null, 2)}
              onChange={handleChange}
              rows="4"
              placeholder="Your message..."
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            onClick={createBot}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}