import mongoose from 'mongoose'
const book_schema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    publishYear:{
        type: Number,
        required:true
    },
    image:{
        type: String,
    }
},
{
    timestamps: true
}
);

 const Book = mongoose.model('Cat',book_schema);
 export default Book;
