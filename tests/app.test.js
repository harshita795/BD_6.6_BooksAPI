let request = require("supertest");
let { app } = require("../index.js");
let { getAllBooks, getBookById } = require("../controllers");
let http = require("http");

jest.mock("../controllers", () => ({
  ...jest.requireActual("../controllers"),
  getAllBooks: jest.fn(),
}));

let server;

beforeAll((done) => {
  server = http.createServer(app);
  server.listen(3001, done);
});

afterAll((done) => {
  server.close(done);
});

describe("Function tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return all the books", () => {
    let mockBooks = [
      {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
      {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
    ];

    getAllBooks.mockReturnValue(mockBooks);

    let result = getAllBooks();
    expect(result).toEqual(mockBooks);
    expect(result.length).toBe(3);
  });
});

describe("API Endpoint tests", () => {
  it("GET API /books/ should return all books", async () => {
    const res = await request(server).get("/books");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      books: [
        {
          bookId: 1,
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          genre: "Fiction",
        },
        {
          bookId: 2,
          title: "1984",
          author: "George Orwell",
          genre: "Dystopian",
        },
        {
          bookId: 3,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          genre: "Classic",
        },
      ],
    });
    expect(res.body.books.length).toBe(3);
  });

  it("GET API /books/details/:id should return the details od book by Id", async () => {
    const res = await request(server).get("/books/details/1");
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      book: {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
    });
  });
});
