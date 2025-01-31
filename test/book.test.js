import { expect } from "chai"; 
import request from "supertest";
import app from "../app.js";

describe("Book Management API", function () {
  let bookId; 
  let token;

  before(async () => {
    // Obtain a valid token (replace with actual login API details)
     await request(app)
    .post("/api/auth/register")
      .send({ username: "Gayatri", password: "admin12346" });
      const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "Gayatri", password: "admin12346" });

    token = res.body.token; 
  });

  // Test: Create a new book
  it("should create a new book", function (done) {
    request(app)
      .post("/api/books")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "The Alchemist",
        author: " Paulo Coelho",
        published_date: "2000-04-05",
        genre: "philosophical fiction",
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("id");
        bookId = res.body.id;
        console.log('Created BookId-',bookId);
        done();
      });
  });

  // Test: Get all books
  it("should fetch all books", function (done) {
    request(app)
      .get("/api/books")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.books).to.be.an("array");
        done();
      });
  });

  // Test: Get book by ID
  it("should fetch a single book by ID", function (done) {
    request(app)
      .get(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("id", bookId);
        done();
      });
  });

  // Test: Update a book
  it("should update a book", function (done) {
    console.log('BookId-',bookId);
    request(app)
      .put(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated The Alchemist",
        author: " Paulo Coelho",
        published_date: "2000-04-05",
        genre: "philosophical fiction",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("title", "Updated The Alchemist");
        done();
      });
  });

  // Test: Delete a book
  it("should delete a book", function (done) {
    request(app)
      .delete(`/api/books/${bookId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});

