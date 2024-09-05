import React from "react";
import {Link} from "react-router-dom";
import "./welcomePage.css";


const WelcomePage = () => {
    return (
        <>
            <div className="welcome-page-main">
                <h1>Bienvenue!</h1>
                <br />
                <p>SVP, veillez vous connecter</p>
                <br />
                <Link to="/connexionPage">Connexion</Link>
            </div>
        </>
    );
};

export default WelcomePage;