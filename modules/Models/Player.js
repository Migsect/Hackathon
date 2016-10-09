"use strict";

var uuid = require("uuid");

var Player = function(name)
{
  var self = this;
  Object.defineProperties(self,
  {
    id:
    {
      value: uuid.v4(),
      enumerable: true
    },
    name:
    {
      value: name,
      enumerable: true
    }
  });
};

Object.defineProperties(Player.prototype,
{});

module.exports = Player;
