"use strict";

var Util = require(process.cwd() + "/modules/Util");
var uuid = require("uuid");

var Game = function(name)
{
  var self = this;
  Object.defineProperties(self,
  {
    id:
    {
      value: uuid.v4()
    },
    name:
    {
      value: name
    },
    status:
    {
      value: "open"
    },
    players:
    {
      value: []
    }
  });
};

Object.defineProperties(Game.prototype,
{});

module.exports = Game;
