const express = require("express");
const mongoose = require("mongoose");
const MONGODB_URL = require("./config/mongodb");
const cors = require("cors");
const moviesRoutes = require("./routes/movies"); // import movies router
const actorsRoutes = require("./routes/actors"); // import movies router

const app = express(); //create express app

//connect mongoose to MongoDB
mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to Mongo DB..."))
  .catch(err => console.log("Error:", err));
app.use(cors());
app.use(express.json()); //accept json format for request body
app.use("/movies", moviesRoutes); //set inital root of /movies for movies router
app.use("/actors", actorsRoutes); //set inital root of /movies for movies router

const PORT = process.env.PORT || 3000; //set port from enviroment variable,if not set defoult to 3000

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`)); //listen port
