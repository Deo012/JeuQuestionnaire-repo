import React, { useEffect } from "react";
import "../../reset.css";

const ConnexionPage = () => {
    useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://kit.fontawesome.com/f2385fabca.js";
        script.crossOrigin = "anonymous";
        script.async = true;

        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <>
            <div className="connexion-page-main">
                <h1>Login</h1>
                <form action="">
                    <i className="fa-solid fa-user"></i>
                    <input type="text" id="username" placeholder="Username"/>
                    <i className="fa-solid fa-lock"></i>
                    <input type="text" id="password" placeholder="Password"/>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
}

export default ConnexionPage;