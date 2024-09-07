const users = require("../models/userModel");

exports.findUser = async (req, res, next) =>{
    
    try{
        console.log("From controller request body: ", req.body); //to verify if its being parsed correctly
        const {name, password} = req.body;
        console.log("From controller name in request: ", name);
        const checkName = await users.findOne({name});
        console.log("From controller backend full data: ", checkName); //to verify response
        if(checkName){
            return res.json(checkName); //reponse en json, attendue par le fetch frontend 
        }
        return res.json({message: "User not found"});//meme en json car c'Est le format attendue en frontend
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "Internal server error", error: err.message }); //retourner quelquechose quoi qu'il arrive car le frontend s'attend à ca
    };
    
};