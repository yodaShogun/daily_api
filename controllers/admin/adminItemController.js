adminMenuReq = require("../../config/init")

const countItem = async(req,res)=>{
    try{
        
        const [data] = await adminMenuReq.query("SELECT c.name, COUNT(*) FROM menu m, category c WHERE m.category = c.categoryId GROUP BY category")

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

const listItem = async(req,res)=>{
    try {
        const [data] = await adminMenuReq.query("SELECT * FROM menu")
        if(!data){
            res.status(404).send({
                success:false,
                message:"Data Not Found"
            })
        }
        res.status(200).send(data)
    } catch (error) {
        return res.status(500).send({
            succes:false, 
            message:`${error} Occur`
        })
    }
}

const createItem = async(req,res)=>{
    
   try{
        const {category, item} = req.body

        if(!category|| !item){
            return res.status(500).send({
                success:false,
                message: "Data Not provided"
            })
        }
        
        const imageUrl = req.file ? `/menu/${req.file.filename}` : null;


        const [data] = await adminMenuReq.query("INSERT INTO `menu`(`category`, `image_url`, `item`) VALUES (?,?,?)",[category, imageUrl, item])

        if(!data){
            return res.status(404).send({
                success:false, 
                message:"Data Not Added"
            })
        }

        return res.status(201).send({
            success:true, 
            message:"Data Succesfully Added"
        })
   }catch(err){
       return res.status(500).send({
            succes:true, 
            message:`${err} Occur`
        })
   }
}

const updateItem = async (req,res)=>{
    try{
        const menuID = req.params.menu

        if(!menuID){
            res.status(500).send({
                success:false,
                message: "Data Not provided"
            })
        }
        
        const {category, image_url, item} = req.body

        if(!category || !image_url || !item){
            res.status(500).send({
                success:false,
                message: "Data Not Received"
            })
        }

        const [data] = adminMenuReq.query("UPDATE `menu` SET `category`= ?,`image_url`= ? ,`item`= ? WHERE stat= 1 and menuId = ?",[category, image_url, item, menuID])

        if(!data){
            res.status(404).send({
                success:false, 
                message:"Data Not Added"
            })
        }

        res.status(201).send({
            success:true, 
            message:"Data Succesfully Added"
        })
   }catch(err){
        res.status(500).send({
            success:true, 
            message:`${err} Occur`
        })
   }
}

const enableItem = async (req,res)=>{
    try{
        const menuID = req.params.menu

        if(!menuID){
            res.status(500).send({
                success:false,
                message: "Data Not provided"
            })
        }
        
        const {stat} = req.body

        if(!stat){
            res.status(500).send({
                success:false,
                message: "Data Not received"
            })
        }

        const [data] = adminMenuReq.query("UPDATE stat = ? WHERE stat = 0 and menuId = ?",[stat, menuID])

        if(!data){
            res.status(404).send({
                success:false, 
                message:"Data Not Edited"
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

const disableItem = async (req,res)=>{
    try{
        const menuID = req.params.menu

        if(!menuID){
            res.status(500).send({
                success:false,
                message: "Data Not provided"
            })
        }
        
        const {stat} = req.body

        if(!stat){
            res.status(500).send({
                success:false,
                message: "Data Not Received"
            })
        }

        const [data] = adminMenuReq.query("UPDATE stat = ? WHERE stat = 1 and menuId = ?",[stat, menuID])

        if(!data){
            res.status(404).send({
                success:false, 
                message:"Data Not Edited"
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

module.exports = {countItem, listItem, createItem, updateItem, enableItem, disableItem}