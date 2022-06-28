const jwt = require('jsonwebtoken')
const model = require('../Models/tokenModel')

class TokenService{
    generateToken(payload){
        const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN,{expiresIn:'40m'});

        model.create({value : accessToken, isUsed : false})

        return accessToken;
    }

    async validateAccessToken(token){
        try{
            const data = jwt.verify(token,process.env.ACCESS_TOKEN)

            const tokenFromDataBase = await model.findOne({where: {value: token}})

            if(tokenFromDataBase.isUsed){
                throw new Error("Token was used more than one time")
            }
    
            await model.destroy({where : {value : token}})
            await model.create({value : token, isUsed : true})

            return data;
        }catch(e){
            return null;
        }
    }

}
module.exports = new TokenService();