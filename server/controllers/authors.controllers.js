const Author = require("../models/authors.model");

//Create
module.exports.createAuthor = async (req, res) => {
  try {
    const newAuthor = await Author.create(req.body);
    return res.json(newAuthor);
  } catch (err) {
    res.status(500).json(err);
  }
};

//Get all authors
module.exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find({});
    return res.json(authors);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Method to get an author by her/his ID
module.exports.getAuthortById = async (req, res) => {
  try {
    const singleAuthor = await Author.findById({ _id: req.params.id });
    return res.json(singleAuthor);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Method to delete an author by ID
module.exports.deleteOneAuthor = async (req, res) => {
  try {
    await Author.deleteOne({ _id: req.params.id });
    return res.json({ message: "The author was deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

//Method to update an author by ID
module.exports.updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await Author.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    return res.json(updatedAuthor);
  } catch (err) {
    res.status(500).json(err);
  }
};
