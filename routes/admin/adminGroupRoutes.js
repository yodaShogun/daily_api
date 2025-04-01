const express = require("express")
const { listCategories } = require("../../controllers/admin/adminCategoryController")

const groupRouter = express.Router()

groupRouter.get("/",listCategories)

module.exports = groupRouter