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
      var elements = ["straight", "straight", "straight"];

      var self = this;
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
        var player1 = Crafty.e("Player, 2D, Canvas, Color, Solid, Fourway, Collision")
          .attr(
          {
            x: 0,
            y: 0,
            w: 30,
            h: 30
          })
          .color("green")
          .fourway(200)
          .bind("Moved", function()
          {
            if (this.x >= (self.unit / 2))
            {
              Crafty.viewport.x = (this.x - (self.unit / 2)) * -1;
            }
          });
      });

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
