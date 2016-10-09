"use strict";

var Util = require(process.cwd() + "/modules/Util");

var GameManager = function()
{
  var self = this;
  Object.defineProperties(self,
  {
    players:
    {
      value: new Map(),
      enumerable: true
    },
    games:
    {
      value: new Map(),
      enumerable: true
    }
  });
};

Object.defineProperties(GameManager.prototype,
{
  addGame:
  {
    value: function(game)
    {
      this.games.set(game.id, game);
    }
  },
  getGame:
  {
    value: function(id)
    {
      return this.games.get(id);
    }
  },
  getGameInfo:
  {
    value: function()
    {
      console.log(this.games);
      var list = [];
      this.games.forEach(function(game)
      {
        list.push(
        {
          id: game.id,
          name: game.name,
          players: game.players.length,
          status: game.status
        });
      });
      return list;
    }
  },
  removeGame:
  {
    value: function(id)
    {
      this.delete(id);
    }
  },
  addPlayer:
  {
    value: function(player)
    {
      this.players.set(player.id, player);
    }
  },
  removePlayer:
  {
    value: function(id)
    {
      console.log("before");
      this.players.delete(id);
      console.log("after");
    }
  },
  getPlayer:
  {
    value: function(id)
    {
      return this.players.get(id);
    }
  },
  hasPlayer:
  {
    value: function(id)
    {
      if (Util.isNull(id))
      {
        return false;
      }
      return this.players.has(id);
    }
  }

});

Object.defineProperties(module.exports,
{
  constructor:
  {
    value: GameManager
  },
  instance:
  {
    value: new GameManager()
  }
});
