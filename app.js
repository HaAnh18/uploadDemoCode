const express = require('express');
const path = require('path');
require('dotenv').config()
const mongoose = require("mongoose")
const fileAndImageRouter = require('./routes/fileAndImage');

const app = express();

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

// Route for handling index
app.use("/", fileAndImageRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

module.exports = app;
