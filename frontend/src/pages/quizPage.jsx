import React, { useEffect, useState } from "react"
import ConnexionPage from "../pages/connexionPage"
import {Link, Outlet} from "react-router-dom";
import io from 'socket.io-client';
import { useAuth } from "../context/AuthProvider";
import "../../reset.css";
import "./quizPage.css"

const quizPage = () => {
    let {name} = useAuth()
    const [socket, setSocket] = useState(null); //monitor the connection socket
    let [currentQuestion, setCurrentQuestion] = useState();
    let [responseCurrentQuestion, setResponseCurrentQuestion] = useState();
    let [winner, setWinner] = useState();
    let [winnerScore, setWinnerScore] = useState(0);
    let [winnerTime, setWinnerTime] = useState(0);
    let [tempsReponseQuestion, setTempsReponseQuesiton] = useState();

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
                    setTempsReponseQuesiton(Date.now());
                });
                newSocket.on("gameEnd", (data) => {
                    setWinner(data.winner);
                    setWinnerScore(data.score);
                    setWinnerTime(data.winnerTime);
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
        console.log(`Utilisateur a répondu: ${valeur}`);
    
        // Met à jour l'état immédiatement, mais utilise la valeur directement pour l'emit (la fonction est asynchrone- not reliable for emit)
        setResponseCurrentQuestion(valeur);

        //Calcul du temps de réponse
        const delta = Date.now() - tempsReponseQuestion;        //En millisecondes
        const secondes = Math.floor(delta/1000);                //En secondes

        
        // Utiliser `valeur` pour l'emit, car setState est asynchrone et ne met pas à jour immédiatement
        socket.emit("reponseQuestion", { resp: valeur, ques: currentQuestion, nam: name, temps: secondes });
    };

    //les composants retournés
    if(!name){
        {return <ConnexionPage/>}
    }
    return (
        <>
            <div>
                <div className="container-quiz" id="y">
                    <div className="haut-page">
                        <h1 className="titre">Bienvenue dans le quiz {name}</h1>
                        <Link to="/connexionPage" className="page-connexion">Connexion page</Link>
                    </div>
                    <hr/>

                    <div className="question-area">
                        {winner == null ? (
                            
                            (currentQuestion != null)
                            ? 
                                <div>
                                    <p className="titre-question">Question:</p>
                                    <div className="question-actuel">
                                        {currentQuestion}
                                    </div>
                                    <div className="div-reponse">
                                        <button onClick={() =>handleReponse(true)}>Vrai</button>
                                        <button onClick={() =>handleReponse(false)}>Faux</button>
                                    </div>
                                </div>
                            : 
                                <div>
                                    En attente d'autre joueurs...
                                </div>

                        ):(
                            <div className="final-message">
                                <p className="text-final">La partie est terminer</p>
                                <p>Le gagnant est : {winner} avec un score de {winnerScore}</p>
                                <p>Temps du gagant en secondes: {winnerTime}s</p>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default quizPage;