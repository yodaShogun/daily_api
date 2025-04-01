const itemReq = require("../../config/init")

const allMenu = async(req,res)=>{
    try{
        const [data] = await itemReq.query("SELECT * FROM menu")

        if(!data || data.length === 0){
            res.status(500).send({
                success:false,
                message:"Error While Fetching the menu items"
            })
        }

        res.status(200).send(data)
        
    }catch(err){
        res.status(500).send({
            success:false,
            message:`${err} Occur while trying to fetch the Items`
        })
    }
}

const menuByCategory =  async(req,res)=>{

    try{

        const group = req.params.group

        if(!group){
            res.status(404).send({
                success:false,
                message:"Data Not Provided"
            })
        }

        const [data] = await itemReq.query("SELECT * FROM `menu` WHERE category = ?",[group])

        res.status(200).send(data)


    }catch(err){
        res.status(500).send({
            success:false,
            message:`${err} Occur`
        })
    }
}




module.exports = {menuByCategory, allMenu}