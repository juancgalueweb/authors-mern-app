const {
  createAuthor,
  getAllAuthors,
  getAuthortById,
  deleteOneAuthor,
  updateAuthor,
} = require("../controllers/authors.controllers");

module.exports = (app) => {
  app.post("/api/author/new", createAuthor);
  app.get("/api/authors", getAllAuthors);
  app.get("/api/author/:id", getAuthortById);
  app.delete("/api/author/delete/:id", deleteOneAuthor);
  app.put("/api/author/:id", updateAuthor);
};
