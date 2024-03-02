import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Portfolio from "./components/Portfolio/Portfolio";

export default function Menu() {
    const { token, setToken, setUserId, setUserType } = useContext(AuthContext);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState("overview");

    const handleSignOut = () => {
        setToken("");
        setUserId("");
        setUserType("");

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

    return (
        <>
            <aside className="w-64 text-black ml-4">
                <nav className="mt-10 flex flex-col">
                    {token && (
                        <>
                            <Link
                                to="/home"
                                className={`flex items-center py-2 px-4 ${
                                    currentPage === "overview"
                                        ? "text-green-800"
                                        : "text-black"
                                } hover:bg-gray-300 hover:text-gray-800`}
                            >
                                <b>Home</b>
                            </Link>

                            <div className="mt-auto">
                                <Link
                                    to="/profile"
                                    className={`flex items-center py-2 px-4 ${
                                        currentPage === "profile"
                                            ? "text-green-800"
                                            : "text-black"
                                    } hover:bg-gray-300 hover:text-gray-800`}
                                >
                                    <b>Profile</b>
                                </Link>

                                <Link
                                    onClick={openModal}
                                    className="flex items-center py-2 px-4 text-black hover:bg-gray-300 hover:text-gray-800 cursor-pointer"
                                >
                                    <b>Déconnexion</b>
                                </Link>
                            </div>
                        </>
                    )}
                </nav>
            </aside>

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
                    </div>
                </aside>
            )}
        </>
    );
}
