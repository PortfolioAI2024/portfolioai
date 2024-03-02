import { useState, useEffect, useContext } from "react";
import { auth, db } from "../../firebase/init.js";
import { doc, getDoc, getDocs, collection, query } from "firebase/firestore";
import { AuthContext } from "../../AuthContext";

function Portfolio() {
    // State pour stocker les valeurs des champs du formulaire
    const [formData, setFormData] = useState({
        langues: "",
        competences: "",
        etudes: "",
        numeroTelephone: "",
        email: "",
        experiences: "",
    });

    const { userId } = useContext(AuthContext);

    // Gestionnaire d'événements pour mettre à jour les valeurs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Gestionnaire d'événements pour soumettre le formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        // Envoyer les données du formulaire où vous le souhaitez (par exemple, à votre backend)
        console.log(formData);
    };

    async function fetchUserData() {
        if (userId) {
            const userDocRef = doc(db, "users", userId);
            const userDocSnapshot = await getDoc(userDocRef);
            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                console.log("launched function");

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    email: userData.email || "", // Si l'email n'est pas trouvé, définir une chaîne vide par défaut
                }));
            } else {
                console.log("Document does not exist!");
            }
        } else {
            console.log("No user signed in!");
        }
    }

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <section className="portfolio">
            <h2 className="text-2xl font-bold mb-4">Portfolio </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="langues" className="block font-semibold">
                        Langues:
                    </label>
                    <input
                        type="text"
                        id="langues"
                        name="langues"
                        value={formData.langues}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label
                        htmlFor="competences"
                        className="block font-semibold"
                    >
                        Compétences:
                    </label>
                    <input
                        type="text"
                        id="competences"
                        name="competences"
                        value={formData.competences}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="etudes" className="block font-semibold">
                        Études:
                    </label>
                    <input
                        type="text"
                        id="etudes"
                        name="etudes"
                        value={formData.etudes}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label
                        htmlFor="numeroTelephone"
                        className="block font-semibold"
                    >
                        Numéro de téléphone:
                    </label>
                    <input
                        type="tel"
                        id="numeroTelephone"
                        name="numeroTelephone"
                        value={formData.numeroTelephone}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block font-semibold">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        readOnly // Rendre le champ d'e-mail en lecture seule
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                </div>
                <div>
                    <label
                        htmlFor="experiences"
                        className="block font-semibold"
                    >
                        Expériences:
                    </label>
                    <textarea
                        id="experiences"
                        name="experiences"
                        value={formData.experiences}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    ></textarea>
                </div>
                <div>
                    <button
                        type="submit"
                        className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300"
                    >
                        Soumettre
                    </button>
                </div>
            </form>
        </section>
    );
}

export default Portfolio;
