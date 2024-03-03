import React, { useState, useEffect, useContext } from "react";
import { db } from "../../firebase/init.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { AuthContext } from "../../AuthContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function StudentForm() {
    const { userId } = useContext(AuthContext);
    const [userData, setUserData] = useState({ email: "", phoneNumber: "" });
    const [errors, setErrors] = useState({ email: "", phoneNumber: "" });
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(null);

    // Function to fetch profile image URL from Firebase Storage
    const fetchProfileImageUrl = async () => {
        const storage = getStorage();
        const imageRef = ref(storage, `profilPicture/${userId}`);
        try {
            const url = await getDownloadURL(imageRef);
            setProfileImageUrl(url);
        } catch (error) {
            console.error("Error fetching profile image URL:", error);
        }
    };

    useEffect(() => {
        // Function to fetch user data from Firestore
        const fetchUserData = async () => {
            try {
                const userDoc = await getDoc(doc(db, "users", userId));
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        // Call the fetchUserData function when the component mounts
        fetchUserData();
        // Call the fetchProfileImageUrl function when the component mounts
        fetchProfileImageUrl();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        setProfileImage(imageFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        let formIsValid = true;
        const newErrors = { email: "", phoneNumber: "" };

        // Email validation
        if (!userData.email.match(/^\S+@\S+\.\S+$/)) {
            newErrors.email = "Please enter a valid email address";
            formIsValid = false;
        }

        // Phone number validation
        if (userData.phoneNumber.trim() === "") {
            newErrors.phoneNumber = "Phone number is required";
            formIsValid = false;
        }

        if (!formIsValid) {
            setErrors(newErrors);
            return;
        }

        // Update user data in Firestore
        try {
            await updateDoc(doc(db, "users", userId), userData);
            console.log("User data updated successfully!");

            // Upload profile image to Firebase Storage
            if (profileImage) {
                const storage = getStorage();
                const imageRef = ref(storage, `profilPicture/${userId}`);
                await uploadBytes(imageRef, profileImage);
                console.log("Profile image uploaded successfully!");

                // Fetch updated profile image URL
                fetchProfileImageUrl();
            }

            // Reset errors
            setErrors({ email: "", phoneNumber: "" });
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    return (
        <section className="student mx-auto">
            <form onSubmit={handleSubmit} className="mt-4">
                <h1 className="text-2xl font-bold text-white mb-4">
                    Edit Profile
                </h1>
                <div className="mb-4">
                    <label className="text-white">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="rounded-md bg-gray-200 p-2"
                    />
                    {errors.email && (
                        <p className="text-red-500">{errors.email}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="text-white">Phone Number:</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleChange}
                        className="rounded-md bg-gray-200 p-2"
                    />
                    {errors.phoneNumber && (
                        <p className="text-red-500">{errors.phoneNumber}</p>
                    )}
                </div>
                {profileImageUrl && (
                    <div className="mb-4">
                        <label className="text-white">Profile Image:</label>
                        <img
                            src={profileImageUrl}
                            alt="Profile"
                            className="rounded-md"
                        />
                    </div>
                )}
                <div className="mb-4">
                    <label className="text-white">
                        Upload New Profile Image:
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="bg-gray-200 p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </section>
    );
}

export default StudentForm;
