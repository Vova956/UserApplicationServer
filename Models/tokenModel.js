const database = require("../config/database")
const Sequelize = require("sequelize");

const Position = database.define('Tokens2',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    value : {
        type : Sequelize.STRING,
        unique : true,
    },
    isUsed : {
        type : Sequelize.BOOLEAN,
        default: false
    }
}, {timestamps : false, createdAt : false, updatedAt : false })

Position.sync()
module.exports = Position;