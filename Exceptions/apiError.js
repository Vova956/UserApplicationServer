module.exports = class ApiError extends Error{
    status
    fails

    constructor(status, messsage, fails = null){
        super(messsage)
        this.status = status
        this.fails = fails
    }
}