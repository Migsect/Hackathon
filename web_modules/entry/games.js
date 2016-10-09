"use strict";

var Util = require("../Util");
var gameItemTemplate = require("../templates/game-template.html");

var buttonCreateNewGame = document.getElementById("button-create-game");
var buttonRefreshGames = document.getElementById("button-refresh");
var inputCreateNewGame = document.getElementById("input-create-game");
var gameList = document.getElementById("game-list");
var errorMessages = document.getElementById("error-messages");

var clearGames = function()
{
  while (gameList.firstChild)
  {
    gameList.removeChild(gameList.firstChild);
  }
};
var addGame = function(gameObject)
{
  /* Adding the game through the template */
  gameList.appendChild(Util.htmlToElement(gameItemTemplate(
  {
    id: gameObject.id,
    name: gameObject.name,
    players: gameObject.players,
    status: gameObject.status
  })));
};

var updateGameList = function()
{
  var request = Util.sendGetRequest("/games/list",
  {});

  request.onload = function()
  {

    console.log("Status:", request.status);
    console.log("Response:", request.responseText);
    if (request.status >= 200 && request.status < 400)
    {
      var result = JSON.parse(request.responseText);
      console.log(result);
      clearGames();
      result.forEach(function(game)
      {
        addGame(game);
      });
    }
    else
    {

    }

  };
  request.onerror = function()
  {
    // Connection error
  };
};

/*Initial update */
updateGameList();

buttonRefreshGames.addEventListener("click", function(event)
{
  updateGameList();
});
buttonCreateNewGame.addEventListener("click", function(event)
{
  errorMessages.innerHTML = "";

  var request = Util.sendPostRequest("/games",
  {
    name: inputCreateNewGame.value
  });

  request.onload = function()
  {

    console.log("Status:", request.status);
    console.log("Response:", request.responseText);
    if (request.status >= 200 && request.status < 400)
    {
      var result = JSON.parse(request.responseText);
      var id = result.id;
      window.location.replace("/client?id=" + id);
    }
    else
    {
      errorMessages.innerHTML = request.responseText;
    }

  };
  request.onerror = function()
  {
    // Connection error
  };

  /* Clearing the input */
  inputCreateNewGame.value = "";
});
