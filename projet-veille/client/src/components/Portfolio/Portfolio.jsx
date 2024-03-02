import { useState, useEffect, useContext } from "react";
import { db } from "../../firebase/init.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../AuthContext";
import { getStorage, ref, uploadBytes } from "firebase/storage";

function Portfolio() {
    // State pour stocker les valeurs des champs du formulaire
    const [formData, setFormData] = useState({
        langues: [],
        competences: "",
        etudes: "",
        phoneNumber: "",
        email: "",
        experiences: "",
        GitHubLink: "",
    });

    const { userId } = useContext(AuthContext);
    const [newLangue, setNewLangue] = useState(""); // Nouvelle langue à ajouter

    // Gestionnaire d'événements pour mettre à jour les valeurs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const storage = getStorage();
        const storageRef = ref(storage, `cv/${userId}`); // Définir le chemin où vous souhaitez stocker le fichier (dans ce cas, dans un dossier 'cv' avec le nom de l'utilisateur comme nom de fichier)

        try {
            await uploadBytes(storageRef, file);
            console.log("CV téléchargé avec succès !");
        } catch (error) {
            console.error("Erreur lors du téléchargement du CV :", error);
        }
    };

    const handleAddLangue = () => {
        if (newLangue.trim() !== "") {
            setFormData({
                ...formData,
                langues: [...formData.langues, newLangue.trim()],
            });
            setNewLangue(""); // Réinitialiser le champ de saisie de la nouvelle langue
        }
    };

    const handleRemoveLangue = (index) => {
        const updatedLangues = [...formData.langues];
        updatedLangues.splice(index, 1);
        setFormData({
            ...formData,
            langues: updatedLangues,
        });
    };

    // Gestionnaire d'événements pour soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userDocRef = doc(db, "users", userId);
            await updateDoc(userDocRef, formData); // Met à jour le document avec les nouvelles données du formulaire
            console.log("Données envoyées avec succès à Firestore !");
        } catch (error) {
            console.error(
                "Erreur lors de l'envoi des données à Firestore :",
                error
            );
        }
    };

    async function fetchUserData() {
        if (userId) {
            const userDocRef = doc(db, "users", userId);
            const userDocSnapshot = await getDoc(userDocRef);
            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                console.log("launched function");

                setFormData({
                    langues: userData.langues || [], // Si les langues ne sont pas trouvées, définir un tableau vide par défaut
                    competences: userData.competences || "",
                    etudes: userData.etudes || "",
                    phoneNumber: userData.phoneNumber || "", // Si le numéro de téléphone n'est pas trouvé, définir une chaîne vide par défaut
                    email: userData.email || "", // Si l'email n'est pas trouvé, définir une chaîne vide par défaut
                    experiences: userData.experiences || "",
                    GitHubLink: userData.GitHubLink || "",
                });
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
            <h1 className="f- ">Bienvenue à PortfolioAI </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="langues" className="">
                        Langues:
                    </label>
                    <input
                        type="text"
                        id="langues"
                        name="langues"
                        value={newLangue}
                        onChange={(e) => setNewLangue(e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                    <button
                        type="button"
                        onClick={handleAddLangue}
                        className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300 ml-2"
                    >
                        Ajouter
                    </button>
                </div>
                {/* Affichage des langues saisies */}
                <ul>
                    {formData.langues.map((langue, index) => (
                        <li key={index}>
                            {langue}
                            <button
                                type="button"
                                onClick={() => handleRemoveLangue(index)}
                                className="bg-red-500 text-white font-semibold py-1 px-2 ml-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                            >
                                Supprimer
                            </button>
                        </li>
                    ))}
                </ul>
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
                        htmlFor="phoneNumber"
                        className="block font-semibold"
                    >
                        Numéro de téléphone:
                    </label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        readOnly
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
                    <label htmlFor="GitHubLink" className="block font-semibold">
                        GitHub Link:
                    </label>
                    <input
                        type="text"
                        id="GitHubLink"
                        name="GitHubLink"
                        value={formData.GitHubLink}
                        onChange={handleChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
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

            <div>
                <label htmlFor="cv" className="block font-semibold">
                    Télécharger votre CV :
                </label>
                <input
                    type="file"
                    id="cv"
                    name="cv"
                    onChange={handleFileUpload}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
            </div>
        </section>
    );
}

export default Portfolio;
