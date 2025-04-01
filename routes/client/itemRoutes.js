const express = require("express")
const { menuByCategory, allMenu } = require("../../controllers/client/itemController")

const itemRouter = express.Router()

itemRouter.get("/",allMenu)
itemRouter.get("/:group", menuByCategory)

module.exports  = itemRouter