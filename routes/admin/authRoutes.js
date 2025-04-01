const express = require("express")
const { isAccountExist } = require("../../controllers/admin/authController")

const AuthRouter = express.Router()

AuthRouter.post("/",isAccountExist)

module.exports = AuthRouter