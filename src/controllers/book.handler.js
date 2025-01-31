const Book = require("../models/book.model");
const Joi = require("joi");
const logger = require("../../logger");

//Validate Schema
const bookDetails = Joi.object({
    title : Joi.string().required(),
    author : Joi.string().required(),
    published_date: Joi.date().required(),
    genre : Joi.string().required()
})

//Store New book
exports.storeBook = async (req, res) =>{
  try {
    const {error} = bookDetails.validate (req.body)
    if (error) return res.status(400).json({error: error.details[0].message})

    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err){
    logger.error({message:'Error storing books', stack:err.message});
    res.status(500).json({error: "Failed to store Book"})
  }
}

//Get all books
exports.getAllBooks = async (req, res) =>{
    try{
        const { page = 1, limit = 10 } = req.query; // Defaults: page=1, limit=10
        const offset = (page - 1) * limit;

        const books = await Book.findAndCountAll({
          limit: parseInt(limit),
          offset: parseInt(offset),
        });
        if (!books) return res.status(404).json({ error: "Book not found"});
        res.status(200).json({
          total: books.count,
          totalPages: Math.ceil(books.count / limit),
          currentPage: parseInt(page),
          books: books.rows,
        });

        // const books = await Book.findAll();
        // res.status(200).json(books)
    }catch(err){
        logger.error({message:'Error fetching books', stack:err.message});
        res.status(500).json({ error: "Failed to fetch books"});
    }
}

//Get single book
exports.getBookById = async (req, res) =>{
    try{
      const book = await Book.findByPk(req.params.id);
      if (!book) return res.status(404).json({ error: "Book not found"});
      res.status(200).json(book)
    }catch(err){
      logger.error({message:'Error fetching books', stack:err.message});
      res.status(500).json({ error: "Failed to fetch book"});
    }
}

//update book
exports.updateBook = async (req,res)=>{
  try{
     const {error} = bookDetails.validate(req.body);
     if (error) return res.status(400).json({error: error.details[0].message})

     const [updated] = await Book.update(req.body, { where: { id: req.params.id } });
     if (!updated) return res.status(404).json({ error: "Book not found" });

     const updateBook = await Book.findByPk(req.params.id);
     if (updateBook) return res.status(200).json(updateBook);
  }catch(err){
    logger.error({message:'Error updating books', stack:err.message});
    res.status(500).json({ error: "Failed to update book"});
  }
}

//delete book
exports.deleteBook = async (req, res) =>{
  try {
    const deleted = await Book.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Book not found" });

    res.status(200).json({ message: "Book deleted successfully"});
  } catch (err) {
    logger.error({message:'Error deleting books', stack:err.message});
    res.status(500).json({ error: "Failed to delete book" });
  }
}