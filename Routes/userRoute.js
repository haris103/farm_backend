import express from "express";
import User from "../Model/userModel.js";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import protect from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/register', async(req,res)=>{
const {name, email, password, role, phone_no} = req.body;

// validation
if(!name || !email || !password || !role || !phone_no){
    res.status(400).send({message:"add all fields"})
}
// user exists check
const user_exists = await User.findOne({email})
if(user_exists){
    res.status(400).send({message:"user already exists"})
}else{



// hash password
const salt = await bcryptjs.genSalt(10);
const hashed_password = await bcryptjs.hash(password, salt)

// create user
const user = await User.create({
    name,
    email,
    role,
    phone_no,
    password: hashed_password
})

if(user){
    res.status(201).send({
        _id: user.id,
        name:user.name,
        email: user.email,
        role: user.role,
        phone_no : user.phone_no,
        token: generateToken(user.id),
        is_created: true
    })
}
else{
    res.status(400).send({message: "Invalid user"})
}
}
})

router.post('/login', async (req,res)=>{
    const {email, password} = req.body;

    // validation
    if(!email || !password){
        res.status(400).send({message:"add all fields"})
    }

    // check for email
   const user =  await User.findOne({email});

   if(user && await (bcryptjs.compare(password, user.password))){
       res.status(200).send({
           _id: user.id,
           name: user.name,
           message:"Logged in",
           token: generateToken(user.id)
       })
   }else{
       res.status(400).send({message: "Invalid credentials"})
   }
})


router.get('/me',protect, async (req,res)=>{
    // res.send({message:"User data"})
  const {_id, name, email}  = await User.findById(req.user.id)

  res.status(200).send({
      id: _id,
      name,
      email
  })
})


const generateToken = (id)=>{
  return  jsonwebtoken.sign({id},'1122abc',{
        expiresIn:'20d'
    })
}


export default router;