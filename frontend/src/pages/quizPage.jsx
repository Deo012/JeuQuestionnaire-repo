import React, { useEffect, useState } from "react"
import ConnexionPage from "../pages/connexionPage"
import {Link, Outlet} from "react-router-dom";
import io from 'socket.io-client';
import { useAuth } from "../context/AuthProvider";

const quizPage = () => {
    let {name} = useAuth()
    const [socket, setSocket] = useState(null); //monitor the connection socket
    let [currentQuestion, setCurrentQuestion] = useState();
    let [responseCurrentQuestion, setResponseCurrentQuestion] = useState();

    useEffect(() => {
        if(name)
        {
            const newSocket = io("http://localhost:5000");

            //Even listeners
            newSocket.on("connect", () => {
                console.log("Emitting enterRoom event with data:", {nickname: name, Id: newSocket.id, score: 0, hasfinished: false});
                newSocket.emit("enterRoom", {nickname: name, Id: newSocket.id, score: 0, hasfinished: false});
                newSocket.on("playerJoined", (data) => {
                    console.log("Nouveau joueur connecter: %s ,dans la salle: %s", data.newPalyerName, data.RoomInfo)
                })
                //Reception des questions
                newSocket.on("sendQuestion", (data) => {
                    setCurrentQuestion(data);
                });
            })

            setSocket(newSocket);

            return () => {
                newSocket.disconnect();
            };
        }
    }, [name]);

    //Vérification des button vrai ou faux
    function handleReponse(valeur){
        if(valeur == true){
            console.log("Utilisateur a repondu: true");
            setResponseCurrentQuestion(true);
            socket.emit("reponseQuestion", {resp: responseCurrentQuestion, ques: currentQuestion, nam: name});
        }
        else{
            console.log("Utilisateur a repondu: false");
            setResponseCurrentQuestion(false);
            socket.emit("reponseQuestion", {resp: responseCurrentQuestion, ques: currentQuestion, nam: name});
        }
    };

    //les composants retournés
    if(!name){
        {return <ConnexionPage/>}
    }
    return (
        <>
            <h1>Bienvenue dans le quiz {name}</h1>
            <Link to="/connexionPage">Connexion page</Link>
            <hr/>

            {
            (currentQuestion != null)
            ? 
                <div>
                    Question:
                    <div>
                        {currentQuestion}
                    </div>
                    <div>
                        <button onClick={() =>handleReponse(true)}>Vrai</button>
                        <button onClick={() =>handleReponse(false)}>Faux</button>
                    </div>
                </div>
            : 
                <div>
                    En attente d'autre joueurs...
                </div>
            }
        </>
    );
}

export default quizPage;