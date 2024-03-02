import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "../AuthContext.jsx";

import App from "../App.jsx";
import NoMatch from "../NoMatch.jsx";
import Root from "../Root.jsx";
import Login from "../Login.jsx";
import SignUp from "../SignUp.jsx";
import Profile from "../Profile.jsx";

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
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
]);

export default router;
