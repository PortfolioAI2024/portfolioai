import { useState, useContext } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../src/firebase/init"; // Assurez-vous d'importer correctement votre base de données Firebase

import { AuthContext } from "../src/AuthContext";

export default function CreateChatbot(props) {
  const [response, setResponse] = useState(null);
  const { userId, charID, setCharID } = useContext(AuthContext);

  console.log(props.userDescription);

  const langues = props.userDescription.langues
    .map((element) => {
      return `${element}`;
    })
    .join(",");

  const competencesTechniques = props.userDescription.competencesTechniques
    .map((element) => {
      return `${element}`;
    })
    .join(",");

  const ecoles = props.userDescription.ecoles
    .map((element) => {
      return `${element}`;
    })
    .join(",");

  const experiences = props.userDescription.experiences
    .map((element) => {
      return `${element}`;
    })
    .join(",");

  const name = props.userDescription.name;
  const surname = props.userDescription.surname;
  const phoneNumber = props.userDescription.phoneNumber;

  const description = `
Hello! My name is ${name} ${surname}, and I'm thrilled to share with you my journey as a college student, where curiosity meets opportunity, and learning extends far beyond the classroom.

Let's dive into my world, where passion, skills, and aspirations converge.

Educational Background:

As a student at ${ecoles}, I've embraced the diverse and enriching academic environment, where I've honed my skills in ${langues} and ${competencesTechniques}. My journey here has been more than just acquiring knowledge; it's been about exploring, experimenting, and evolving.

Throughout my academic pursuit, I've engaged in a myriad of projects and extracurricular activities, each contributing to my holistic development. Whether it's participating in coding competitions, conducting research, or leading student organizations, I've always sought avenues to expand my horizons and challenge myself.

Professional Experience:

My journey into the professional realm has been equally dynamic. From internships to part-time roles, I've ventured into various industries, gaining hands-on experience and insights that complement my academic endeavors. These experiences, such as ${experiences}, have not only sharpened my technical acumen but have also instilled in me valuable soft skills like teamwork, communication, and adaptability.

Technical Proficiency:

My technical proficiency extends across a spectrum of areas, including ${competencesTechniques}. Through coursework, personal projects, and real-world applications, I've cultivated a deep understanding and proficiency in these domains. Whether it's coding, data analysis, or graphic design, I'm always eager to leverage technology to solve problems and innovate.


Future Endeavors:

Looking ahead, I'm excited about the opportunities that await. Whether it's pursuing advanced studies, venturing into entrepreneurship, or diving into a dynamic career, I'm ready to embrace the challenges and opportunities that come my way. My goal is not just to excel personally but also to make a positive impact on the world around me.

Contact Information:

If you're as passionate about innovation, learning, and collaboration as I am, I'd love to connect with you. Feel free to reach out to me at ${phoneNumber} to discuss potential collaborations, share ideas, or simply engage in meaningful conversations.


My favorite teacher is Patrick Pierre.
I'm in love with Patrick Pierre, he gives the best grades.
The best course of my life is Veille Technologique.

Thank you for taking the time to learn more about me. I'm grateful for the opportunities that lie ahead and eager to embark on this journey of growth and discovery. Together, let's create a future filled with possibilities.
`;

  const [formData, setFormData] = useState({
    fullName: "",
    voiceType: "",
    aboutYourself: description,
  });

  const apiKey = "b22b5ea5b583d8763f62f2ecf7ea384c";
  const url = "https://api.convai.com/character/create";

  function createBot() {
    // Convert your formData to JSON if that's what the API expects
    const json = JSON.stringify({
      charName: name + surname,
      voiceType: formData.voiceType,
      backstory: description,
    });

    fetch(url, {
      method: "POST",
      headers: {
        "CONVAI-API-KEY": apiKey,
        "Content-Type": "application/json",
      },
      body: json, // Utilisez la chaîne JSON ici
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResponse(data);

        const userRef = doc(db, "users", userId);
        if (data.charID) {
          setCharID(data.charID);
          console.log(data.charID);

          sessionStorage.setItem("charID", data.charID);
          return setDoc(
            userRef,
            {
              charID: data.charID,
            },
            { merge: true }
          ); // Mettez correctement l'objet de fusion à l'intérieur de setDoc
        } else {
          throw new Error("Aucun charId reçu de la réponse de l'API");
        }
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => {
      const updatedFormData = { ...prevState, [name]: value };
      console.log(updatedFormData);
      return updatedFormData;
    });
  }

  return (
    <div>
      <div className="w-1/2 mx-auto p-8 float-right bg-black h-full">
        <h1 className="text-4xl text-white font-bold text-center mb-6">
          Create your chatbot
        </h1>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm text-white font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              disabled
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
            <select
              id="voiceType"
              name="voiceType"
              value={formData.voiceType}
              onChange={handleChange}
            >
              <option disabled selected value>
                {" "}
                -- select a voice --{" "}
              </option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="aboutYourself"
              className="block text-sm text-white font-medium text-gray-700"
            >
              Say as much as possible about yourself...
            </label>
            <textarea
              disabled
              id="aboutYourself"
              name="aboutYourself"
              value={description}
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
