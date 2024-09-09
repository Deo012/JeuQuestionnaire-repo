import React, {useState} from "react"
import {Link} from "react-router-dom";
import ConnexionPage from "./connexionPage";

const QuizPage = () => {
    const[token, setToken] = useState();
    
    console.log("setToken function", setToken);

    if(!token){
        return <ConnexionPage setToken = {setToken}/>;
    }

    return (
        <>
            <h1>Bienvenue dans le quiz</h1>
            <Link to="/connexionPage">Connexion page</Link>
        </>
    );
}

export default QuizPage;