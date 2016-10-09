"use strict";

var express = require("express");
var router = express.Router();
var Util = require(process.cwd() + "/modules/Util");

var GameManager = require(process.cwd() + "/modules/Models/GameManager").instance;
var Player = require(process.cwd() + "/modules/Models/Player");

/* GET login page. */
router.get("/", function(request, response, next)
{
  response.render("login");
});

router.post("/", function(request, response, next)
{
  /* Validating that the post is correct */
  if (Util.isNull(request.body) || Util.isNull(request.body.name))
  {
    response.status(400).send("Name not specified.");
    return;
  }
  if (request.body.name.length <= 0)
  {
    response.status(400).send("Name not specified.");
    return;
  }
  if (!Util.isNull(request.session.player) && GameManager.hasPlayer(request.session.player.id))
  {
    GameManager.removePlayer(request.session.player.id);
    request.session.player = null;
  }
  /* Creating and adding the player */
  var player = new Player(request.body.name);
  GameManager.addPlayer(player);

  /* Linking the player to the session */
  request.session.player = player;

  response.status(200).send("Success");

});

module.exports = router;
