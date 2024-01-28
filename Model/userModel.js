import mongoose from "mongoose";

const user_schema = mongoose.Schema({
    name:{
        type: String,
        required: [true,'Add name']
    },
    email:{
        type: String, 
        required: [true,'Please add your emaill'],
        unique: true
    },
    role:{
        type: String,
        required: [true,'Add role']
    },
    phone_no:{
        type: Number,
        required: [true,'Add phone numberr']
    },
    password:{
        type: String,
        required: [true,'Add password'],
        unique: true
    },
},{
    timestamps: true
})

const User = mongoose.model('User',user_schema)
export default User;

