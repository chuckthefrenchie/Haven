  
require('dotenv').config()

var express = require("express");

var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
