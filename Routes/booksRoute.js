import express from "express";
import Book from './../Model/bookModel.js';
import { addBooks, getBooks, getBooksById } from '../controller/controllers.js';
import protect from '../middleware/authMiddleware.js'
import User from './../Model/userModel.js';
const router = express.Router();


router.post("/addbook", protect ,async (req, res) => {
  try {
    console.log(req.body)
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Send all parama" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
      user: req.user.id,
      image: req.body.image
    };
    
    const bookResponse = await Book.create(newBook);
    return res.status(201).send(bookResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});


router.get("/getbooks" ,async (req, res) => {
  try {
    const bookResponse = await Book.find({user: req.user.id});
    // const bookResponse = await Book.find({author: 'haris'},{_id:0,title:1})
    // .limit(1)
//     const bookResponse =  await User.aggregate([{
//       $lookup:
//       {
//         from:"cats",
//       localField:"_id", 
//       foreignField:"user", 
//       as:"book_info"
//     }
//   },
// ])
  
    return res.status(200).json({
      books: bookResponse,
      length: bookResponse.length,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});


router.get("/getbooks/:id", async (req, res) => {
  try {
    const book_id = req.params.id;
    const bookResponse = await Book.findById(book_id);
    return res.status(200).json(bookResponse);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

// router.post("/addbook", addBooks); // 2nd approach
// router.get("/getbooks", getBooks); // 2nd approach
// router.get("/getbooks/:id", getBooksById); // 2nd approach

router.put("/updatebook/:id", protect, async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Send all params" });
    }
    const book_id = req.params.id;

    // check for the id coming from PARAMS
    const book_ = await Book.findById(book_id);
    if(!book_){
      return res.status(404).send({ message: "Book not found" });
    }

    // check for the id coming from req HEADERS Authorization
    const book__ = await User.findById(req.user.id)

    if(book_.user.toSting() !== book__.id){
      return res.status(401).send({ message: "User not authorized" });
    }


    const bookResponse = await Book.findByIdAndUpdate(book_id, req.body,{new:true});
    if (!bookResponse) {
      return res.status(404).send({ message: "Book not found" });
    }
    // let updated_book;
    // if (bookResponse) {
    //   updated_book = await Book.findById(book_id);
    // }

    // return res.status(200).send({message: "Book updated"}) // to just show status
    return res.status(200).json(bookResponse); // to send the updated book
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.delete("/deletebook/:id", protect, async (req, res) => {
  try {
    const book_id = req.params.id;

    // check for the id coming from PARAMS
    const book_ = await Book.findById(book_id);

    if(!book_){
      return res.status(404).send({ message: "Book not found" });
    }

    // check for the id coming from req HEADERS Authorization
    const logged_user = await User.findById(req.user.id)


    if(book_.user.toString() !== logged_user.id){
      return res.status(401).send({ message: "User not authorized" });
    }

    const book_response = await Book.findByIdAndDelete(book_id);

    // return res.status(200).send({message:"Book Deleted"}) // to just show status
    return res.status(200).send(book_response); // to send the deleted book
  } catch (error) {
    res.status(500).send({ error_message: error.message });
  }
});

export default router;