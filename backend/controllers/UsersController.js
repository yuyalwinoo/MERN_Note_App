const userService = require('../services/users');
const {config} = require('../config/Config')
const jwt = require('jsonwebtoken');

const register = async function( req,res,next)
{
    const {username, email, password} = req.body;

    try
    {
        let user = await userService.register(username,email,password);
        let payload = { id: user._id };
        const token = jwt.sign(payload, config.TOKEN_SECRET);
        res.status(200).send({ token });
    }
    catch (err) {
        console.log(err)
        res.status(400).send({message:"User already existed"});
    }
}

const login = async function(req,res,next)
{
    const {email, password} = req.body;

    try
    {
        let user = await userService.login(email,password);
        let payload = { id: user._id };
        const token = jwt.sign(payload, config.TOKEN_SECRET,{
            expiresIn: process.env.JWT_EXPIRES_IN,
          });
        res.status(200).json({ token,userId:user._id,username:user.username });
    }
    catch (err) {
        // console.log(err.message)
        return res.status(500).json({ message: err.message.toString()});
    }
}

const getLoginUser = async(req,res,next)=>{
    const userId = req.user.id;
  
    try{
        const user = await userService.getUserById(userId);
        res.status(200).json(user)
    }catch(err){
        res.status(505).json(err.toString());
    }
}

module.exports = {
    register,
    login,
    getLoginUser
}