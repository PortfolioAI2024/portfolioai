import { useState, useEffect, useContext } from "react";
import { db } from "../../firebase/init.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../AuthContext";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import CreateChatbot from "../../CreateChatbot.jsx";

function Portfolio() {
    // State pour stocker les valeurs des champs du formulaire
    const [formData, setFormData] = useState({
        langues: [],
        competencesTechniques: [],
        ecoles: [],
        phoneNumber: "",
        email: "",
        experiences: [],
        GitHubLink: "",
        userDescription: "", // Nouveau champ ajouté
    });

    // Add this new state to track changed fields
    const [changedFields, setChangedFields] = useState({});


    const { userId } = useContext(AuthContext);
    const [newLangue, setNewLangue] = useState("");
    const [newCompetenceTechnique, setNewCompetenceTechnique] = useState("");
    const [newEcole, setNewEcole] = useState("");
    const [newExperience, setNewExperience] = useState("");
    const commonLanguages = [
        "English",
        "Chinese",
        "Hindi",
        "Spanish",
        "French",
        "Arabic",
        "Bengali",
        "Russian",
        "Portuguese",
        "Indonesian"
    ];
    

    // Gestionnaire d'événements pour mettre à jour les valeurs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
        setChangedFields(prevFields => ({
            ...prevFields,
            [name]: true, // Mark the field as changed
        }));
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
            setNewLangue("");
            alert("Langue added: " + newLangue.trim());
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

    const handleAddCompetenceTechnique = () => {
        if (newCompetenceTechnique.trim() !== "") {
            setFormData({
                ...formData,
                competencesTechniques: [
                    ...formData.competencesTechniques,
                    newCompetenceTechnique.trim(),
                ],
            });
            setNewCompetenceTechnique("");
        }
    };

    const handleRemoveCompetenceTechnique = (index) => {
        const updatedCompetenceTechnique = [...formData.competencesTechniques];
        updatedCompetenceTechnique.splice(index, 1);
        setFormData({
            ...formData,
            competencesTechniques: updatedCompetenceTechnique,
        });
    };

    const handleAddEcole = () => {
        if (newEcole.trim() !== "") {
            setFormData({
                ...formData,
                ecoles: [...formData.ecoles, newEcole.trim()],
            });
            setNewEcole("");
        }
    };

    const handleRemoveEcole = (index) => {
        const updatedEcole = [...formData.ecoles];
        updatedEcole.splice(index, 1);
        setFormData({
            ...formData,
            ecoles: updatedEcole,
        });
    };

    const handleAddExperience = () => {
        if (newExperience.trim() !== "") {
            setFormData({
                ...formData,
                experiences: [...formData.experiences, newExperience.trim()],
            });
            setNewExperience("");
        }
    };

    const handleRemoveExperience = (index) => {
        const updatedExperience = [...formData.experiences];
        updatedExperience.splice(index, 1);
        setFormData({
            ...formData,
            experiences: updatedExperience,
        });
    };

    // Gestionnaire d'événements pour soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userDocRef = doc(db, "users", userId);
            await updateDoc(userDocRef, formData);
            console.log("Données envoyées avec succès à Firestore !");
    
            // Create a list of fields that were updated
            const updatedFieldsList = Object.keys(changedFields)
                .map(field => {
                    // Convert field names to a more readable format if needed
                    switch(field) {
                        case 'langues': return 'Languages';
                        case 'competencesTechniques': return 'Technical Skills';
                        case 'ecoles': return 'Schools';
                        case 'phoneNumber': return 'Phone Number';
                        case 'email': return 'Email';
                        case 'experiences': return 'Experiences';
                        case 'GitHubLink': return 'GitHub Link';
                        case 'userDescription': return 'User Description';
                        default: return field; // Default case if no custom name is needed
                    }
                })
                .join(', ');
    
            // Display a professional alert message
            if(updatedFieldsList) {
                alert(`The following information in your portfolio was updated successfully: ${updatedFieldsList}.`);
            } else {
                alert("Your portfolio has been updated successfully.");
            }
    
            // Reset changed fields after successful submission
            setChangedFields({});
        } catch (error) {
            console.error("Erreur lors de l'envoi des données à Firestore :", error);
            alert("An error occurred while updating your portfolio. Please try again.");
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
                    userDescription: userData.userDescription || "",
                    langues: userData.langues || [], // Si les langues ne sont pas trouvées, définir un tableau vide par défaut
                    competencesTechniques: userData.competencesTechniques || [],
                    ecoles: userData.ecoles || [],
                    phoneNumber: userData.phoneNumber || "", // Si le numéro de téléphone n'est pas trouvé, définir une chaîne vide par défaut
                    email: userData.email || "", // Si l'email n'est pas trouvé, définir une chaîne vide par défaut
                    experiences: userData.experiences || [],
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
        <section className="portfolio mx-auto">
            <form onSubmit={handleSubmit} className="mt-4">
                <h1 className="text-4xl font-bold">Bienvenue à PortfolioAI </h1>



                <div>
    <label htmlFor="userDescription" className="block font-semibold">
        Description de l'utilisateur :
    </label>
    <input
                            type="text"

        id="userDescription"
        name="userDescription"
        value={formData.userDescription}
        onChange={handleChange}
        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
</div>


<div className="items-center">
    <label htmlFor="langues" className="block">
        Langues:
    </label>
    <span className="flex">
        <select
            id="langues"
            name="langues"
            value={newLangue}
            onChange={(e) => setNewLangue(e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
            <option value="">Select a Language</option>
            {commonLanguages.map((language) => (
                <option key={language} value={language}>{language}</option>
            ))}
        </select>
        <button
            type="button"
            onClick={handleAddLangue}
            className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300 ml-2 inline"
        >
            Add Language
        </button>
    </span>
</div>


                <ul className="inline">
                    {formData.langues.map((langue, index) => (
                        <li key={index} className="flex flex-row">
                            <button
                                type="button"
                                onClick={() => handleRemoveLangue(index)}
                                className="m-1 bg-red-500 text-white font-semibold py-1 px-2 ml-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                            >
                                Supprimer
                            </button>
                            <p className="m-1">{langue}</p>
                        </li>
                    ))}
                </ul>


                <div className="items-center">
                    <label htmlFor="competencesTechniques" className="block">
                        competencesTechniques:
                    </label>
                    <span className="flex">
                        <input
                            type="text"
                            id="competencesTechniques"
                            name="competencesTechniques"
                            value={newCompetenceTechnique}
                            onChange={(e) =>
                                setNewCompetenceTechnique(e.target.value)
                            }
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <button
                            type="button"
                            onClick={handleAddCompetenceTechnique}
                            className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300 ml-2 inline"
                        >
                            Ajouter
                        </button>
                    </span>
                </div>

                <ul className="inline">
                    {formData.competencesTechniques.map(
                        (competenceTechniques, index) => (
                            <li key={index} className="flex flex-row">
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleRemoveCompetenceTechnique(index)
                                    }
                                    className="m-1 bg-red-500 text-white font-semibold py-1 px-2 ml-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                                >
                                    Supprimer
                                </button>
                                <p className="m-1">{competenceTechniques}</p>
                            </li>
                        )
                    )}
                </ul>

                <div className="items-center">
                    <label htmlFor="ecoles" className="block font-semibold">
                        Ecoles:
                    </label>
                    <span className="flex">
                        <input
                            type="text"
                            id="ecoles"
                            name="ecoles"
                            value={newEcole}
                            onChange={(e) => setNewEcole(e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <button
                            type="button"
                            onClick={handleAddEcole}
                            className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300 ml-2 inline"
                        >
                            Ajouter
                        </button>
                    </span>
                </div>

                <ul className="inline">
                    {formData.ecoles.map((ecole, index) => (
                        <li key={index} className="flex flex-row">
                            <button
                                type="button"
                                onClick={() => handleRemoveEcole(index)}
                                className="m-1 bg-red-500 text-white font-semibold py-1 px-2 ml-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                            >
                                Supprimer
                            </button>
                            <p className="m-1">{ecole}</p>
                        </li>
                    ))}
                </ul>


                <div className="items-center">
                    <label htmlFor="experiences" className="block font-semibold">
                        Experiences:
                    </label>
                    <span className="flex">
                        <input
                            type="text"
                            id="experiences"
                            name="experiences"
                            value={newExperience}
                            onChange={(e) => setNewExperience(e.target.value)}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <button
                            type="button"
                            onClick={handleAddExperience}
                            className="bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-300 ml-2 inline"
                        >
                            Ajouter
                        </button>
                    </span>
                </div>

                <ul className="inline">
                    {formData.experiences.map((experience, index) => (
                        <li key={index} className="flex flex-row">
                            <button
                                type="button"
                                onClick={() => handleRemoveExperience(index)}
                                className="m-1 bg-red-500 text-white font-semibold py-1 px-2 ml-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                            >
                                Supprimer
                            </button>
                            <p className="m-1">{experience}</p>
                        </li>
                    ))}
                </ul>


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
                    <label htmlFor="GitHubLink" className="block font-semibold">
                        GitHub User:
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
            <CreateChatbot  userDescription={formData} />
        </section>
    );
}

export default Portfolio;
