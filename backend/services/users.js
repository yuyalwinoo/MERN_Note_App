const bcrypt = require('bcrypt');

const User = require('../models/Users')

const register = async(username,email,password) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let user = new User({
        username,
        email,
        password: hashPassword,
    });
    return user.save();
}

const login = async(email,password) => {
    const filter = {
        email: email
    };
    console.log('Filter ',filter);
    const user = await User.findOne(filter);
    if(user)
        {
            //console.log('Username ',userName, " Password ",user.password);
            const validPass = await bcrypt.compare(password, user.password);
            if(validPass)
            {
                return user;
            }
            else
            {
                throw Error("Invalid user or password");
            }
        }
        throw Error("Invalid user or password");;
}

const getUserById  = async(userId)=>{

    const user = await User.findById(userId).select("_id username email updatedAt");
    if(user)
    {
        return user
    } else {
        throw Error("User not found");
    }
}


module.exports = {
    register,
    login,
    getUserById
    
}