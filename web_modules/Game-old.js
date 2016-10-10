"use strict";
/*global Crafty*/

var PathElement = require("./PathElements/PathElement");

var Game = function(container)
{
  var self = this;
  Object.defineProperties(self,
  {
    unit:
    {
      value: 1000
    },
    container:
    {
      value: container
    }
  });

  window.addEventListener("resize", function()
  {
    console.log("h:", window.innerHeight, "w:", window.innerWidth);
    // Crafty.viewport.init();
    //Crafty.viewport.reload();
    self.scaleToWindow();
  });
};

window.onresize = function()
{
  Crafty.init(window.screenWidth, window.screenHeight);
};

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Object.defineProperties(Game.prototype,
{
  addPathElement:
  {
    value: function() {

    }
  },
  scaleToWindow:
  {
    value: function()
    {
      Crafty.viewport.scale(window.innerHeight / this.unit);
    }
  },
  createLevelScene:
  {
    value: function()
    {
      Crafty.init(window.innerWidth, window.innerHeight);
      var gameLength = 2000;
      //Crafty.viewport.scale(window.innerHeight / this.unit);
      var elements = ["straight", "straight", "straight", "straight"];
      for (var i = 0; i < (gameLength); i++)
      {
        var x = getRandomInt(0, 6);
        var y = getRandomInt(0, 6);
        if (x === 0 || x == 4)
          elements.push("straight");
        if (x === 0 && y === 0)
          elements.push("bridgeHack");
        if (x == 1 || x == 5)
          elements.push("drops");
        if (x == 1 && y == 1)
          elements.push("wallHack");
        if (x == 2 || x == 6)
          elements.push("pitfall");
        if (x == 2 && y == 2)
          elements.push("attack");
        if (x == 3)
          elements.push("wall");
        if (x == 3 && y == 3)
          elements.push("assist");
      }
      var self = this;
      Crafty.c('CustomControls',
      {
        __move:
        {
          left: false,
          right: false,
          up: false,
          down: false
        },
        _speed: null,
        init: function()
        {
          this._speed = {
            base: 0,
            x: 0,
            y: 0
          };
        },
        CustomControls: function(speed)
        {
          if (speed) this._speed.base = speed;
          var move = this.__move;
          this.bind('KeyDown', function()
          {
            //move the player in a direction depending on the booleans
            if (this.isDown("RIGHT_ARROW")) this._speed.x = this._speed.base;
            if (this.isDown("LEFT_ARROW")) this._speed.x = -this._speed.base;
            if (this.isDown("UP_ARROW")) this._speed.y = -this._speed.base;
            if (this.isDown("DOWN_ARROW")) this._speed.y = this._speed.base;
          });
          this.bind('KeyUp', function()
          {
            //move the player in a direction depending on the booleans
            if (!this.isDown("RIGHT_ARROW")) this._speed.x = 0;
            if (!this.isDown("LEFT_ARROW")) this._speed.x = 0;
            if (!this.isDown("UP_ARROW")) this._speed.y = 0;
            if (!this.isDown("DOWN_ARROW")) this._speed.y = 0;
          });
          return this;
        }
      });
      Crafty.defineScene("level", function()
      {
        Crafty.background("black");
        var currentLocation = 0;
        elements.forEach(function(e)
        {
          console.log("Poop", e);
          var element = new PathElement[e](currentLocation);
          element.render(self.unit);
          currentLocation += element.width * self.unit;
        });
        var player1 = Crafty.e("Player, 2D, Canvas, Color, Fourway, Solid, Gravity, Fourway, Collision")
          .attr(
          {
            x: 0,
            y: 50,
            w: 75,
            h: 75
          })
          //.CustomControls(400)
          .checkHits("Wall")
          .color("darkgreen")
          .fourway(400)
          .gravity("Floor")
          .gravityConst(1000)
          .bind("Moved", function(e)
          {
            if (this.x >= (self.unit / 2))
            {
              Crafty.viewport.x = (this.x - (self.unit / 2)) * -1;
            }
          });

      });
      //});

    }
  },
  start:
  {
    value: function()
    {
      var player1;
      Crafty.init(this.container);

      var self = this;
      this.createLevelScene();
      // Crafty.defineScene("level", function()
      // {
      //   Crafty.background("black");
      //   Crafty.e("Top,2D, Canvas, Color")
      //     .attr(
      //     {
      //       x: 0,
      //       y: 0,
      //       w: 400,
      //       h: self.unit * 0.2,
      //       z: 1
      //     })
      //     .color("blue");
      //   Crafty.e("Middle, 2D, Canvas, Color, Collision")
      //     .attr(
      //     {
      //       x: 0,
      //       y: self.unit * 0.2,
      //       w: 400,
      //       h: self.unit * 0.6,
      //       z: 1
      //     })
      //     .color("red");
      //   Crafty.e("Floor, 2D, Canvas, Solid, Color, Collision")
      //     .attr(
      //     {
      //       x: 0,
      //       y: (self.unit * 0.2) + (self.unit * 0.6),
      //       w: 400,
      //       h: (self.unit * 0.2),
      //       z: 1
      //     })
      //     .color("green");
      //   player1 = Crafty.e("Player, 2D, Canvas, Color, Solid, Fourway, Gravity, Collision")
      //     .attr(
      //     {
      //       x: 20,
      //       y: 0,
      //       w: 30,
      //       h: 30
      //     })
      //     .color("black")
      //     .fourway(200)
      //     .gravity("Floor")
      //     .bind("Moved", function()
      //     {
      //       if (this.x >= (self.unit / 2))
      //       {
      //         Crafty.viewport.x = (this.x - (self.unit / 2)) * -1;
      //       }
      //     });
      // });

      Crafty.enterScene("level");

      // this.scaleToWindow();

      function load_scene(scene, duration)
      {
        Crafty.e("2D, Canvas, Tween, Color")
          .attr(
          {
            alpha: 0.0,
            x: 0,
            y: 0,
            w: 800,
            h: 600
          })
          .color("#000000")
          .tween(
          {
            alpha: 1.0
          }, duration)
          .bind("TweenEnd", function()
          {
            Crafty.scene(scene);
            Crafty.e("2D, Canvas, Tween, Color")
              .attr(
              {
                alpha: 1.0,
                x: 0,
                y: 0,
                w: 800,
                h: 600
              })
              .color("#000000")
              .tween(
              {
                alpha: 0.0
              }, duration);
          });
      }
      // Crafty.bind("EnterFrame", function(){
      //  if (Crafty.frame() % 2 == 0)
      //    drop();
      //  });

    }
  }
});

module.exports = Game;
