import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "./firebase/init.js";
import { setDoc, doc } from "firebase/firestore";
import { AuthContext } from "./AuthContext";

const SignUp = () => {
    // Définition des états pour chaque champ du formulaire
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    // Utilisation du contexte d'authentification pour gérer le token et l'ID de l'utilisateur
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    // Gestion des changements de champ
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleConfirmPasswordChange = (e) =>
        setConfirmPassword(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);
    const handleSurnameChange = (e) => setSurname(e.target.value);
    const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            console.error("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            // Enregistrement des informations de l'utilisateur dans le contexte d'authentification
            authContext.setToken(user.accessToken);
            authContext.setUserId(user.uid);
            sessionStorage.setItem("token", user.accessToken);
            sessionStorage.setItem("userId", user.uid);

            // Enregistrement des informations de l'utilisateur dans Firestore
            await setDoc(doc(firestore, "users", user.uid), {
                email,
                name,
                surname,
                phoneNumber,
            });

            navigate("/accueil");
        } catch (error) {
            console.error(
                "Erreur lors de la création de l'utilisateur :",
                error
            );
        }
    };

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
                <div className="max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center">
                        Inscription
                    </h2>
                    <div className="mt-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Nom
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Prénom
                            </label>
                            <input
                                type="text"
                                value={surname}
                                onChange={handleSurnameChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Numéro de téléphone
                            </label>
                            <input
                                type="text"
                                value={phoneNumber}
                                onChange={handlePhoneNumberChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Courriel
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Mot de passe
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Confirmer le mot de passe
                            </label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <button
                            onClick={handleSignUp}
                            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md"
                        >
                            S'inscrire
                        </button>
                        <div className="mt-4 text-center">
                            Vous possédez un compte?{" "}
                            <Link
                                to="/login"
                                className="text-blue-500 hover:text-blue-700"
                            >
                                Connexion
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
