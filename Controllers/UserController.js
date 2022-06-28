const userService = require("../Services/userService")
const  {validationResult} = require('express-validator')
const ApiError = require('../Exceptions/apiError')

class UserController {
    async addNewUser(req, res, next) {
        try {
            console.log(req.name + " " +req.phone)
            const validationErrors = validationResult(req)

            if(!validationErrors.isEmpty()){
                return next(new ApiError(422,'Validation failed',validationErrors.array()))
            }

            const {name, email, phone, position_id} = req.body

            const image =  req.image_name
            console.log("Name from Controller : " + image)

            const result = await userService.addNewUser(name ,email, phone, position_id, image)
            
            return res.status(200).json({
                success : true,
                ...result
            })
            
        } catch (err) {
            next(err)
        }

    }

    async getAll(req, res, next) {
        try {

            const validationErrors = validationResult(req)

            if(!validationErrors.isEmpty()){
                return next(new ApiError(422,'Validation failed',validationErrors.array()))
            }

            const {page , offset , count}  = req.query

            const result = await userService.getAll(page, offset, count)
            
            return res.status(200).json({
                success : true,
                ...result
            })
            
        } catch (err) {
            next(err)
        }

    }

    async getUserById(req, res, next){
        try {
            
            const validationErrors = validationResult(req)

            if(!validationErrors.isEmpty()){
                return next(new ApiError(422,'Validation failed',validationErrors.array()))
            }

            let result  = await userService.getUserById(req.params.id)
            return res.status(200).json(result)

        } catch (err) {
            next(err)
        }
    }

}

module.exports = new UserController()