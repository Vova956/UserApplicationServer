const Router = require('express')

const router = new Router()
const positionsController = require('../Controllers/PositionsController')
const TokenController = require('../Controllers/TokenController')
const UserController = require('../Controllers/UserController')

const TokenMiddleware = require('../Middlewares/tokenMiddleware')
const uploadMiddleware = require('../Middlewares/uploadMiddleware')
const { body, query, param } = require('express-validator')


router.get("/token", TokenController.getToken)
router.post("/checkToken",TokenMiddleware, TokenController.checkToken)//to be deleted


router.post("/users",uploadMiddleware,

body('name').isLength({min : 2, max : 60}).
withMessage("The name must be at least 2 characters."),

body('email').isLength({min : 2, max : 100}).bail().withMessage("Email shoun contain 2-100 characters.").
matches(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/).
withMessage("The email must be a valid email address."),

body('phone').
not().isEmpty().bail().withMessage("The phone field is required.").
matches(/^[\+]{0,1}380([0-9]{9})$/).
withMessage("The phone number must be a valid phone number."),

body('position_id').
not().isEmpty().bail().withMessage("The position_id field is required.").
isInt().bail().withMessage("The position id must be an integer.").toInt(10).
custom((value, {}) => value >=1).withMessage("The position_id must be bigger than 1"),

UserController.addNewUser)

router.get("/users",
query('page')
.if(query('offset').not().exists())
.not().isEmpty().bail().withMessage("The page field is required")
.isInt().bail().withMessage("The page must be a valid integer"),

query('offset')
.default(-1)
.isInt().bail().withMessage("The offset must be a valid integer"),

query('count')
.not().isEmpty().bail().withMessage("The count field is required")
.isInt().bail().withMessage("The count must be a valid integer"),

UserController.getAll)


router.get("/users/:id",
param('id')
.not().isEmpty().bail().withMessage("The id field is required")
.isInt().bail().withMessage("The id must be a valid integer"),

UserController.getUserById)


router.get("/positions",positionsController.getAllPositions)
router.post("/positions",positionsController.addPosition)

module.exports = router
