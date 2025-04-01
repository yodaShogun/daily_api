adminCategoryReq = require("../../config/init")

const countCategory = async(req,res)=>{
    try{
        
        const [data] = await adminCategoryReq.query("SELECT COUNT(*) FROM category")

        if(!data){
            res.status(404).send({
                success:false, 
                message:"Data Inexistent"
            })
        }

        res.status(201).send({
            success:true, 
            data
        })
   }catch(err){
        res.status(500).send({
            success:true, 
            message:`${err} Occur`
        })
   }
}

const listCategories = async(req,res)=>{
    try{
        
        const [data] = await adminCategoryReq.query("SELECT * FROM category")

        if(!data){
            res.status(404).send({
                success:false, 
                message:"Data Inexistent"
            })
        }

        res.status(200).send(data)
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
            res.status(500).send({
                success:false,
                message: "Data Not Provided"
            })
        }

        const [data] = await adminCategoryReq.query("INSERT INTO `category`(`name`) VALUES (?)",[name])

        if(!data){
            res.status(404).send({
                success:false, 
                message:`Data Not Added`
            })
        }

        res.status(201).send({
            success:true, 
            message:`Data Succesfully Added`
        })
   }catch(err){
        res.status(500).send({
            succes:true, 
            message:`${err} Occur`
        })
   }
}

const updateCategory = async(req,res)=>{
    try{
        const categoryID = req.params.category

        if(!categoryID){
            res.status(500).send({
                success:false,
                message: "Data Not Provided"
            })
        }
        
        const {name} = req.body

        if(!name){
            res.status(500).send({
                success:false,
                message: "Date Not Received"
            })
        }

        const [data] = adminMenuReq.query("UPDATE `category` SET `name`=? WHERE categoryId= ?",[name, categoryID])

        if(!data){
            res.status(404).send({
                success:false, 
                message:" Data Not Edited"
            })
        }

        res.status(201).send({
            success:true, 
            message:"Data Succesfully Edited"
        })
   }catch(err){
        res.status(500).send({
            success:true, 
            message:`${err} Occur`
        })
   }
}

module.exports = {countCategory, listCategories, createCategory, updateCategory}