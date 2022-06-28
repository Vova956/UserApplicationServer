const positionService = require("../Services/positionService")

class PositionsController {
    async getAllPositions(req, res, next) {
        try {
            const positions = await positionService.getAllPositions();
            
            return res.status(200).json({
                success : true,
                positions
            })
            
        } catch (err) {
            next(err)
        }

    }

    async addPosition(req, res, next) {
        try {

            const {position} = req.body

            await positionService.addPosition(position)

            return res.status(200).json({success : true})

        } catch (err) {
            next(err)
        }
    }

}

module.exports = new PositionsController()