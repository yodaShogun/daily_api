adminMenuReq = require("../../config/init")


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
        const {category, item, price, label} = req.body

        if(!category|| !item || !price || !label){
            return res.status(500).send({
                success:false,
                message: "Data Not provided"
            })
        }
        
        const imageUrl = req.file ? `/menu/${req.file.filename}` : null;


        const [data] = await adminMenuReq.query("INSERT INTO `menu`(`category`, `imageUrl`, `item`, `price`, `label`) VALUES (?,?,?,?,?)",[category, imageUrl, item, price, label])

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
            return res.status(500).send({
                success:false,
                message: "Data Not provided"
            })
        }
        
        const {category, image_url, item, price, label} = req.body

        if(!category || !image_url || !item || !price || !label){
            return res.status(500).send({
                success:false,
                message: "Data Not Received"
            })
        }

        const [data] = adminMenuReq.query("UPDATE `menu` SET `category`= ?,`image_url`= ? ,`item`= ? WHERE stat= 1 and menuId = ?",[category, image_url, item, menuID])

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
            success:true, 
            message:`${err} Occur`
        })
   }
}

const enableItem = async (req,res)=>{
    try{
        const menu = req.params.menu

        if(!menu){
            return res.status(500).send({
                success:false,
                message: "Data Not provided"
            })
        }
        
        const [data] = await adminMenuReq.query("UPDATE menu SET stat = ? WHERE stat = 0 and menuId = ?",[1,menu])

        if(!data){
            return res.status(404).send({
                success:false, 
                message:"Data Not Edited"
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

const disableItem = async (req,res)=>{
    try{
        const menu = req.params.menu

        if(!menu){
            return res.status(500).send({
                success:false,
                message: "Data Not provided"
            })
        }
        
    

        const [data] = await adminMenuReq.query("UPDATE menu SET stat = ? WHERE stat = 1 and menuId = ?",[0,menu])

        if(!data){
            return res.status(404).send({
                success:false, 
                message:"Data Not Edited"
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

module.exports = {listItem, createItem, updateItem, enableItem, disableItem}