const dotenv = require("dotenv");
const express = require("express");
// const morgan = require("morgan");
const logger = require("./logger");
const fs = require("fs");
const path = require("path");
const bookRoutes = require("./src/routes/book.route");
const authRoutes = require("./src/routes/auth.route");
const { authenticateToken } = require("./src/middleware/auth.middleware");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  logger.info({ message: "API Request", method: req.method, url: req.url });
  next();
});
// app.use(morgan("combined", { stream: fs.createWriteStream(path.join(__dirname, "src/logs/app.log"), { flags: "a" }) }));

// Routes
app.use("/api/auth", authRoutes); 
app.use("/api/books", authenticateToken, bookRoutes);
// app.use("/api/books", bookRoutes);

// Error Handler
app.use((err, req, res, next) => {
  logger.error({message:'Something went wrong', stack: err.stack});
  res.status(500).json({ error: "Something went wrong"});
});


module.exports = app; 

if (require.main === module) {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}
/* // Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); */
