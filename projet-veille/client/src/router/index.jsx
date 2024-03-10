import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "../AuthContext.jsx";
import CV from "../components/CV/CV.jsx";

import App from "../App.jsx";
import NoMatch from "../NoMatch.jsx";
import Root from "../Root.jsx";
import Login from "../components/Login/Login.jsx";
import SignUp from "../SignUp.jsx";
import Profile from "../components/Profile/Profile.jsx";
import CreateChatbot from "../CreateChatbot.jsx";
import Home from "../components/home/Home.jsx";
import Chatbot from "../components/Chatbot/Chatbot.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthProvider>
                <Root />
            </AuthProvider>
        ),
        errorElement: <NoMatch />,
        children: [
            { path: "/", element: <App /> }, 
            { path: "/accueil", element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <SignUp /> },
            { path: "/profil", element: <Profile /> },
            { path: "/createchatbot", element: <CreateChatbot /> },
            { path: "/portfolio", element: <CV /> },
            { path: "/chatbot/:charID", element: <Chatbot/>}
        ],
    },
]);

export default router;
