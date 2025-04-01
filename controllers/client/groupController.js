const groupReq = require("../../config/init")

const allgroup = async(req,res)=>{
    try{
        const [data] = await groupReq.query("SELECT * FROM category")
        if(!data || data.length === 0){
            res.status(404).send({
                success:true,
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

module.exports = {allgroup}