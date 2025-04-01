const express = require("express")
const { allgroup } = require("../../controllers/client/groupController")

const groupRouter = express.Router()

groupRouter.get("/",allgroup)

module.exports = groupRouter