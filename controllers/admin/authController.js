const authReq = require("../../config/init")


const isAccountExist = async(req,res)=>{
    try {
        const {account} = req.body
        const [data] = await authReq.query("SELECT COUNT(*) as data FROM `accounts` WHERE account=?",[account])
        if(!data){
            res.status(404).send({
                success:false,
                message: `${error} While Loging`
            })
        }

        return data
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message: `${error} While Loging`
        })
    }
}

const logIntoAccount = async(req,res)=>{
    try {

        const {account, key} = req.body

        if(!account || !key){
            res.status(404).send({
                success:false,
                message: `Data Not Provided`
            })
        }

        const data = await authReq.query("INSERT INTO `accounts`(`account`, `key`) VALUES (?,?)",[account,key])
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message: `${error} While Loging`
        })
    }
}

const createAccount = async(req,res)=>{
    try {

        const {account, phone, key} = req.body

        if(!account || !key){
            res.status(404).send({
                success:false,
                message: `Data Not Provided`
            })
        }

        const data = await authReq.query("INSERT INTO `accounts`(`account`, `phone`, `key`) VALUES (?,?,?)",[account,phone,key])
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message: `${error} While Loging`
        })
    }
}
module.exports = {isAccountExist, logIntoAccount, createAccount}