import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Portfolio from "./components/Portfolio/Portfolio";
import { navLinks } from "./constants/index";
import { useLocation } from "react-router-dom";

export default function Menu() {
    const { setToken, setUserId } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState("overview");

    const handleSignOut = () => {
        setToken("");
        setUserId("");

        sessionStorage.clear();

        alert("Déconnexion réussie !");

        navigate("/");
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath === "/home") {
            setCurrentPage("overview");
        } else if (currentPath === "/profile") {
            setCurrentPage("profile");
        }
    }, []);

    const location = useLocation();
    const { pathname } = location;

    return (
        <aside className="sidebar">
            <div className="sidebar flex size-full flex-col gap-4">
                <Link href="/" className="sidebar-logo" />
                <nav className="sidebar-nav">
                    <ul className="sidebar-nav_elements">
                        {navLinks.slice(0, 6).map((link) => {
                            const isActive = link.route === pathname;
                            return (
                                <li
                                    key={link.route}
                                    className={`sidebar-nav_element bold ${
                                        isActive
                                            ? "bg-purple-gradient text-background"
                                            : "text-purple-700"
                                    }`}
                                >
                                    <Link
                                        className={`${
                                            isActive
                                                ? "bg-purple-gradient text-background"
                                                : "text-purple-700"
                                        }`}
                                        href={link.route}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <ul>
                        {navLinks.slice(6).map((link) => {
                            const isActive = link.route === pathname;
                            return (
                                <li
                                    key={link.route}
                                    className={`sidebar-nav_element group ${
                                        isActive
                                            ? "bg-purple-gradient text-background"
                                            : "text-purple-700"
                                    }`}
                                >
                                    <Link
                                        className={`sidebar-nav_element group ${
                                            isActive
                                                ? "bg-purple-gradient text-background"
                                                : "text-purple-700"
                                        }`}
                                        href={link.route}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                        <Link
                            onClick={openModal}
                            className={`block py-8 ${
                                pathname != "/logout"
                                    ? "text-purple-700"
                                    : "bg-purple-gradient text-background"
                            }`}
                        >
                            <b>Déconnexion</b>
                        </Link>
                    </ul>
                </nav>
            </div>
            {showModal && (
                <aside className="sidemenu fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-md"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3
                                            className="text-lg leading-6 font-medium text-gray-900"
                                            id="modal-headline"
                                        >
                                            Êtes-vous sûr de vouloir vous
                                            déconnecter ?
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={() => {
                                        handleSignOut();
                                        closeModal();
                                    }}
                                    type="button"
                                    className="mt-3 w-full h-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Déconnexion
                                </button>
                                <button
                                    onClick={closeModal}
                                    type="button"
                                    className="mt-3 w-full h-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                        <Portfolio />
                    </div>

                    <div className="flex size-full flex-col gap-4">
                        <Link href="/" className="sidebar-logo" />
                        <nav className="sidebar-nav">
                            <ul className="sidebar-nav_elements">
                                {navLinks.slice(0, 6).map((link) => {
                                    const isActive = link.route === pathname;
                                    return (
                                        <li
                                            key={link.route}
                                            className={`sidebar-nav_element group ${
                                                isActive
                                                    ? "bg-purple-gradient text-background"
                                                    : "text-purple-700"
                                            }`}
                                        >
                                            <Link
                                                className="sidebar-link"
                                                href={link.route}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                            <ul>
                                {navLinks.slice(6).map((link) => {
                                    const isActive = link.route === pathname;
                                    return (
                                        <li
                                            key={link.route}
                                            className={`sidebar-nav_element group ${
                                                isActive
                                                    ? "bg-purple-gradient text-input"
                                                    : "text-purple-700"
                                            }`}
                                        >
                                            <Link
                                                className="sidebar-link"
                                                href={link.route}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </div>
                </aside>
            )}
        </aside>
    );
}
