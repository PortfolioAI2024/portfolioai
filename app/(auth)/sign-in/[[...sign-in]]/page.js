"use client";
import useSWR from "swr";
import { SignIn } from "@clerk/clerk-react";
import React from "react";

const SigInPage = () => {
    return (
        <div className="auth-ctn">
            <div className="sigin-cmpt">
            <SignIn
                appearance={{
                    variables: {
                        colorPrimary: "#9C6FE4",
                    },
                }}
            />
            </div>
            <div></div>
        </div>
    );
};

export default SigInPage;
