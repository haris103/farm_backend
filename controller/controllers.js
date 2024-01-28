import Book from '../Model/bookModel.js';

export const addBooks = async (req,res)=>{
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
          return res.status(400).send({ message: "Send all parama" });
        }
        const newBook = {
          title: req.body.title,
          author: req.body.author,
          publishYear: req.body.publishYear,
        };
        console.log(newBook);
        const bookResponse = await Book.create(newBook);
        return res.status(201).send(bookResponse);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
}

export const getBooks = async (req,res) =>{
    try {
        const bookResponse = await Book.find({});
        return res.status(200).json({
          books: bookResponse,
          length: bookResponse.length,
        });
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
}


export const getBooksById = async (req,res) =>{
    try {
        const book_id = req.params.id;
        const bookResponse = await Book.findById(book_id);
        return res.status(200).json(bookResponse);
      } catch (err) {
        res.status(500).send({ message: err.message });
      }

}