import React, { useEffect, useState } from "react";
import propTypes from  'prop-types';
import "../../reset.css";
import { json } from "react-router-dom";


const ConnexionPage = ({setToken}) => {
    const [id, setID] = useState(0);
    const [name, setName] = useState("");
    const [password,setPassword] = useState("");
    const [age, setAge] = useState(0);

    //Rechercher l'utilisateur et vérifier les infos quand le form html est soummis
    const handelSubmit = async(e) => {
        e.preventDefault(); //empeche le bouton de soummettre le formulaire

        const token = await fetch("http://localhost:5000/findUser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' //indique que l'url est en json
            },
            body: JSON.stringify({name, password}) //ajouter d'autres parametres jason venant du forms
        }).then(data => data.json());

        if (!token.ok) {
            // Handle non-200 responses
            console.log("Error: ", token.statusText);
            return;
        }
        
        console.log("Token from fetch reSquest of the submit button: ", token);

        if(token){
            setToken(token);
        }
        else{
            console.log("No token reveived");
        }
    }

    //Pour ajouter le script pour les icone fontawesome
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
                <form action="" method="POST" onSubmit={handelSubmit}>
                    <i className="fa-solid fa-user"></i>
                    <input 
                        type="text" 
                        id="username" 
                        placeholder="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <i className="fa-solid fa-lock"></i>
                    <input 
                        type="text" 
                        id="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
}

ConnexionPage.propTypes = {
    setToken: propTypes.func.isRequired
}

export default ConnexionPage;