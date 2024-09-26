const questionModel = require("../models/questionModel");

exports.getAllQuestions = async (req, res) => {
    try{
        const questionsRequest = await questionModel.find({ }).exec();
        return res.json(questionsRequest);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "Internal server error", error: err.message }); //retourner quelquechose quoi qu'il arrive car le frontend s'attend à ca
    };
}