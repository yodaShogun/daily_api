const express = require("express")
const {createAccount, logIntoAccount } = require("../../controllers/admin/authController")

const AuthRouter = express.Router()

AuthRouter.post("/",createAccount)
AuthRouter.post("/login",logIntoAccount)

module.exports = AuthRouter