import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { db } from "./firebase/init.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

import SideMenu from "./SideMenu";

function Profile() {
  return (
    <div className="flex">
      <SideMenu />
      <div className="flex-1 p-10">
        <div className="App">
          <header className="App-header">
            <h1>Profile</h1>
          </header>
        </div>
      </div>
    </div>
  );
}

export default Profile;
