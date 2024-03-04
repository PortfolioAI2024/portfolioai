import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "../AuthContext.jsx";
import PortfolioCV from "../components/PortfolioCV/PortfolioCV.jsx";

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
            { path: "/portfolio", element: <PortfolioCV /> },
            { path: "/chatbot", element: <Chatbot />}
        ],
    },
]);

export default router;
