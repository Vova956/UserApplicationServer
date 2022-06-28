const userModel = require("../Models/userModel")
const coder = require('../Coder')
const positionService = require("../Services/positionService")
const tinify = require("tinify");
const path = require("path");

class UserService {

    tinifyImage(image_name) {
        tinify.key = process.env.TINIFY_KEY;
        console.log(path.join(__dirname, "../images/users/" + image_name) + "\n\n"
            + path.join(__dirname, "../images/compressed/" + image_name))

        tinify.fromFile(path.join(__dirname, "../images/users/" + image_name)).resize({
            method: "fit",
            width: 150,
            height: 150
        }).toFile(path.join(__dirname, "../images/compressed/" + image_name))
    }

    async getUserById(id) {
        let user = await userModel.findOne({ where: { id } })
        let answer = await this.getUser(user)
        return answer
    }

    async getUser(user) {

        if (!user) {
            return null
        }

        let position = await positionService.getPositionByIndex(user.position_id)

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            position: position,
            position_id: user.position_id,
            registration_timestamp: user.timestamps,
            photo: "http://localhost:5000/" + user.image
        }
    }

    async addNewUser(name, email, phone, position_id, image) {
        console.log(image)
        const result = await userModel.create({ name, email, phone, position_id, image: image, timestamps: Date.now() })

        ////////
        this.tinifyImage(image)
        ////////

        return {
            user_id: result.id,
            message: "New user successfully registered"
        }
    }

    async getAll(page, offset, count) {
        //page = 2 count = 5 
        let currentPage = 0
        currentPage = parseInt(offset ? Math.ceil(offset / count) : page)//2

        if (offset == -1) {
            currentPage = page
        }

        const AllUsers = await userModel.findAll({})

        AllUsers.sort(function (a, b) {
            return a.id - b.id;
        });

        let pages = Math.ceil(AllUsers.length / count)//   7/5 = 2

        let nextPageNumber = currentPage == pages ? null : currentPage + 1
        let nextCountNumber = page != pages ? count : pages % count

        let previousPageNumber = page == 1 ? null : page - 1
        let previousCountNumber = page == pages ? (AllUsers.length - count) / pages : count

        var arr = []

        var users =
            await AllUsers.slice((currentPage - 1) * count,
            parseInt((currentPage - 1) * count) + parseInt(count));

        for (let i = 0; i < users.length; i++) {
            let user = await this.getUser(users[i])
            arr.push(user)
        }



        return {
            success: true,
            page: currentPage,
            total_pages: pages,
            total_users: AllUsers.length,
            count: count,
            links: {
                next_url: nextPageNumber == null ? null :
                    (process.env.ADDRESS + "/users?page=" + nextPageNumber + "&count=" + nextCountNumber),

                prev_url: previousPageNumber == null ? null :
                    (process.env.ADDRESS + "/users?page=" + previousPageNumber + "&count=" + previousCountNumber)
            },

            users: arr

        }

    }



}

module.exports = new UserService()