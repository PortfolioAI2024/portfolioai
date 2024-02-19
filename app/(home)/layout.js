"use client";
import useSWR from "swr";
import React from "react";
import Sidebar from "@/components/shared/sidebar";

const Layout = ({ children }) => {
    return (
        <main className="root">
            <Sidebar />
            <div className="root-container">
                <div className="root-wrapper">{children}</div>
            </div>
        </main>
    );
};

export default Layout;
