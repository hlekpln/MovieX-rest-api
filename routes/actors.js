const express = require("express");
const router = express.Router();

const Actor = require("../models/Actor");

//create a GET request handler for actors
router.get("/", async (req, res) => {
  const actors = await Actor.find(); //get all actors from the Actor model
  res.send(actors); //send all actors in response
});

//create a get request handler for  /actor/id, to get a actor data
router.get("/:id", async (req, res) => {
  const actorId = req.params.id;
  const actor = await Actor.findById(actorId);

  //if actor not exist send 404
  if (!actor) return res.status(404).send(`Actor with id ${actorId} not exist`);

  res.send(actor);
});
//create a POST  request handler for /actors, to create a movie in db
router.post("/", async (req, res) => {
  const actor = new Actor(req.body);
  const saved = await actor.save(); // save a actor MongoDB
  res.send(saved);
});

//create a put request handler for /actor/:id, to update a actor's data
router.put("/:id", async (req, res) => {
  const actorId = req.params.id; //get id parameter from url
  const updates = req.body; // get request body for updates
  const actor = await Actor.findByIdAndUpdate(actorId, updates, {
    new: true
  });
  if (!actor) return res.status(404).send(`Actor with id ${actorId} not exist`);

  res.send(actor);
});

//create a delete request handler for /actor/:id, to delete a actor from db

router.delete("/:id", async (req, res) => {
  const actorId = req.params.id; //
  const actor = await Actor.findByIdAndDelete(actorId);

  if (!actor) return res.status(404).send(`Actor with id ${actorId} not exist`);
  res.send(actor);
});
module.exports = router;
