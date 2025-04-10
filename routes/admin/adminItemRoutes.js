const express = require("express")
const { createItem, updateItem, enableItem, disableItem, countItem, listItem } = require("../../controllers/admin/adminItemController")
const upload = require("../../config/directory")

const itemRouter = express.Router()

//fetch Data

itemRouter.get("/list",listItem)

//send data to database
itemRouter.post("/add",upload.single("image"),createItem)

//update data from database
itemRouter.put("/update/:menu", updateItem)
itemRouter.put("/enable/:menu", enableItem)
itemRouter.put("/disable/:menu", disableItem)

module.exports  = itemRouter