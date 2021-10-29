const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

//Using cors
app.use(cors());

//Mongoose config
require("./server/config/mongoose.config");

//Access POST method
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Calling all routes
require("./server/routes/authors.routes")(app);

//Using the port
app.listen(port, () =>
  console.log(`CORS-enabled web server listening on port ${port}`)
);
