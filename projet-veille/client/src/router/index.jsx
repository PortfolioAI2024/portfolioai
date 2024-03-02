import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "../AuthContext.jsx";

import App from "../App.jsx";
import NoMatch from "../NoMatch.jsx";
import Root from "../Root.jsx";
import Login from "../components/Login/Login.jsx";
import SignUp from "../SignUp.jsx";
import Profile from "../Profile.jsx";
import CreateChatbot from "../CreateChatbot.jsx";
import Home from "../components/home/Home.jsx";

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
            { path: "/home", element: <Home /> },
            { path: "/login", element: <Login /> },
            { path: "/signup", element: <SignUp /> },
            { path: "/profile", element: <Profile /> },
            { path: "/createchatbot", element: <CreateChatbot /> },
        ],
    },
]);

export default router;
