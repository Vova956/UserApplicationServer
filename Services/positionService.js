const positionModel = require("../Models/positionsModel")

class PositionService{

    async getAllPositions(){
        const result  = await positionModel.findAll()
        console.log(result)
        return result
    }

    async addPosition(name){
        await positionModel.create({name})  
    }

    async getPositionByIndex(index){
        let position = await positionModel.findAll({ id : index})
        return position[0].name
    }

}

module.exports = new PositionService()