# book-management

**Overview**
The Book Management Application is a simple and efficient system designed to manage books in a library or personal collection. It allows users to add, update, delete, and view books.

**Project Structure**
book-management/

├── config/ # Database Configuration files

├── src/ # Business logic & database handling

│ ├── controllers/ # Handles business logic

│ ├── middleware/ # Authentication

│ ├── models/ # Database schemas

│ ├── routes/ # API routes

│ ├── test/ # Mocha Test Scripts

├── logger.js # Handles logs

├── package.json # Node.js dependencies

├── README.md # Project documentation

└── app.js # Main entry point

**Installation & Setup**
Prerequisites
NodeJs version- v22.11.0
mysql8.0

**Steps to Run the Project**
1. Clone the repository:
git clone https://github.com/GayatriShete/book-management.git
cd book-management

2.Install dependencies:
npm install

3.Start the server:
npm start

4.use Postman to test APIs.

**API Endpoints**

| Method     | Endpoint                     | Description     |
|------------|------------------------------|-----------------|
| **POST**   | `/api/books`                 | Add a new book  |
| **GET**    | `/api/books?page=1&limit=10` | Get all books   |
| **GET**    | `/api/books/:id`             | Get book by ID  |
| **PUT**    | `/api/books/:id`             | Update a book   |
| **DELETE** | `/api/books/:id`             | Delete a book   |
