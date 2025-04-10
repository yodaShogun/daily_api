adminCategoryReq = require("../../config/init")

const listCategories = async(req,res)=>{
    try{
        
        const [data] = await adminCategoryReq.query("SELECT * FROM category")

        if(!data){
            return res.status(404).send({
                success:false, 
                message:"Data Inexistent"
            })
        }

        return res.status(200).send(data)
   }catch(err){
        res.status(500).send({
            success:true, 
            message:`${err} Occur`
        })
   }
}

const createCategory = async(req,res)=>{

   try{
        
        const {name} = req.body

        if(!name){
            return  res.status(500).send({
                success:false,
                message: "Data Not Provided"
            })
        }

        const [exist] = await adminCategoryReq.query("SELECT * FROM `category` WHERE name=?",[name])

        if(exist.length > 0){
           return res.status(400).send({
                success:false,
                message: "Already In Use"
            })
        }

        const [data] = await adminCategoryReq.query("INSERT INTO `category`(`name`) VALUES (?)",[name])

        if(!data){
            return res.status(404).send({
                success:false, 
                message:`Data Not Added`
            })
        }

        return res.status(201).send({
            success:true, 
            message:`Data Succesfully Added`
        })
        
   }catch(err){
    return res.status(500).send({
            succes:false, 
            message:`${err} Occur`
        })
   }
}

const updateCategory = async(req,res)=>{
    try{
        const categoryID = req.params.category

        if(!categoryID){
            return res.status(500).send({
                success:false,
                message: "Data Not Provided"
            })
        }
        
        const {name} = req.body

        if(!name){
            return  res.status(500).send({
                success:false,
                message: "Date Not Received"
            })
        }

        const [data] = adminMenuReq.query("UPDATE `category` SET `name`=? WHERE categoryId= ?",[name, categoryID])

        if(!data){
            return res.status(404).send({
                success:false, 
                message:" Data Not Edited"
            })
        }

        return res.status(201).send({
            success:true, 
            message:"Data Succesfully Edited"
        })
   }catch(err){
        return res.status(500).send({
            success:true, 
            message:`${err} Occur`
        })
   }
}

module.exports = {listCategories, createCategory, updateCategory}