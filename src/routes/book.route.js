const express = require("express");
const {
  storeBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/book.handler");

const router = express.Router();

router.post("/", storeBook);
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
