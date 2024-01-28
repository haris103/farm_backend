
import jsonwebtoken from "jsonwebtoken";
import User from './../Model/userModel.js';


const protect = async(req, res, next)=>{
let token;
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
        // get token form header
        token = req.headers.authorization.split(' ')[1];

        // verify token
       const decoded = jsonwebtoken.verify(token, '1122abc');

       // get user from token
       req.user = await User.findById(decoded.id).select('-password')

       next()
    } catch (error) {
        console.log(error)
        res.status(401).send({message: "Not authorized"})
    }
}

if(!token){
    res.status(401).send({message:"Not authorized, no token"})
}

}
export default protect