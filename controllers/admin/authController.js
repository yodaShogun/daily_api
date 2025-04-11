const authReq = require("../../config/init")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createAccount = async(req,res)=>{
    try {

        const {account, key} = req.body

        if(!account || !key){
            return res.status(404).send({
                success:false,
                message: `Data Not Provided`
            })
        }

        const [exists] = await authReq.query("SELECT * FROM `accounts` WHERE account=?",[account])
        
        if(exists.length > 0){
            return res.status(400).send({
                success:false,
                message: `Username Non Available`
            })
        }

        const encryptedKey = await bcrypt.hash(key,12)

        const data = await authReq.query("INSERT INTO `accounts`(`account`, `key`) VALUES (?,?)",[account,encryptedKey])

        if(!data){
            return res.status(400).send({
                success:false,
                message: `Registration Failed`
            })
        }

        return res.status(201).send({
            success:true,
            message:"Registration Succeed"
        }) 

    } catch (error) {
        return res.status(500).send({
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

        const [user] = await authReq.query("SELECT * FROM `accounts` WHERE account=?",[account])
       
        if (user.length === 0) return res.status(404).json({ success:false, message: "User not found" });

        const valid = await bcrypt.compare(key, user[0].key);
        if (!valid) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user[0].accountId, email: user[0].account }, process.env.JWT_SECRET, {});

        res.status(201).json({ token });
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message: `${error} While Loging`
        })
    }
}


module.exports = {logIntoAccount, createAccount}