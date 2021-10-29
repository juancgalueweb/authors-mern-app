const mongoose = require("mongoose");
const localDataBase = "mongodb://localhost/authors_db";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(localDataBase);
}
