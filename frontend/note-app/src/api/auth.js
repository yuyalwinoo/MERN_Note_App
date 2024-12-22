import axiosInstance from "../utils/axiosInstance";

export const login = async(data)=>{
    const user = await axiosInstance.post("/users/login",data);
    if(user?.data)
    {
        localStorage.setItem("token",user?.data?.token);
        localStorage.setItem("isLogin",true);
    }
    
    return user;
}

export const registerUser = async(data)=>{
    return await axiosInstance.post("/users/register",data)
}

export const fetchUserInfo = async()=>{
    let user = {};
    if(localStorage.getItem("isLogin"))
    {
        user = await axiosInstance.get("/users/current")
    }
    
    return user;
}