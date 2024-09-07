import React, { useEffect, useState } from "react";
import "../../reset.css";

const ConnexionPage = () => {
    const [id, setID] = useState(0);
    const [name, setName] = useState("");
    const [password,setPassword] = useState("");
    const [age, setAge] = useState(0);

    //Rechercher l'utilisateur et vérifier les infos quand le form html est soummis
    const handelSubmit = async(e) => {
        e.preventDefault(); //empeche le bouton de soummettre le formulaire

        const fetchRequest = await fetch("http://localhost:5000/findUser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' //indique que l'url est en json
            },
            body: JSON.stringify({name, password}) //ajouter d'autres parametres jason venant du forms
        });

        if (!fetchRequest.ok) {
            // Handle non-200 responses
            console.log("Error: ", fetchRequest.statusText);
            return;
        }
        
        const verifyUser = await fetchRequest.json();
        console.log("From fetch request of the submit button: ", fetchRequest);

        //Résoud selon la réponse recu
        if(verifyUser.message === "User not found"){ //condition vérifie le type de donné et le contenue
            console.log("User not found");
        }
        else {
            console.log("User found: ", verifyUser);
            
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
                <form action="" method="POST">
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
                    <button type="submit" onClick={handelSubmit}>Login</button>
                </form>
            </div>
        </>
    );
}

export default ConnexionPage;