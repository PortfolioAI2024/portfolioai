import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../AuthContext";
import { db } from "../../firebase/init.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import StudentForm from "../StudentForm/StudentForm";

import SideMenu from "../SideMenu/SideMenu";

function Profile() {
    return (
        <main>
            <main className="root flex">
                <SideMenu className="side-menu" />
                <StudentForm className="StudentForm" />
            </main>
        </main>
    );
}

export default Profile;
