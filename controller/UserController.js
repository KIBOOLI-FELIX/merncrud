const User = require('../model/User');
const userModel=require('../model/User');
const getAllUsers=async (req,res,next)=>{
  let users;
  try {
    users= await userModel.find()
  } catch (error) {
    return next(error)
  }

  if(!users){
    res.status(500).json({message:'Internal Server Error'});
  }
  return res.status(200).json({users});
}
const addUser=async (req,res,next)=>{
  const {name,email,password}=req.body;
  if(
      !name && name.trim()=="" &&
      !email && email.trim()=="" &&
      !password && password.trim()=="" && password.length>6
    ){
      return res.status(422).json({message:'Invalid Data'});
    }
  let user;
  try {
    user=new userModel({
      name,
      email,
      password
    })
    user=await user.save();

  } catch (error) {
    return next(error);
  }

  if(!user){
    return res.status(500).json({message:'Unable to save user'})
  }
  return res.status(201).json({message:'User saved successfully'})
}

const updateUser=async (req,res,next)=>{
  const id=req.params.id;

  const {name,email,password}=req.body;
  if(
      !name && name.trim()=="" &&
      !email && email.trim()=="" &&
      !password && password.trim()=="" && password.length>6
    ){
      return res.status(422).json({message:'Invalid Data'});
    }

    let user;
    try {
      user=await userModel.findByIdAndUpdate(id,{name,email,password});
      
    } catch (error) {
      return next(error);
    }
    if(!user){
      return res.status(500).json({message:'Unable to update user'})
    }
    return res.status(201).json({message:'User updated successfully'})
}

const deleteUser=async (req,res,next)=>{
  const id=req.params.id;
  let user;
  try {
    user=await userModel.findByIdAndRemove(id);
  } catch (error) {
    return next(error);
  }
  if(!user){
    return res.status(500).json({message:'Unable to delete user'})
  }
  return res.status(201).json({message:'User deleted successfully'})


}
exports.getAllUsers=getAllUsers;
exports.addUser=addUser;
exports.updateUser=updateUser;
exports.deleteUser=deleteUser;