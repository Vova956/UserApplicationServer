const database = require("../config/database")
const Sequelize = require("sequelize");

const Users = database.define('Users5',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true
    },
    name : {
        type : Sequelize.STRING,
        unique : true,
        require : true
    },
    email : {
        type : Sequelize.STRING,
        unique : true,
        require : true,
    },
    phone  : {
        type : Sequelize.STRING,
        require : true
    },
    position_id : {
        type : Sequelize.INTEGER,
        require : true
    },
    image : {
        type : Sequelize.STRING,
        unique : true,
        require : true
    },
    timestamps : {
        type: Sequelize.STRING,
        require : true
    }
}, {timestamps : false, createdAt : false, updatedAt : false })

Users.sync()
module.exports = Users;