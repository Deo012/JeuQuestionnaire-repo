exports.findLoginCredential = async (req, res, next) =>{
    try{
        res.send({
            token: 'test123'
        })
    }
    catch(err){
        console.log(err)
    }
};