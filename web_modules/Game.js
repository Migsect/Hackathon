"use strict";

var Matter = require("matter-js");

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;

var Game = function(container)
{
  /* Creating the engine */
  var engine = Engine.create();

  var self = this;
  Object.defineProperties(self,
  {
    container:
    {
      value: container
    },
    render:
    {
      value: Render.create(
      {
        element: container,
        engine: engine,
        options:
        {
          width: container.offsetWidth,
          height: container.offsetHeight
        }
      })
    },
    world:
    {
      value: engine.world
    }
  });

  /* create two boxes and a ground */
  var boxA = Bodies.rectangle(400, 200, 80, 80);
  var boxB = Bodies.rectangle(450, 50, 80, 80);
  var ground = Bodies.rectangle(400, 610, 810, 60,
  {
    isStatic: true
  });

  /* add all of the bodies to the world */
  World.add(self.world, [boxA]);
  World.add(self.world, [boxB]);
  World.add(self.world, [ground]);

  /* run the engine */
  Engine.run(engine);

  /* run the renderer */
  Render.run(self.render);

  /* Whenever the window resizes, we need to resize the container */
  window.addEventListener("resize", function(event)
  {
    self.resizeToContainer();
  });
};

Object.defineProperties(Game.prototype,
{
  resize:
  {
    value: function(width, height)
    {
      /* Storing the previous width and height */
      var previousWidth = this.render.canvas.width;
      var previousHeight = this.render.canvas.height;

      /* Getting the bounds */
      var min = this.render.bounds.min;
      var max = this.render.bounds.max;
      var size = {
        x: max.x - min.x,
        y: max.y - min.y
      };
      var oldCenter = {
        x: size.x + min.x,
        y: size.y + min.y
      };

      /* Setting the new width */
      this.render.canvas.width = width;
      this.render.canvas.height = height;

      this.moveCameraLocation(oldCenter.x, oldCenter.y);
    }
  },
  resizeToContainer:
  {
    value: function()
    {
      /* Resizing based on the current container's size */
      this.resize(this.container.offsetWidth, this.container.offsetHeight);
    }
  },
  getCameraLocation:
  {
    value: function() {

    }
  },
  moveCameraLocation:
  {
    /**
     * Centers the camera on the specified coordinate
     * 
     * @param  {Number} xCoord The x position of the camera
     * @param  {Number} yCoord The y position of the camera
     */
    value: function(xCoord, yCoord)
    {
      console.log(this.render.bounds);
      var min = this.render.bounds.min;
      var max = this.render.bounds.max;
      var size = {
        x: max.x - min.x,
        y: max.y - min.y
      };
      this.render.bounds.min = {
        x: xCoord - size.x / 2,
        y: yCoord - size.y / 2
      };
      this.render.bounds.max = {
        x: xCoord + size.x / 2,
        y: yCoord + size.y / 2
      };

    }
  }
});

module.exports = Game;
