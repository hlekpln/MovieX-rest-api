const express = require("express");
const router = express.Router();

const Movie = require("../models/Movie");
const Actor = require("../models/Actor");

//create a GET request handler for movies
router.get("/", async (req, res) => {
  const movies = await Movie.find(); //get all movies from the Movie model
  res.send(movies); //send all movies in response
});

//create a get request handler for  /movies/id, to get a movie data

router.get("/:id", async (req, res) => {
  const movieId = req.params.id;
  const movie = await Movie.findById(movieId);

  //if movie not exist send 404
  if (!movie) return res.status(404).send(`Movie with id ${movieId} not exist`);

  res.send(movie);
});

//create a GET request handler for /movies/:id/actors, to get the actors of a movie
router.get("/:id/actors", async (req, res) => {
  const movieId = req.params.id;
  const movie = await Movie.findById(movieId).populate("actors");

  //if movie not exist send 404
  if (!movie) return res.status(404).send(`Movie with id ${movieId} not exist`);
  res.send(movie.actors);
});

//create a POST request handler for movieId/actors/:actorId, to add an actor for a movie

router.post("/:movieId/actors/:actorId", async (req, res) => {
  const movieId = req.params.movieId;
  const actorId = req.params.actorId;

  const movie = await Movie.findById(movieId).populate("actors");
  //if movie not exist send 404

  if (!movie) return res.status(404).send(`Movie with id ${movieId} not exist`);

  const actor = await Actor.findById(actorId);
  //if actor not exist send 404
  if (!actor) return res.status(404).send(`Actor with id ${actorId} not exist`);
  //check if actor is already exist in actor array
  const isActorExist = movie.actors.find(actor => actorId === actor.id);
  if (isActorExist)
    return res
      .status(404)
      .send(`Actor with id ${actorId} alredy exist in the movie`);

  movie.actors.push(actor);
  await movie.save();
  res.send(movie);
});

//create a POST  request handler for /movies, to create a movie in db
router.post("/", async (req, res) => {
  const movie = new Movie(req.body);
  const saved = await movie.save(); // save a movie MongoDB
  res.send(saved);
});

//create a put request handler for /movies/:id, to update a movie's data
router.put("/:id", async (req, res) => {
  const movieId = req.params.id; //get id parameter from url
  const updates = req.body; // get request body for updates
  const movie = await Movie.findByIdAndUpdate(movieId, updates, {
    new: true
  });
  if (!movie) return res.status(404).send(`Movie with id ${movieId} not exist`);

  res.send(movie);
});
//create a delete request handler for /movies/:id, to delete a movie from db

router.delete("/:id", async (req, res) => {
  const movieId = req.params.id; //
  const movie = await Movie.findByIdAndDelete(movieId);

  if (!movie) return res.status(404).send(`Movie with id ${movieId} not exist`);
  res.send(movie);
});
module.exports = router;
