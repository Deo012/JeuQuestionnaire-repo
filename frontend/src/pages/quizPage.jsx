import React from "react"
import {Link} from "react-router-dom";

const quizPage = () => {
    return (
        <>
            <h1>Bienvenue dans le quiz</h1>
            <Link to="/connexionPage">Connexion page</Link>
        </>
    );
}

export default quizPage;