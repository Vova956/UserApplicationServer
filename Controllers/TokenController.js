const tokenService = require("../Services/tokenService")

class PositionsController {
    async getToken(req, res, next) {
        try {

            const result = tokenService.generateToken({});

            return res.status(200).json({
                success : true,
                token: result
            })
           
        } catch (err) {
            next(err)
        }

    }

    async checkToken(req, res, next) {
        try {

            return res.status(200).json({
                success : true
            })
           
        } catch (err) {
            next(err)
        }

    }


}

module.exports = new PositionsController()