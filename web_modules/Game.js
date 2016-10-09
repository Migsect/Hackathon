"use strict";
/*global Crafty*/

var Game = function(containerId)
{
  var self = this;
  Object.defineProperties(self,
  {
    container:
    {
      value: document.getElementById(containerId)
    }
  });
};

window.onresize = function()
{
  Crafty.init(window.screenWidth, window.screenHeight);
};

Object.defineProperties(Game.prototype,
{
  start:
  {
    value: function()
    {
      var players = 4;
      var screenWidth = window.screenWidth;
      var screenHeight = this.container.clientHeight;
      var player1;
      var levelWidth = 10000;
      Crafty.init(screenWidth, screenHeight, this.container);
      // Crafty.defineScene("HomeScreen", function() {
      //  Crafty.background("black");
      //  Crafty.e("2D, DOM, Text, Mouse")
      //    .attr({ w: 300, h: 20, x: 100, y: 100 })
      //    .text("Click to start")
      //    .css({ "text-align": "center"})
      //    .textFont({size: '20px', weight: 'bold'})
      //    .textColor("#FFFFFF")
      //    .bind('Click', function(MouseEvent){
      //      Crafty.enterScene("Level1");
      //    });

      //    Crafty.e("2D, DOM, Text")
      //    .attr({ w:400, h:40, x: 50, y: 50})
      //    .text("Rein")
      //    .textFont({size:'130px', weight:'bold'})
      //    .css({"text-align": "center"})
      //    .textColor("#FFFFFF");
      //  });

      Crafty.defineScene("Level1", function()
      {
        Crafty.background("black");
        Crafty.e("Top,2D, Canvas, Color")
          .attr(
          {
            x: 0,
            y: 0,
            w: 400,
            h: screenHeight * 0.2,
            z: 1
          })
          .color("blue");
        Crafty.e("Middle, 2D, Canvas, Color, Collision")
          .attr(
          {
            x: 0,
            y: screenHeight * 0.2,
            w: 400,
            h: screenHeight * 0.6,
            z: 1
          })
          .color("red");
        Crafty.e("Floor, 2D, Canvas, Solid, Color, Collision")
          .attr(
          {
            x: 0,
            y: (screenHeight * 0.2) + (screenHeight * 0.6),
            w: 400,
            h: (screenHeight * 0.2),
            z: 1
          })
          .color("green");
        player1 = Crafty.e("Player, 2D, Canvas, Color, Solid, Fourway, Gravity, Collision")
          .attr(
          {
            x: 20,
            y: 0,
            w: 30,
            h: 30
          })
          .color("black")
          .fourway(200)
          .gravity("Floor")
          .bind("Moved", function()
          {
            if (this.x >= (screenWidth / 2))
            {
              Crafty.viewport.x = (this.x - (screenWidth / 2)) * -1;
            }
          });
      });

      Crafty.enterScene("Level1");

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

var game = new Game("some-id");

module.exports = Game;
