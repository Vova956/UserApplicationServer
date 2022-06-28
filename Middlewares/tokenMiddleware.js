const tokenService = require("../Services/tokenService");
const model = require("../Models/tokenModel")


module.exports = async (req,res,next) => {
    try{
        const authHeader = req.headers.token;

        console.log(authHeader)

        if(!authHeader){
            throw new Error('No Token')
        }

        const accessToken = authHeader;
        if(!accessToken){
            throw new Error("Auth token invalid")
        }
       
        const userData = await tokenService.validateAccessToken(accessToken);
        if(userData == null){
            throw new Error("Invalid token")
        }


        req.user = userData

        return next();
    }catch(e){

        return next(e);
    }

}