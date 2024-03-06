var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
require('dotenv').config()
const morgan = require('morgan');
const mongoose = require("mongoose")
var fileAndImageRouter = require('./routes/fileAndImage');

var app = express();

//CONNECT DATABASE
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));


const templatePath = path.join(__dirname, './views');
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", templatePath); 
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.use(morgan('dev'));
app.use(cookieParser());

// Route for handling index
app.use("/", fileAndImageRouter);

const port = process.env.PORT || 8000;


app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

module.exports = app;
