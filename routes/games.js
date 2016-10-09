"use strict";

var express = require("express");
var router = express.Router();
var Util = require(process.cwd() + "/modules/Util");

var GameManager = require(process.cwd() + "/modules/Models/GameManager").instance;
var Game = require(process.cwd() + "/modules/Models/Game");

/* GET login page. */
router.get("/", function(request, response, next)
{
  console.log("games");
  var player = request.session.player;
  console.log(request.session.player);
  console.log(GameManager.players);
  if (!GameManager.hasPlayer(player.id))
  {
    console.log(GameManager.hasPlayer(player.id));
    response.redirect("/login");
    return;
  }
  response.render("games",
  {
    playerName: player.name
  });
});

router.get("/list", function(request, response, next)
{
  console.log(GameManager.getGameInfo());
  var sendable = JSON.stringify(GameManager.getGameInfo());
  response.status(200).send(sendable);
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

  var game = new Game(request.body.name);
  GameManager.addGame(game);

  var sendable = JSON.stringify(
  {
    id: game.id
  });
  response.status(200).send(sendable);
});

module.exports = router;
