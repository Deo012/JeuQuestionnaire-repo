import React from "react";
import {Link} from "react-router-dom";
import "../../reset.css";
import "./welcomePage.css";


const WelcomePage = () => {
    return (
        <>
            <div className="welcome-page-main">
                <dir className="centre">
                    <h1>Bienvenue au site Jeu Questionnaire!</h1>
                    <br />
                    <p>SVP, veillez vous connecter</p>
                    <br />
                    <Link to="/connexionPage">Connexion</Link>
                </dir>
            </div>
        </>
    );
};

export default WelcomePage;