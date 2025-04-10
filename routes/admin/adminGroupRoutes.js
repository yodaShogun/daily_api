const express = require("express")
const { listCategories, createCategory } = require("../../controllers/admin/adminCategoryController")

const groupRouter = express.Router()

groupRouter.get("/",listCategories)
groupRouter.post("/add", createCategory)

module.exports = groupRouter