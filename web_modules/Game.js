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
          height: container.offsetHeight,
          hasBounds: true,
          pixelRatio: 1,
          showBounds: true
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

      /* Getting the bounds */
      var min = this.render.bounds.min;
      var max = this.render.bounds.max;

      /* Calculating the current size of the bounds */
      var size = {
        x: max.x - min.x,
        y: max.y - min.y
      };
      /* Calculating the current center of the bounds */
      var oldCenter = {
        x: (size.x / 2) + min.x,
        y: (size.y / 2) + min.y
      };

      /* Setting the new width */
      this.render.canvas.width = width;
      this.render.canvas.height = height;

      // /* Setting the new bounds */
      console.log("x:", (max.x - min.x) - width, "y:", (max.y - min.y) - height);
      console.log("min:", min, "max:", max);
      max.x = width + min.x;
      max.y = height + min.y;

      // this.moveCameraLocation(oldCenter);
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
    value: function()
    {
      var min = this.render.bounds.min;
      var max = this.render.bounds.max;
      var size = {
        x: max.x - min.x,
        y: max.y - min.y
      };
      return {
        x: (size.x / 2) + min.x,
        y: (size.y / 2) + min.y
      };
    }
  },
  moveCameraLocation:
  {
    /**
     * Centers the camera on the specified coordinate.
     * 
     * @param  {Vector} location The position of the camera to center on.
     */
    value: function(location)
    {
      var bounds = this.render.bounds;
      var current = this.getCameraLocation();
      var translateVector = {
        x: current.x - location.x,
        y: current.y - location.y
      };

      console.log("Current:", current, "Towards:", location);
      console.log("Translate:", translateVector);
      Matter.Bounds.translate(bounds, translateVector);
    }
  }
});

module.exports = Game;
