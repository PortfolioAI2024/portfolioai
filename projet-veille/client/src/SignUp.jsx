import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "./firebase/init.js";
import { setDoc, doc } from "firebase/firestore";
import { AuthContext } from "./AuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, handleUserType] = useState("");

  const { setToken, setUserId, setUserType } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = async () => {
    try {
      if (password !== confirmPassword) {
        console.error("Les mots de passe ne correspondent pas.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log("Utilisateur créé avec succès :", user);

      setToken(user.accessToken);
      setUserId(user.uid);
      setUserType(userType);

      sessionStorage.setItem("token", user.accessToken);
      sessionStorage.setItem("userId", user.uid);
      sessionStorage.setItem("userType", userType);

      console.log(`Le jeton d'authentification : ${user.accessToken}`);
      console.log(`Le userId : ${user.uid}`);
      console.log(`Le userType : ${userType}`);

      const userDocRef = doc(firestore, "users", user.uid);

      await setDoc(userDocRef, {
        email: email,
        userType: userType,
      });

      navigate("/home");
    } catch (error) {
      console.error(
        "Erreur lors de la création de l'utilisateur :",
        error.message
      );
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-2">
        <img
          src="../images/sign_up_image.png"
          alt="Description de l'image"
          className="w-full h-auto"
        />
      </div>

      <div className="w-full md:w-1/2 p-4 flex items-center">
        <div className="container mx-auto my-8">
          <center>
            <h2 className="text-2xl font-bold">Inscription</h2>
          </center>

          <div className="grid grid-cols-1 gap-2 mt-3">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Courriel :
            </label>
            <input
              type="text"
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

            <label className="text-sm font-medium text-gray-700 mb-1">
              Confirmer le mot de passe :
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="p-2 border rounded-md w-full"
            />
          </div>

          <label className="text-sm font-medium text-gray-700 mb-1">
            Type d'utilisateur :
          </label>
          <select
            value={userType}
            onChange={(e) => handleUserType(e.target.value)}
            className="p-2 border rounded-md w-full"
          >
            <option value="">Sélectionnez le type</option>
            <option value="etudiant">Étudiant</option>
            <option value="entreprise">Entreprise</option>
          </select>

          <div className="mt-6 flex justify-center">
            <button
              id="signup"
              className="bg-green-800 text-white p-3 rounded-md w-full hover:bg-green-700"
              onClick={handleSignUp}
            >
              S'inscrire
            </button>
          </div>

          <div className="mt-4 flex justify-center">
            <p>
              Vous possédez un compte?{" "}
              <Link to="/login" className="text-blue-500">
                Connexion
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
