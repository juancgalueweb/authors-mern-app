const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const AuthorSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "El autor es requerido"],
      minlength: [3, "Mínimo 3 caracteres"],
    },
  },
  { timestamps: true }
);

//Schema to model
const Author = model("Author", AuthorSchema);
module.exports = Author;
