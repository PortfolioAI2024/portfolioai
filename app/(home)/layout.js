import React from "react";

const Layout = ( {children} ) => {
    return (
        <main className="root">
            <div className="root-container">
                <div className="root-wrapper">{children}</div>
            </div>
        </main>
    );
};

export default Layout;
