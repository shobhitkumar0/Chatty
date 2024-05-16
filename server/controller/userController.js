const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
module.exports.register = async (req, res, next) => {
try{
    const { username, email, password } = req.body;
  const usernameCheck = await User.findOne({ username });
  if (usernameCheck) {
    return res.json({ msg: "Username already used", status: false });
  }
  const emailnameCheck = await User.findOne({ email });
  if (emailnameCheck) {
    return res.json({ msg: "Email already used", status: false });
  }
  const hashedPassword=await bcrypt.hash(password,10);
  const user= await User.create({
    email,username,password:hashedPassword,
  });
  delete user.password;
  
  return res.json({status:true,user});

}
catch(error){
  console.log("error in usercontroller",error);
  next(error);
}  
};


module.exports.login = async (req, res, next) => {
  try{
      const { username, password } = req.body;
    const usercheck = await User.findOne({ username });
    if (!usercheck) {
      return res.json({ msg: "Incorrect username and password", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password,usercheck.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect username and password", status: false });
    }
    delete User.password;
    return res.json({status:true,usercheck});
  
  }
  catch(error){
    console.log("error in login usercontroller",error);
    next(error);
  }  
  };
  

  module.exports.setAvatar = async (req, res, next) => {
    try {
      console.log("user #############################")
      const userId=(req.params.id);
      const username=req.body.username;
      const avatarImage=req.body.image;
      const usercheck = await User.findOne({ username });
      userpassing=usercheck._id;
      const userData= await User.findByIdAndUpdate((userpassing),{
        isAvatarImageSet:true,
        avatarImage:avatarImage,
      },{ new: true });
      return res.json({
        isSet:userData.isAvatarImageSet,
        image:userData.avatarImage,
      });
    } catch (error) {
      console.log("error in setAvatar usercontroller",error);
    next(error);
    }
  };


  module.exports.getAllUsers = async (req, res, next) => {
    try {
      const users=await User.find({_id:{$ne:req.params.id}}).select([
        "email","username","avatarImage","_id",
      ]);
      return res.json(users);
    } catch (error) {
      console.log("error in getAvatar getAllUsers",error);
    next(error);
    }
  }