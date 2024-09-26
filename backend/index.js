/*
npm init
npm i socket.io
npm i express
npm i cors
npm i mongoose
npm i nodemon
*/
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const questionModel = require("./models/questionModel")
const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes")
const { Server } = require("socket.io"); //pour la communication en temps réel
const http = require("http");

const app = express();
const server = http.createServer(app); //permet de réutiliser l'instance serveur au lieu de le express s'en charger
const port = 5000;

//Les pages ayant les autorisations à accéder au backend 
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
app.use(cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173", "http://localhost:5000"],
    credentials: true
}));
app.use(express.json());

//cors et express.json appliqué avant d'ajouter les routes. L'ordre est important!!
app.use("/users", userRoutes); 
app.use("/questions", questionRoutes);

//connection a mongoose
mongoose.set("strictQuery", false);
const mongoDB = "mongodb://localhost:27017/jeuQuestionnaireDb";
main().catch((err) => console.log(err));
async function main(){
    await mongoose.connect(mongoDB)
        .then(console.log("Base de donne connecter"))
        .catch((err) => console.log(err));
};

let gameRoom = {players: [], questions: [], roomWinner: 0};
let questionsTab = [];


//Ce code se lance automatiquement à chaque connection au serveur avec la fonciton socketIOClient() dans le code de la page jsx
io.on("connection", (socket) => {
    console.log("New client connected");
    let questionActuel = 0;
    let score = 0;

    socket.on("enterRoom", async (data)=>{
        //console.log("Received enterRoom event from client:", data); // Verify data is received
        userInTable = gameRoom.players.find(player => player.name === data.nickname)
        //vérifié si le joueur n'est pas déja dans la partie
        if(!userInTable) 
        {
            gameRoom.players.push(
                {
                    playerId: data.Id, 
                    name: data.nickname, 
                    score: data.score, 
                    questionOrder: [],
                    hasfinished: data.hasfinished
                }
            );
        }
        //Rejoindre un salle de sockets (les autres joueurs)
        socket.join("room1");

        //Indique a tous les sockets dans la room qu'ils vient de se connecter
        socket.broadcast.emit("playerJoined", {newPalyerName: data.nickname, RoomInfo: socket.rooms.values});

        console.log("Nombre de joueur dans la partie",gameRoom.players.length);
        if(gameRoom.players.length >= 2){
            await distribueQuestions();

            //Envoyer les questions aux joeurs
            //console.log("Dans la table players ", data.nickname , " est a l'index: ",gameRoom.players.findIndex( player => player.name == data.nickname));
            let questionToSend = gameRoom.players[gameRoom.players.findIndex( player => player.name == data.nickname)].questionOrder[questionActuel].question;
            io.emit("sendQuestion", questionToSend);  
        }
        //console.log(gameRoom);
        
        //Vérification de la question
        socket.on("reponseQuestion", (data) => {
            //console.log("Lancement de vérification de la réponse frontend"); 
            //console.log("Nom du gars", data.nam);
            //console.log(gameRoom.players[gameRoom.players.findIndex( player => player.name == data.nam)].questionOrder[questionActuel].answer);
            let correctReponse = gameRoom.players[gameRoom.players.findIndex( player => player.name == data.nam)].questionOrder[questionActuel].answer;
            if(data.resp == correctReponse){
                score += 1;
                console.log("Nouveau score: ", score);
            }
        })
    });
        
});

async function distribueQuestions() {
    console.log("Entrer dans la fonction startGame");
    const reponse = await questionModel.find()
    
    //console.log("Voici reponse",reponse);
    reponse.forEach(i => {
        questionsTab.push(i)
    })
    //console.log("Question Tableau donne:", questionsTab);

    gameRoom.players.forEach((player) => {
        player.questionOrder = shuffle([...questionsTab]); // Use spread operator (...) to clone the array before shuffling
    });

    //L'ordre des questions de chaque joueurs
    gameRoom.players.forEach((player) => {
        console.log("Player ", player.name, " questions:", player.questionOrder);
    });
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

server.listen(port, ()=>{
    console.log(`Serveur is running on port: ${port}`);
});
