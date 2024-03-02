import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/init.js";
import { doc, getDoc, getDocs, collection, query } from "firebase/firestore";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setToken, setUserId, setPlaidAccessToken, setitemId } =
        useContext(AuthContext);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConnexion = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            console.log("Utilisateur connecté avec succès :", user);

            setToken(user.accessToken);
            setUserId(user.uid);

            sessionStorage.setItem("token", user.accessToken);
            sessionStorage.setItem("userId", user.uid);

            console.log(`Le jeton d'authentification : ${user.accessToken}`);
            console.log(`Le userId : ${user.uid}`);

            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                console.log(userData);

                const itemsRef = collection(userDocRef, "items");
                const itemsQuery = query(itemsRef);
                const itemsSnapshot = await getDocs(itemsQuery);

                if (itemsSnapshot.docs.length > 0) {
                    const firstItemDoc = itemsSnapshot.docs[0];

                    console.log("firstItemDoc:", firstItemDoc);

                    const itemData = firstItemDoc.data();

                    if (itemData.PlaidAccessToken) {
                        setPlaidAccessToken(itemData.PlaidAccessToken);
                        sessionStorage.setItem(
                            "plaidAccessToken",
                            itemData.PlaidAccessToken
                        );
                        console.log(
                            `Le PlaidAccessToken : ${itemData.PlaidAccessToken}`
                        );
                    }

                    const itemId = firstItemDoc.id;
                    setitemId(itemId);
                    sessionStorage.setItem("itemId", itemId);
                    console.log(`Le itemId : ${firstItemDoc.id}`);
                }
            }

            navigate("/home");
        } catch (error) {
            console.error(
                "Erreur lors de la connexion de l'utilisateur :",
                error.message
            );
        }
    };

    return (
        <div className="login flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-2">
                <img
                    src="../images/login_image.png"
                    alt="Description de l'image"
                    className="w-full h-auto"
                />
            </div>

            <div className="w-full md:w-1/2 p-4 flex items-center">
                <div className="container mx-auto my-8">
                    <center>
                        <h2 className="text-2xl font-bold">Connexion</h2>
                    </center>

                    <div className="grid grid-cols-1 gap-2 mt-3">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Courriel :
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            className="p-2 border rounded-md w-full"
                        />

                        <label className="text-sm font-medium text-gray-700 mb-1">
                            Mot de passe :
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            className="p-2 border rounded-md w-full"
                        />
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            id="connexion"
                            className="bg-green-800 text-white p-3 rounded-md w-full hover:bg-green-700"
                            onClick={handleConnexion}
                        >
                            Se connecter
                        </button>
                    </div>

                    <div className="mt-4 flex justify-center">
                        <p>
                            Vous ne possédez pas de compte?{" "}
                            <Link to="/signup" className="text-blue-500">
                                Inscription
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
