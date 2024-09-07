/*
npm init
npm i socket.io
npm i express
npm i cors
npm i mongoose
*/
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 5000;

//Les pages ayant les autorisations à accéder au backend 
app.use(cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true
}));
app.use(express.json());

//cors et express.json appliqué avant d'ajouter les routes. L'ordre est important!!
app.use("/", userRoutes); 

//connection a mongoose
mongoose.set("strictQuery", false);
const mongoDB = "mongodb://localhost:27017/jeuQuestionnaireDb";
main().catch((err) => console.log(err));
async function main(){
    await mongoose.connect(mongoDB)
        .then(console.log("Base de donne connecter"))
        .catch((err) => console.log(err));
};
app.listen(port, ()=>{
    console.log(`Serveur is running on port: ${port}`);
});


