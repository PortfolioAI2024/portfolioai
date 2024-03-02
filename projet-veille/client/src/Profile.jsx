import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { db } from "./firebase/init.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import StudentForm from "./components/StudentForm/StudentForm";

import SideMenu from "./SideMenu";

function Profile() {
    return (
        <main>
            <SideMenu />
            <StudentForm/>
        </main>
    );
}

export default Profile;
